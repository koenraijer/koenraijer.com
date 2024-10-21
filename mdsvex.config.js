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

export default {
  extensions: ['.svx', '.md'],
  layout: {
		_: dirname(fileURLToPath(import.meta.url)) + '/src/mdsvex.svelte'
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
  ]
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
            <video controls class="w-full" title="${node.alt}">
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

// Source: https://www.ryanfiller.com/blog/remark-and-rehype-plugins/
// Source: https://github.com/pngwn/mdsvex-math/
// https://github.com/pngwn/MDsveX/discussions/354