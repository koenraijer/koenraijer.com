---
title: From Pocketbook notes to markdown
date: 2024-01-04
categories:
  - Tools
description: This post uses a simple script based on BeautifulSoup to convert Pocketbook notes, which are in HTML format, to Obsidian-flavoured markdown with YAML frontmatter.
published: true
ToC: true
---

I currently do most of my reading on a **Pocketbook Era** e-reader. It allows highlights, definitions of words and notes to be exported in HTML format. In order to be able to store my book notes in Obsidian without any manual formatting, I wrote a Python script that converts the HTML into Obsidian-flavoured markdown, and also fills out some YAML frontmatter fields for you. 

The `<body>` tag of the input file has the following structure:
```html
<div>
    <h1>2024-01-04 14:43:11 - De Eeuw Van Mijn Vader</h1>
</div>
<div>
    <span>Mak, Geert</span>
</div>
<div>
    <p>70</p>
    <div>
        <p>De zomers waren vol toogdagen ...</p>
    </div>
</div>
```

The output file looks something like this:
```md
---
tags:
    - book
    - reference
    - unprocessed
author: Geert Mak
title: De Eeuw Van Mijn Vader
isbn:
date: 2024-01-04
zettel:
--- 

> De zomers waren vol toogdagen ... (page 70)  
```

## Using Python and installing dependencies

PC's with MacOS come with Python by default, for Windows users I'm not so sure. 
I used [BeautifulSoup](https://beautiful-soup-4.readthedocs.io/en/latest/) to parse the HTML and extract relevant pieces of information from it. If you want maximum ease-of-use (rather than using the script from within a `conda` environment, for example), install the package globally by opening a terminal and pasting: `pip install beautifulsoup4`. 

## Overview of what the script will do

The script is going to be run from the command-line. We are going to name it `pocketbook_to_md.py` and it is going to require 2 arguments. The first argument will be the location of the HTML input file, the second argument will be the output folder for where our converted markdown file should go. 

Executing the script will involve running this command in your terminal: `python3 pocketbook_to_md.py input.html path/to/output_folder`.

## Capturing the data from the HTML

Let's define our imports:
- `sys` allows us to capture the parameters we pass on the command-line by exposing the `sys.argv` method. 
- `os` allows us to construct the path for the `output_file`. 
- `bs4` allows us to parse (i.e., read and understand programmatically) the HTML. 

```python
import sys 
import os 
from bs4 import BeautifulSoup
```

Next, we define our main function, which takes as its arguments `input_file` and `output_folder`. We define a list `bookmarks` which will contain a list of dictionaries where each dictionary represents a bookmark. We also define a dictionary `metadata`, which will contain the metadata for the book our notes were exported from (title, author, date). 

```python
def main(input_file, output_folder):
    bookmarks = []
    metadata = {}
```

Continuing from where we left off, we open the input file and read its contents into a string `html`. We then create a BeautifulSoup object `soup` from this string, which allows us to parse the HTML.

```python
with open(input_file) as f:
    html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
```

We extract the body of the HTML document into `body`. We then extract the title and date from the first heading in the body, and the author from the first span. We reverse the author's name (since it's given in the format "last name, first name") and join it in a single string of the format "<first_name> <last_name>". We add all three to the `metadata` dictionary. 

```python
body = soup.body
title_date = body.h1.contents[0].split(" - ")
metadata["title"] = title_date[1]
metadata["date"] = title_date[0].split(" ")[0]
author = body.span.contents[0].split(", ")
author.reverse()
metadata["author"] = " ".join(author)
```

