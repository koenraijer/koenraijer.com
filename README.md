**Inspiration:**
- https://ubud.aspirethemes.com/
- https://github.com/mattjennings/sveltekit-blog-template/
- https://journal.ghost.io/

**Known bugs:**
- RSS.xml errors on first load.

**Optional new features:**
- Webmentions: These allow your site to gather reactions from around the web (likes, replies, retweets, etc.) and display them. Or consider adding utteranc.es? A service like webmention.io can help with this.
- Image Optimization: Automatic resizing, lazy loading and optimization of images for better performance.
- Change text select colour
- Add books page
- Mobile: reduce pt for hero, posts single column on mobile, footer 2 row layout, logo force single line, consider making search full-width
- Add user page to show an author for each post (see: https://www.youtube.com/watch?v=-B58GgsehKQ&t=291s)

**Completed:**
- Convert [slug]/+page.server.js to be fully dependable on api/posts, also for the content.
- Add category links to posts, created category cloud, and added category pages.
- Hero placeholder shows up on all screen sizes
- Add <A> tag for in templates
- Syntax Highlighting with two themes that switch depending on active theme
- Add compact post list for Archive
- Added Fuse.js for client-side fuzzy search
- Add semi-automated changelog? I.e., whenever a new page is added?

Pt for post template reduce on moble
Make pl for input standard on sm screens
Ensure page is at top after navigating

Create a menu for all options in top right 

Schema.org metadata

https://tailwind-ui-premium-project.github.io/components/ecommerce/components/category-filters/ 