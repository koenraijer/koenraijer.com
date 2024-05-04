**Inspiration:**
- https://ubud.aspirethemes.com/
- https://github.com/mattjennings/sveltekit-blog-template/
- https://journal.ghost.io/

**BUGS:**
- Ensure that images are rounded on mobile screens

**Optional new features:**
- Webmentions: These allow your site to gather reactions from around the web (likes, replies, retweets, etc.) and display them. Or consider adding utteranc.es? A service like webmention.io can help with this.
- Image Optimization: Automatic resizing, lazy loading and optimization of images for better performance. --> Keep track of Svelte image (currently experimental!)
- Site-wide cmd-K search (see: https://www.youtube.com/watch?v=-B58GgsehKQ&t=291s) - Use flexsearch like here? https://joyofcode.xyz/blazing-fast-sveltekit-search
- Update Changelog to be like obsidian.md/changelog (with sticky years and months)
- Proper RSS feed: https://kylenazario.com/blog/full-content-rss-feed-with-sveltekit 
- Proper sitemap: https://kylenazario.com/blog/sveltekit-blog-sitemap 
- New code highlighting: https://github.com/atomiks/rehype-pretty-code 
- https://www.skeleton.dev/utilities/codeblocks <-- replace codeblocks, or: https://github.com/pngwn/MDsveX/issues/385 
- Use floating ui for filters

**Completed:**
- Update ToC: endgoal should be a fixed ToC like on gwern.net, but on scrolling, the active heading should appear as a sticky header at the top of the page, including a progress bar.
- Convert [slug]/+page.server.js to be fully dependable on api/posts, also for the content.
- Add category links to posts, created category cloud, and added category pages.
- Hero placeholder shows up on all screen sizes
- Add <A> tag for in templates
- Syntax Highlighting with two themes that switch depending on active theme
- Add compact post list for Archive
- Added Fuse.js for client-side fuzzy search
- Add semi-automated changelog? I.e., whenever a new page is added?
- Create a menu for all options in top right 
- Add books page
- Change text select colour
- https://alex-schnabl.medium.com/lazy-loading-images-and-components-in-svelte-and-sveltekit-using-typescript-6a8443bb9479 <-- lazy loading (sitewide, but at least on the books page). 
- Bug fix: white vertical stroke on mobile on books page removed.
