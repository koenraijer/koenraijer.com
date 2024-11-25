---
title: Zotero-Obsidian Quick Copy
description: External translator to improve integration between Obsidian and Zotero.
date: 2022-12-31
categories:
  - Tools
published: true
---

<script lang="ts">
    import { buttonVariants } from "$lib/shadcn/ui/button"
</script>

This piece of code allows you to create an Obsidian link which links directly to a reference inside Zotero, simply by dragging the reference into a note. If you're processing research or simply want to reference a study in one of your notes, this is is helpful in speeding up the process. 

![Video showing the Zotero-Obsidian Quick Copy in action.](zotero-obsidian.m4v)

**Note:** the code was adapted from another external translator made by Florian Wessling, which can be found [here](https://gist.githubusercontent.com/ColdDevil/9992718/raw/71c385e68866fd55490f13c729156ae916eee12c/zotselect-link_full.js). 

Some other resources for writing Zotero translators:
- [dev:translators:coding [Zotero Documentation]](https://www.zotero.org/support/dev/translators/coding)
- [dev:translators:functions [Zotero Documentation]](https://www.zotero.org/support/dev/translators/functions)
- [kb:item types and fields [Zotero Documentation]](https://www.zotero.org/support/kb/item_types_and_fields)

Save the code as a `.js` file at `/Users/YOURNAME/Zotero/translators`.

```js
{
    "translatorID":"f1ff9f87-3531-4db2-8cbc-7025872812f5",
    "translatorType":2,
    "label":"Zotero-Obsidian Quick Copy",
    "creator":"Koen Raijer",
    "target":"txt",
    "minVersion":"2.0",
    "maxVersion":"",
    "priority":200,
    "inRepository":false,
    "displayOptions":{"exportCharset":"UTF-8"},
    "lastUpdated":"2022-12-26 12:23:32"
    }
    
    // Save at: /Users/YOURNAME/Zotero/translators
    
    function doExport() {
        var output = "";
    
        var item;
        while(item = Zotero.nextItem()) {
            // title and link
            var selectLink = "zotero://select/items/";
            var library_id = item.libraryID ? item.libraryID : 0;
            selectLink += library_id + "_" + item.key;
            // output += "&quot;<a href=\"" + selectLink + "\">" + item.title + "</a>&quot;"; // &ldquo; &rdquo;
    
            var addition = "";
    
            // authors
            var author = "";
            if (item.creators !== undefined) {
                for (var a = 0; a < 1; a++) {
                    if (item.creators[a]["creatorType"] == "author") {
                        author += item.creators[a]["lastName"]; // + ", " + item.creators[a]["firstName"];
                    }
                }
                addition += author;
            } else {
                addition += "noauthor"
            }

    
            // date
            if (item.date !== undefined && item.date.length > 0) {
                addition += ", " + item.date.substring(0,4);
            } else {
                addition += ", nodate";
            }
    
            if (addition.length > 0) {
                output += "([" + addition + "](" + selectLink + "))";
            } else {
                output += "([zotlink](" + selectLink + ")";
            }
    
            Zotero.debug(item);
        }
    
        Zotero.write(output);
}
```

<div class="not-prose">
    <a class="{buttonVariants({ variant: 'default' })}" href="https://raw.githubusercontent.com/koenraijer/Zotero-Obsidian-Quick-Copy/main/Zotero-Obsidian-Quick-Copy">Github link</a>
</div>
