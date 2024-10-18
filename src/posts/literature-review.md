---
title: How I would write a literature review in 2025
date: 2024-09-20
updated: 2024-09-20
categories:
  - Research
description: Here’s my blueprint for tackling a second literature review, having learned from past mistakes so you won't have to! 😉
published: true
ToC: true
---
## Introduction
Here’s my blueprint for tackling a second literature review in 2025, having learned from past mistakes so you won't have to! 😉 The approach is heavy on tools, high on automation, and emphasises minimising the potential for human error. I value open-science principles, and prefer open-source software. I try to adhere to the **four-eyes principles**, which says that all work should be done twice, independently of each other. This includes: peer reviewing the search strategy, title and abstract screening, full-text screening and data extraction. I also try limiting copy-pasting actions as much as possible, because every time you copy-paste, you can introduce an error. The most important tools and frameworks I use are: [PRISMA](https://www.prisma-statement.org/), [OSF](https://osf.io/), [ASReview](https://asreview.nl/), [Zotero](https://www.zotero.org/), and [Google Drive](https://drive.google.com/). If anything, the main take-away of this post should be that *you need to think your workflow through before you start*. 
### Tools & Frameworks
- [PRISMA](https://www.prisma-statement.org/). PRISMA guidelines help you write clear and complete systematic reviews, meta-analyses, and also scoping reviews (see [PRISMA-ScR](https://www.prisma-statement.org/scoping)) by providing a structured reporting framework. 
- [OSF](https://osf.io/). The Open Science Framework is a free and open-source platform for preregistering research, project management, and much more. A commonly used alternative is [PROSPERO](https://www.crd.york.ac.uk/PROSPERO/) (systematic reviews and meta-analyses only). 
- [ASReview](https://asreview.nl/). ASReview is an open-source software tool that accelerates literature reviewing using machine learning to prioritise and screen the scientific literature efficiently. I saved about 75% of time using ASReview. 
- [Zotero](https://www.zotero.org/). A free and open-source reference manager with loads of useful features. Similar in purpose to EndNote. Its PDF retrieval functionality regularly finds 70-80% of PDFs with the click of a button. Shared libraries make collaboration easy, allowing multiple people to annotate and discuss PDFs asynchronously. It also has a good duplicate detection feature. 
- [Google Drive](https://drive.google.com/). Don't go working in offline Excel spreadsheets that you share over email. There is an alternative!
### Research Plan
The first thing you write and discuss with your team, the **research plan** is a high-level document intended for structuring your thoughts in the preparatory phase. 

I would include the following headings: 
- Research Question & Review Methodology, 
- Background & Motivation, 
- Literature Databases of Interest, 
- Eligibility Criteria, 
- Timeline. 

It is important that you search the literature for existing reviews, immediately after you formulated the *research question*. If a review has already been done, ask yourself whether enough has changed since then to justify doing another one. 

The *databases* I searched were: PubMed, CINAHL, Embase Ovid, Scopus and ACM Digital Library. Decide which one will be your primary database. It is most convenient to choose the database that you're most comfortable with. You'll use it to construct the initial search query, which will then be translated into the other databases. Decide whether you're going to peer review your search strategy (see [Literature Search](/literature-review#literature-search)).

Define *inclusion and exclusion criteria* based on your research question, but also think of things like publication language, publication year, being peer-reviewed, and publication types you might not want to include (e.g., conference papers). 

Decide whether you're going to *preregister* your review, and on which platform. One benefit is the fact that you'll be able to cite it on grant applications or resumés, even when it's far from being finished. I preregistered my scoping review on OSF. It's viewable here: [https://doi.org/10.17605/OSF.IO/CR5F8](https://doi.org/10.17605/OSF.IO/CR5F8). 

Construct a *timeline* for when you'll want to have the protocol finished and published, when you want to start screening, etc. A review requires a significant time investment for all collaborators. Reaching agreement on the timeline will reduce the chance of delays. 
### Protocol
This is a document that outlines the entire procedure of conducting the review, in as much detail as possible. If you decided to preregister your review, this is the document you'll upload there. Its structure depends on the review methodology. I wrote a scoping review, and used this protocol as an example https://osf.io/fkxev. I might be stating the obvious here, but the protocol should be written and published before you actually do the literature search. 

The rest of this post was written with two goals in mind:
- To help you guide the writing of your protocol;
- To give advice for the actual execution part of the review.

---
## Literature Search
First thing you'll want to perfect is the search query for the primary database: the index query. That means seeking agreement among collaborators *before translation to other databases*. Only after you're sure the index query is perfect, you start the translation process. At this point, you might want to involve your university library for advice on your literature search ([free literature search advice for UM personnel](https://library.maastrichtuniversity.nl/research/research-essentials/literature-search-systematic-reviews/)). Translation of search queries is tedious and error-prone. There are many differences between databases. For example, they use different *controlled vocabularies*. Examples of controlled vocabularies are MeSH terms in PubMed/MedLine, EMTREE in Embase, and Headings in CINAHL. These do not match one-to-one. There is a [translation tool](https://sr-accelerator.com/#/polyglot) for search queries, but I cannot account for its accuracy because I only found out about it after having translated my queries. I found [this guide](https://guides.library.utoronto.ca/c.php?g=577919&p=4305874) especially useful for navigating these different databases. For peer reviewing the search strategy, I used the PRESS (Peer Review of Electronic Search Strategies) guidelines ([direct link to the checklist](https://ars.els-cdn.com/content/image/1-s2.0-S0895435616000585-mmc1.docx)).  
## Exporting and Deduplicating References 
You should now have all your search queries executed and lined up. Assuming you've got Zotero downloaded and installed, the next step is exporting your search queries. Generally speaking, the `RIS` format is a good file format. Here is a guide on exporting references from different databases for use in Zotero: https://osf.io/3nsep. 

After you have your different queries imported into Zotero, you'll want to remove duplicate references. Because there is a lot of overlap between databases, there will be many. Zotero identifies possible duplicates automatically for you, but it remains up to you to decide which one you'll keep. I used this guide on deduplication in Zotero: https://osf.io/yh3xe. *Always keep the reference with the abstract*, otherwise, keep the reference with most metadata. Having the abstract will make your life much easier during title and abstract screening. 

Deduplication reduced the number of references with 60% for me. You should now have a single Zotero collection with all of your references in one place. 
## The Importance of Calibration
Calibration involves planning a moment early on in a given step (e.g., title and abstract screening) where you discuss disagreements between collaborators. 

It has multiple purposes:
- Reveal unclear phrasing of eligibility criteria; 
- Force you to motivate eligibility criteria; 
- Align different interpretations of eligibility criteria among collaborators; 
- Discuss categorical ambiguity (also known as the boundary problem). 

At every step of the process, I planned two calibration meetings. During title and abstract screening, all collaborators looked at 15 titles and abstracts. After title and abstract screening, disagreements were resolved. During full-text screening, both screeners looked at 30 full-texts. After full-text screening, disagreements were resolved again. During data-extraction, both screeners looked at 15 references. After data-extraction, disagreements were resolved.

Each calibration session involves detailed discussion about disagreements. Sometimes, it took two sessions to resolve all disagreements.

Note that calibration sessions may lead to new insights, that may or may not require you to revise previous steps. This is normal. Don't cut corners, just redo those steps. Quality trumps speed.
## Making Your Life Easier For Full-Text Screening

Before jumping into the full-text screening, there are several things I'd do in my next review at this point. All of them will make your life easier at a later step in the process, automate something for you, and reduce the probability of making mistakes. 
### Enabling Direct URLs to PDFs
Bear with me. During full-text screening, you'll be using a Google Drive spreadsheet to write down whether you think a given reference should be included or excluded. To do that, you'll need easy access to the PDF. The following advice will enable you to click on a link in Google Drive that opens the associated PDF in a shared Zotero Library. It is worth your effort. 
#### Modifying the `.ris` Export
You'll need to modify the way Zotero exports references in the `.ris` format. What this modification will do, is add the Zotero Item Key, a unique identifier used by Zotero, to each reference in your `.ris` export file. This will enable you to construct a URL that will take you to the PDF during full-text screening. 

- [Locate the Zotero data directory](https://www.zotero.org/support/zotero_data) on your computer. This can be found in different locations depending on your operating system. 
- Inside the Zotero data directory, there is a folder named `translators`. Locate the file names `RIS.js`. *Duplicate it in some safe location in case something goes wrong*.
- Download the modified `RIS.js` file [here](https://gist.github.com/koenraijer/5e3a220e559e59a50489ea7e947a5f46).  
- Delete the original `RIS.js` file. Paste the downloaded `RIS.js` inside the `translators` folder. 
- Restart Zotero. 
- Verify that it worked by exporting any collection to the `.ris` file format: right-click on a collection $\to$ Export Collection ... $\to$ Choose `RIS` as Format $\to$ click OK. Save the file.
- Open the file in a text editor. Press cmd + F (ctrl + F on Windows) and search for "LB". You should now find that each entry inside the `.ris` file has a line that goes like "LB  - 6YLDRSR4". That code is what we'll need later on to locate our PDFs. 
#### Setting Up a Group Library
Setting up a group library will enable every collaborator to open the same URL to a PDF. Go to [Zotero Groups](https://www.zotero.org/groups/) $\to$ Click `Create a New Group` $\to$ Choose a name and choose the `Private Membership` option $\to$ Invite collaborators and ensure they have accepted the invitation. Verify that the group was created correctly by having each collaborator check whether the group has appeared in the left sidebar in their local Zotero set-up. The final step involves moving the collection with all the deduplicated references into the newly created group. 
### Taking Good Care of the Eligibility Criteria
All collaborators should by now agree on the eligibility criteria. We need to store these in a safe place. If you've made a group library, that is probably the best place to store them. So, create a new collection in the group library, and call it `Criteria`. Open it, and then click on the yellow notepad with small green plus sign in the middle at the top of the interface. Click `New Standalone Note`. Paste your criteria in there as a numbered list. 

Some other tips on the eligibility criteria:
- Rephrase them as exclusion criteria. This is because all you will do during full-text screening is exclude references. 
- Add an identifier that doesn't depend on a numbered list. That is because, during calibration sessions, some criteria may go, others may merge. This changes the numbering of your list. That's why you need an additional identifier. I added shorthands for my criteria to the Zotero note as identifiers (e.g., `diagnosis` or `no_peer_review). 
- Note that the PRISMA guidelines tell you to log the reasons for excluding references in the full-text screening, but not during the title and abstract screening. 
### Title and Abstract Screening with ASReview
At this point, it is important to decide whether you're going to use ASReview. Watch [this 2 minute video](https://www.youtube.com/watch?v=k-a2SCq-LtA. ) to get a general idea of how it works. Read their [Nature publication](https://www.nature.com/articles/s42256-020-00287-7) for a more detailed overview. I shaved off 63% of all references using ASReview. That means 63% less work. Using ASReview is fundamentally different from traditional literature reviewing. Make sure you and your collaborators are aware of its advantages and disadvantages before proceeding. If you decide against using ASReview, I recommend looking into other tools such as [Rayyan](https://www.rayyan.ai/) or [Covidence](https://www.covidence.org/). 

There are some important things to consider before using ASReview. First, you won't see all references. Instead, an algorithm uses machine learning to sort your references, presenting the ones it considers most relevant to your review at the top. You stop screening after you reach a pre-defined stopping criterion. My stopping criterion was: having screened 50 consecutive irrelevant references. This number may be higher for larger datasets. See [this GitHub thread](https://github.com/asreview/asreview/discussions/557) for a discussion on how to stop screening. Second, collaboration is a little difficult to figure out at first, but it worked fine in the end. [This blog post](https://asreview.nl/blog/seven-ways-to-integrate-asreview/#multiple) outlines ways of integrating ASReview when you have multiple reviewers. This is [a list of publications that used ASReview with multiple screeners](https://www.zotero.org/groups/4597652/asreview_public/collections/IWU8ATMK/tags/multiple_screeners/collection). In my case, the job of second screener was shared among three collaborators, which increased the complexity considerably. These three collaborators ended up screening in turns for a specified amount of time, until the stopping criterion was met. They would export the project file and pass it on to the next one. Third, resolving disagreements on references between first and second screeners in ASReview is a bit of a hassle. It involves merging two data files (`.csv` or `.xlsx`). Look at points 6 and 7 to get an idea of how you could do this. 

I am very happy I used ASReview. It's a very interesting tool, it has an easy-to-learn user interface, and it saves you a lot of time at very little cost. To understand exactly how to use ASReview, please refer to [the documentation](https://asreview.readthedocs.io/en/latest/about.html). Any advice given beyond this point will be supplementary to the ASReview documentation. 

An overview of how I would use ASReview the second time:
1. Install and open ASReview Lab. Take a look around. 
2. Take a small number of references (I used 15) and decide whether they are to be included or excluded. Have other collaborators review them, too. Then meet for a calibration session, and resolve any disagreements. Write the final decision down somewhere. These will be used as *prior knowledge* for ASReview. 
3. Export your references from Zotero in the `.ris` file format. This ensures you will be able to get your references back into Zotero without doing any coding. Although this may not be necessary, there appear to be only upsides to doing it this way. 
4. Create a new ASReview project, load your `.ris` file, and add the prior knowledge you agreed upon. 
5. Export the ASReview project for use by the second screener(s), choose the `Project` option. Rename it by appending something like `_2nd`. This file can be imported by collaborators and enables them to continue where the previous person stopped.
6. Have both the first and second screeners review references until the stopping criterion has been met. Have both screeners export both the `Project` files and the `Dataset` file with both labeled and unlabeled records. Use the `.csv` format or the `.xlsx` format if you don't want to re-import your references. Store these files away neatly for future reference. Realise that separate screeners might not have screened all the same articles. That is because the algorithm learns from each subsequent decision, which is likely to differ considerably between screeners. That's why the two datasets will have references you agree on, references you disagree on, references that only the first screener saw, and references that only the second screener saw. 
7. Do a calibration session to discuss references you disagree on, references that only the first screener saw, and references that only the second screener saw. The way I went about that is by writing a Python script, but there are ways to [merge these datasets in Excel](https://www.exceldemy.com/merge-datasets-in-excel/). 
8. Duplicate your dataset, and retain only the references that you agree to include. These will be used for the full-text screening. 
## Full-Text Screening in Google Drive and Zotero
You should now have a list of references in Excel that are ready for the full-text screening phase. If you decided to make your life easier for full-text screening, now is the time to reap the fruits of your labour. Verify that the Excel file contains a column named `label` that has the item key that we added to the `.ris` export. 
### Setting up URLs to PDFs in Google Drive
This is how I would set-up for full-text screening: 
- Upload the Excel file to Google Drive.
- Go to [Zotero Groups](https://www.zotero.org/groups) and open your newly made group library by clicking `Group Library`. Navigate to any random reference and look at the URL. It should be of this format: `https://www.zotero.org/groups/<some_group_identifier>/<name_of_your_group>/items/<item_key_you_added_to_the_RIS_export>/library`. We are going to recreate this URL based on the item key that is in the `label` column. 
- Create a new column, call it `pdflink`. In the first row, add this text:
```
="https://www.zotero.org/groups/<some_random_identifier>/<name_of_your_group>/collections/<some_collection_identifier/items/" & A1 & "/collection"
``` 
- This assumes that the `label` column is the first column. If it is not, replace `A` with the correct column's letter or simply move the `label` column to the first position. 
- To repeat this formula for all the other rows automatically; select the cell, and pull down on the blue dot in the bottom-right corner of the cell. 

What this does it create a URL that leads you to the correct PDF (assuming there is one). 

### Modifying the Google Drive
Before you can start screening, you need to add columns to your spreadsheet that assign references to screeners, allow logging screeners' decision (include or exclude), allow logging reasons for exclusion and additional comments for discussion. 

These are the columns I would add to the spreadsheet:
- `1st_screener` - initials of the first screener for these references;
- `1st_included` - whether the first screener wants to include the reference (`TRUE` or `FALSE`)
- `1st_criterion` - the reason the first screener may want to exclude the reference;
- `1st_comments`;
- `2nd_screener` - initials of the second screener for these references;
- `2nd_included` - whether the second screener wants to include the reference (`TRUE` or `FALSE`);
- `2nd_criterion` - the reason the second screener may want to exclude the reference;
- `2nd_comments`;

With these comments in place, calibration simply involves filtering columns for rows where there is disagreement (in Google Drive: select all cells $\to$ `Data` $\to$ `Create a filter`). 

## Data Extraction
Data extraction requires a data extraction table. Each row will be a paper. Each column is a piece of information that you'll need. This is highly dependent on the question you're trying to answer, but some things may come in handy in most cases:
- Metadata: these can be copied from the full-text screening spreadsheet. Make sure to include the `label` and `pdflink` columns;
- Descriptives of the sample: sample size, mean age, age SD, percent male, percent female;
- Quality appraisal: generally required for systematic reviews, not for scoping reviews;
- Diagnostic instrument.

It might also be useful to search OSF for data extraction tables other studies used.