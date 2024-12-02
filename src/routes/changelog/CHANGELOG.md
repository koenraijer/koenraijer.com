### November
- 📍 New domain: [https://koenraijer.com](https://koenraijer.com).
## 2024
### October
- ⬆️ Migrated to SvelteKit 2.0
- 📝 New post: [How I would write a literature review in 2025](/literature-review)

### June
- Spring cleaning (font, lay-out, book cards) and new post added: [Experience sampling](/experience-sampling).

### May
- Added [Projects](/projects), improved UI of hero and [Books](/books).
- 📝 New post [Introducing arXivCollector](arxivcollector)

### January
- Changed link component so icons for external links are added automatically, changed menus
- Added lazy loading to [Books](/books) based on intersection observer API ([src](https://alex-schnabl.medium.com/lazy-loading-images-and-components-in-svelte-and-sveltekit-using-typescript-6a8443bb9479))
- UI/UX improvements to book filtering options and menus
- Refurbished library page: added book covers, redesigned book cards, added pages for individual books, added Currently Reading item to homepage.
- Changed to [Mona Sans](https://github.com/mona-sans), replaced Favicon and made it dependent whether light or dark mode is active.
- Added grainy background to hero and category element
- Fixed inline code and other code formatting things
- 📝 New post: [Convert Pocketbook notes to Obsidian-flavoured markdown](/pocketbook-html-to-obsidian-md)

## 2023
### December
- 💄 Reworked category page
- Books updated
- Fixed footer on mobile screens, redesigned ToC
- Redesigned footer, fixed bug of pages being halfway after navigating, added support for math notation, full bleed images, added markdown video support.
- Version 3.0 of the website is live! 🎉
- Added Vercel speed insights, removed GoatCounter
- 📝 New post: [Anki Remote iOS alternative: cheap, versatile, unwasteful.](/anki-remote)
- Added [TailwindCSS fluid type plugin](https://davidhellmann.com/blog/development/tailwindcss-fluid-type-plugin)



### August
- Fixed book page SEO.
- Implemented automatic updates of the books data file based on a Python script that translates a local spreadsheet into JSON
- Added books page with several filter options
- Added a menu for all options in top right that is fixed on mobile
- Fixed search bar width using mostly Tailwind
- Many small UI improvements for mobile screens
- Optimised Lighthouse scores
- New avatar image
- Added SEO with dynamic Og Images, meta tags, and so forth
- Archive section on homepage now shows a compact list of all posts
- Improved search input so that all transitions are smooth and the search input is full-width on mobile
- Added footnote support using remark-footnotes
- Added a changelog page which is generated from the changelog.md file, which is updated automatically with each commit message

### July
- Convert [slug]/+page.server.js to be fully dependable on api/posts, also for the content
- Add category links to posts, created category cloud, and added category pages
- Hero placeholder shows up on all screen sizes
- Add tag for in templates
- Syntax Highlighting with two themes that switch depending on active theme
- Add compact post list for Archive
- Added `Fuse.js` for client-side fuzzy search
