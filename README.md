https://ubud.aspirethemes.com/
https://github.com/mattjennings/sveltekit-blog-template/
https://journal.ghost.io/

Further development ideas: 
- Under the hero, adda featured post that covers 2/3 of the width of the page. On the remaining one third, list all the categories
- Add pages for the categories; set it up like here: https://daily-dev-tips.com/archive/. Joint page for all blog posts and links to each category.

Why does the hero imaga placeholder show up on desktop but not on mobile?

New features: 
- Search Functionality: Local search functionality across all blog posts. Consider libraries like Fuse.js for client-side fuzzy search.
- Webmentions: These allow your site to gather reactions from around the web (likes, replies, retweets, etc.) and display them. Or consider adding utteranc.es?
- A service like webmention.io can help with this.
- Image Optimization: Automatic resizing, lazy loading and optimization of images for better performance.
- Syntax Highlighting: For code blocks in your markdown, you might use a library like Prism.js.
- Add <A> tag for in templates
- Convert [slug]/+page.server.js to be fully dependable on api/posts, also for the content.
- Add tag links to posts. 

Add remark plugins:
- rehype-external links

