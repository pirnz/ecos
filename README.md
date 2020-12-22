# News finder

This Chrome extension will find similar news in other sites, to be able to compare the facts exposed by different media outlets.

## Current status:

* Finds keywords from the information in the header (description, title, published date, og and twitter meta elements).
* Displays that info in the popup
* Works in any language supported by [keyword-extractor](https://www.npmjs.com/package/keyword-extractor). If it's not able to detect the language, it defaults to spanish.

## To do:

* Create list with newspapers RSS
* Obtain RSS from newspapers and parse information
* Find similar news in other newspapers based on keywords and date

## How it works

1. Extract data from the page
2. I use the library [keyword-extractor](https://www.npmjs.com/package/keyword-extractor) to remove stopwords and punctuation (although it doesn't work perfectly).