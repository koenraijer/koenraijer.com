https://ubud.aspirethemes.com/
https://github.com/mattjennings/sveltekit-blog-template/
https://journal.ghost.io/

Further development ideas: 
- Under the hero, adda featured post that covers 2/3 of the width of the page. On the remaining one third, list all the categories
- Add pages for the categories; set it up like here: https://daily-dev-tips.com/archive/. Joint page for all blog posts and links to each category.



New features: 
- Search Functionality: Local search functionality across all blog posts. Consider libraries like Fuse.js for client-side fuzzy search.
- Webmentions: These allow your site to gather reactions from around the web (likes, replies, retweets, etc.) and display them. Or consider adding utteranc.es?
- A service like webmention.io can help with this.
- Image Optimization: Automatic resizing, lazy loading and optimization of images for better performance.



Add remark plugins:
- rehype-external links

**Completed:**
- Convert [slug]/+page.server.js to be fully dependable on api/posts, also for the content.
- Add tag links to posts.
- Hero placeholder shows up on all screen sizes
- Add <A> tag for in templates
- Syntax Highlighting with two themes that switch depending on active theme
