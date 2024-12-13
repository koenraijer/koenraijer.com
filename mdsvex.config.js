import { visit } from 'unist-util-visit'
import remarkParse from 'remark-parse'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import relativeImages from 'mdsvex-relative-images'
import remarkMath from 'remark-math'
import rehypeKatexSvelte from "rehype-katex-svelte";
import footnotes from 'remark-footnotes' // `npm add --save-dev remark-footnotes@2.0`
import remarkHeadings from '@vcarl/remark-headings'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// Code highlighting
import { escapeSvelte } from 'mdsvex'
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-light', 'github-dark-high-contrast'],
	langs: ['javascript', 'typescript', 'python', 'html', 'svelte', 'md', 'bash']
});

export default {
  extensions: ['.svx', '.md'],
  layout: {
		_: dirname(fileURLToPath(import.meta.url)) + '/src/mdsvex.svelte'
  },
  highlight: {
    highlighter: async (code, lang = 'text') => {
        const html = escapeSvelte(
            highlighter.codeToHtml(code, {
                lang,
                themes: {
                    light: 'github-light',
                    dark: 'github-dark-high-contrast'
                },
                colorReplacements: {
                  'github-light': {
                    '#ffffff': '#f8f9fa'  // Light theme background
                  },
                  'github-dark-high-contrast': {
                    '#0a0c10': '#121212'  // Dark theme background
                  }
                },
                defaultColor: 'light',
                cssVariablePrefix: '--shiki-'
            })
        );
        return `{@html \`${html}\`}`;
    }
},
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [remarkParse, [footnotes, { inlineNotes: true }], videos, relativeImages, remarkMath, headings, customBlockquotes],
  rehypePlugins: [
    rehypeKatexSvelte,
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap'
      }
    ],
    addFootnotesHeader
  ]
}

/**
 * Adds a "Bibliography & Footnotes" h6 header after the footnotes hr
 */
function addFootnotesHeader() {
  return function transformer(tree) {
    visit(tree, 'element', (node) => {
      if (
        node.type === 'element' && 
        node.tagName === 'div' && 
        node.properties && 
        node.properties.className && 
        node.properties.className.includes('footnotes')
      ) {
        // Find the hr element
        const hrIndex = node.children.findIndex(child => 
          child.type === 'element' && child.tagName === 'hr'
        );
        
        if (hrIndex !== -1) {
          // Add h6 after hr
          node.children.splice(hrIndex + 1, 0, {
            type: 'element',
            tagName: 'h6',
            properties: {},
            children: [{
              type: 'text',
              value: 'Bibliography & Footnotes',
            }]
          });
        }
      }
    });
  };
}

/**
 * Adds support to video files in markdown image links
 */
function videos() {
  const extensions = ['mp4', 'webm', 'm4v']
  return function transformer(tree) {
    visit(tree, 'image', (node) => {
      if (extensions.some((ext) => node.url.endsWith(ext))) {
        node.type = 'html'
        node.value = `
            <video 
                controls
                disablePictureInPicture
                playsinline
                noremoteplayback
                class="w-full rounded-lg aspect-video" 
                title="${node.alt}"
                aria-label="${node.alt}"
                loop
            >
              <source src="${node.url}" type="video/mp4">
              <track kind="captions">

            </video>
          `
      }
    })
  }
}

/**
 * Parses headings and includes the result in metadata
 * Source: https://github.com/mattjennings/sveltekit-blog-template/blob/main/mdsvex.config.js
 */
function headings() {
  return function transformer(tree, vfile) {
    // run remark-headings plugin
    remarkHeadings()(tree, vfile)

    // include the headings data in mdsvex frontmatter
    vfile.data.fm ??= {}
    vfile.data.fm.headings = vfile.data.headings.map((heading) => ({
      ...heading,
      // slugify heading.value
      id: heading.value
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    }))
  }
}

/**
 * Custom blockquote types
 * Source: https://dev.to/siddhantkcode/crafting-custom-flavored-markdown-for-svelte-with-mdsvex-12fp
 */
const blockquoteTypes = {
  '::TIP': {
    wrapperClass: 'callout-tip',
    iconColor: 'callout-tip-text',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    defaultTitle: 'Tip'
  },
  '::WARNING': {
    wrapperClass: 'callout-warning',
    iconColor: 'callout-warning-text',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    defaultTitle: 'Warning'
  },
  '::IMPORTANT': {
    wrapperClass: 'callout-important',
    iconColor: 'callout-important-text',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
    defaultTitle: 'Important'
  },
  '::NOTE': {
    wrapperClass: 'callout-note',
    iconColor: 'callout-note-text',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-2"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>`,
    defaultTitle: 'Note'
  }
};

function customBlockquotes() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const firstChild = node.children[0];
      if (firstChild && firstChild.type === 'paragraph' && firstChild.children[0].type === 'text') {
        const text = firstChild.children[0].value;
        const type = Object.keys(blockquoteTypes).find(key => text.startsWith(key));
        
        if (type) {
          const callout = blockquoteTypes[type];
          const lines = text.slice(type.length).trim().split('\n');
          const firstLine = lines[0].trim();
          const remainingLines = lines.slice(1).join('\n').trim();
          
          const title = remainingLines ? firstLine : callout.defaultTitle;
          const content = remainingLines || firstLine;
          
          const coloredIcon = callout.icon.replace('class="', `class="${callout.iconColor} `);
          
          node.type = 'html';
          node.value = `
            <div 
              class="not-prose ${callout.wrapperClass} callout-wrapper" 
              role="note"
            >
              <div 
                class="callout-title"
              >
                <span aria-hidden="true">${coloredIcon}</span>
                <span class="${callout.iconColor}" id="callout-${type.toLowerCase()}">${title}</span>
              </div>
              <div 
                class="callout-content"
                aria-labelledby="callout-${type.toLowerCase()}"
              >
                ${content}
              </div>
            </div>
          `;
          
          node.children = [];
        }
      }
    });
  };
}

// Source: https://www.ryanfiller.com/blog/remark-and-rehype-plugins/
// Source: https://github.com/pngwn/mdsvex-math/
// https://github.com/pngwn/MDsveX/discussions/354