Next, we capture all `div` elements with the class "bookmark" where an id is present (this excludes the `div`'s with metadata), and store them in `bookmarks_html`. For each bookmark, we create a dictionary with the page number, text, and note (if it exists), and append this dictionary to the `bookmarks` list.

```python
bm_html = soup.find_all("div", "bookmark", id=True)
for bm in bm_html:
    bm_dict = {}
    bm_html["page"] = 
    bm.find_all("p", "bm-page")[0].contents[0]
    bm_html["text"] = 
    bm.find_all("div", "bm-text")[0].p.contents[0]
    bm_html["note"] = 
    bm.find_all("div", "bm-note")[0].p.contents[0] 
    if bm.find_all("div", "bm-note") 
    else ""
    bm.append(bm_dict) 
```

## Translating the data to markdown

We start by creating a header for the markdown file, which will contain the metadata in YAML format. With `header = header.replace("\n", "", 1)`, we remove the first newline character from the header, because a multiline string within `"""` will have a leading empty line that we don't need. 

```python
header = f"""
---
tags:
    - book
    - reference
    - unprocessed
author: {metadata["author"]}
title: {metadata["title"]}
isbn:
date: {metadata["date"]}
zettel:
--- \n
"""
header = header.replace("\n", "", 1)
```

Finally, we open the output file (which is named after the book title and located in the output folder) and write the header and bookmarks to it. Each bookmark is formatted as a blockquote with the highlighted text, the page number in parentheses, and the note (if it exists) on a new line as a list item. 

```python
out = os.path.join(folder_out, f"{metadata['title']}.md")
with open(out, "w") as f:
    f.write(header)
    for bm in bookmarks:
        f.write(
            f'> {bm["text"]} 
            (page {bm["page"]})
            {newline + "-" if bm["note"] else ""} 
            {bm["note"]} \n\n'
        )
```

Our function is finished now and ready for use!
## Calling the function with the correct parameters

We have a few things left to do:
- Call the function
- Make the script understand that it should take `input_file` and `output_folder` from the arguments passed along with its execution from the command-line. 

Remember that using the script on the command-line will ook like this: `python3 pocketbook_to_md.py input.html path/to/output_folder`.

First, we'll need to check that the script is being run directly (not imported as a module). If that is the case, the Python interpreter will set `__name__` equal to `__main__` (don't ask me why). If it is, we check if the number of arguments passed to the script is less than 2 (only the script's name). If it is, we throw an error message "Usage: python script.py <input_file> <output_folder: optional>", which already alludes to the intended use. Namely, if only 2 arguments are passed, the output_folder is assumed to be the folder from which the function is called. We check for this by adding another if clause for when there are fewer than 3 arguments. In all other situations, we take the 2nd and 3rd arguments to be `input_file` and`output_folder`, respectively. We then call the `main` function with these arguments.

```python
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("""
                Usage: 
                python script.py 
                <input_file> 
                <output_folder: optional>
            """)
        sys.exit(1)
    if len(sys.argv) < 3:
        input_file = sys.argv[1]
        output_folder = os.getcwd()
    else:
        input_file = sys.argv[1]
        output_folder = sys.argv[2]
    main(input_file, output_folder)
```

That's all the code we need. In order to use it, save the code as `pocketbook_to_md.py` and execute it from the command-line!

## Full code

```python
import sys
import os
from bs4 import BeautifulSoup

def main(input_file, output_folder):
    bookmarks = []
    metadata = {}

    with open(input_file) as f:
        html = f.read()
        soup = BeautifulSoup(html, 'html.parser')
        body = soup.body
        title_date = body.h1.contents[0].split(" - ")
        metadata["title"] = title_date[1]
        metadata["date"] = title_date[0].split(" ")[0]
        author = body.span.contents[0].split(", ")
        author.reverse()
        metadata["author"] = " ".join(author)
        bookmarks_html = soup.find_all("div", "bookmark", id=True)
        for bookmark in bookmarks_html:
            bookmark_dict = {}
            bookmark_dict["page"] = bookmark.find_all("p", "bm-page")[0].contents[0]
            bookmark_dict["text"] = bookmark.find_all("div", "bm-text")[0].p.contents[0]
            bookmark_dict["note"] = bookmark.find_all("div", "bm-note")[0].p.contents[0] if bookmark.find_all("div", "bm-note") else ""
            bookmarks.append(bookmark_dict) 

    header = f"""---\n
tags:
    - book
    - reference
    - unprocessed
author: {metadata["author"]}
title: {metadata["title"]}
isbn:
date: {metadata["date"]}
zettel:
---\n\n"""
    # Replace first \n with ""
    header = header.replace("\n", "", 1)

    newline = "\n"

    output_file = os.path.join(output_folder, f"{metadata['title']}.md")
    with open(output_file, "w") as f:
        f.write(header)
        for bookmark in bookmarks:
            f.write(f'> {bookmark["text"]} (page {bookmark["page"]}){newline + "-" if bookmark["note"] else ""} {bookmark["note"]} \n\n')

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <input_file> <output_folder: optional>")
        sys.exit(1)
    if len(sys.argv) < 3:
        input_file = sys.argv[1]
        output_folder = os.getcwd()
    else:
        input_file = sys.argv[1]
        output_folder = sys.argv[2]
    main(input_file, output_folder)
```

### Usage

`python3 pocketbook_to_md.py input.html path/to/output_folder`


