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
import { addCopyButton } from 'shiki-transformer-copy-button'
import { createHighlighter } from 'shiki';

// optional
const options = {
  // delay time from "copied" state back to normal state
  toggle: 2000,
}

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
                transformers: [
                  addCopyButton(code)
                ],
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
  remarkPlugins: [remarkParse, [footnotes, { inlineNotes: true }], videos, relativeImages, remarkMath, headings],
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
                loop
                <track kind="captions">
            >
              <source src="${node.url}" type="video/mp4">
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

// Source: https://www.ryanfiller.com/blog/remark-and-rehype-plugins/
// Source: https://github.com/pngwn/mdsvex-math/
// https://github.com/pngwn/MDsveX/discussions/354