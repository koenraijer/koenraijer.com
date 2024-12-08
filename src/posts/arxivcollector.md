---
title: "arXivCollector"
date: 2024-05-04
categories:
  - Research
  - Tools
description: Export arXiv searches as neatly formatted BibTex files.
published: true
ToC: true
---
If you're an avid user of arXiv for finding academic papers, you know that their website does not allow you to export your search results. Such exportation is vital for literature reviewing. That's where **arXivCollector** comes in handy. This tool allows you to export your arXiv searches as neatly formatted BibTex files for easy importation into popular scientific reference managers like Zotero or EndNote.
### Key Features
- **Ease of use:** you don't need to be good at coding to use arXivCollector. All you need is to have Python installed on your PC. 
- **Rich metadata:** the export file includes DOIs and direct links to article PDFs.
- **Multiple formatting options:** Choose between exporting your references as BibTex files or csv files.
### Installation
1. **Python Installation**: Ensure you have Python installed on your system.
2. **Clone the Repository**: Run the command `git clone https://github.com/koenraijer/arxivcollector.git` in your terminal.
3. **Navigating the Repository**: Move into the cloned repository directory by running `cd path/to/arxivcollector`.

### Getting Started
You can use **arXivCollector** in two ways:
- **Via Python Script**: Import the `arXivCollector()` class and run the provided Python code.
- **From Command Line**: Execute the `arxivcollector.py` script with the search URL and desired title.

### Special Thanks
A shoutout to Fatima et al., whose work inspired the development of **arXivCollector**. You can check out their paper [here](https://doi.org/10.1016/j.infsof.2023.107251).

### API Overview
The `arXivCollector` class is the core component responsible for collecting and saving arXiv metadata. For detailed usage instructions and API documentation, please refer to the [official repository](https://github.com/koenraijer/arxivcollector). 

Happy referencing!
