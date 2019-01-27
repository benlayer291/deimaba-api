# deimaba portfolio site API

This repo creates static json files to be used as a data cache for the deimaba.com portfolio site.

It fetches data from the DatoCMS, formats it and writes it to .json files.

The node environment (production or development) determines whether only published or published/draft content is fetch from the CMS

## Useful links

https://www.netlify.com

## Local setup

```bash
# Install packages
npm install

# Build static json files in dist folder
npm run build
```

Data that is to be fetched from the CMS is set in the associated config files e.g. to fetch data for the homepage we include the following object in the config array:

```javascript
{
  query: homeGql,
  type: 'home',
}
```
