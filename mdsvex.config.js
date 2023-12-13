import { visit } from 'unist-util-visit'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import relativeImages from 'mdsvex-relative-images'
import remarkMath from 'remark-math'
import rehypeKatexSvelte from "rehype-katex-svelte";
import footnotes from 'remark-footnotes' // `npm add --save-dev remark-footnotes@2.0`

export default {
  extensions: ['.svx', '.md'],
  layout: {
		_: './src/mdsvex.svelte'
  },
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [[footnotes, { inlineNotes: true }], videos, relativeImages, remarkMath],
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
            <video controls autoplay loop class="w-full" title="${node.alt}">
              <source src="${node.url}" type="video/mp4">
              <track kind="captions">
            </video>
          `
      }
    })
  }
}

// Source: https://www.ryanfiller.com/blog/remark-and-rehype-plugins/
// Source: https://github.com/pngwn/mdsvex-math/