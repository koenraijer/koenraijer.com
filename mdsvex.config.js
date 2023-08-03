import { visit } from 'unist-util-visit'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import relativeImages from 'mdsvex-relative-images'
// Import the package I just installed with this line: `npm add --save-dev remark-footnotes@2.0`
import footnotes from 'remark-footnotes'

export default {
  extensions: ['.svx', '.md'],
  layout: {
		_: './src/mdsvex.svelte'
	},
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [[footnotes, { inlineNotes: true }], videos, relativeImages],
  rehypePlugins: [
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
}

/**
 * Adds support to video files in markdown image links
 */
function videos() {
  const extensions = ['mp4', 'webm']
  return function transformer(tree) {
    visit(tree, 'image', (node) => {
      if (extensions.some((ext) => node.url.endsWith(ext))) {
        node.type = 'html'
        node.value = `
            <video 
              src="${node.url}"
              autoplay
              muted
              playsinline
              loop
              title="${node.alt}"
            />
          `
      }
    })
  }
}