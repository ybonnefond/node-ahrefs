# Ahrefs

- [Get an Ahrefs authentication token](https://ahrefs.com/api/profile)
- [Ahrefs api documentation](https://ahrefs.com/api/documentation)

## installation

```bash
  npm install ahrefs
```

## API

@see [Api documentation](docs/api.md)


## Basic Usage

Require the module and pass your options:

```javascript
var ahrefs = require('ahrefs')({ token: '<YOUR TOKEN>' });
```

Available options:

- **token** {string} : Authentication token
- **url** {string} [optional] : Api url, Default: http://apiv2.ahrefs.com/,
- **validate** {boolean} [optional] : If set to true, the module will verify the column sets in the query and **throw** an error if the column does not exists


Build a query:
```javascript
var query = ahrefs.newQuery()
  // Aim of a request: a domain, a directory or a URL
  .target('ahrefs.com')
  // Mode of operation: exact, domain, subdomains or prefix
  .mode('domain')
  // Table to select data from, see https://ahrefs.com/api/documentation for a complete list
  .from('ahrefs_rank');
```

Make the request and get the result :

```javascript
// Make a get request
ahrefs.get(query, function(err, result){

});

// Make a post request
ahrefs.post(query, function(err, result){

});
```

## Complete Example

```javascript

var query = ahrefs.newQuery()
  .target('ahrefs.com')
  .mode('domain') // Mode of operation: exact, domain, subdomains or prefix
  .output('xml') // Output format
  .select('anchor', 'backlinks') // List of columns to select (can be set multiple times)
  .from('anchors') // Table to select data from:  https://ahrefs.com/api/documentation/anchors
  .where('lt', 'backlinks', 10) // "Where" condition to satisfy, Less than 10 backlinks
  .where('lt', 'refpages', 5) // Can set multiple where clause
  .having('anchor', 'word', 'link') // Having the word `link` in anchor text
  .orderBy('first_seen', 'last_visited:desc') // ordering first by first_seen ascending, then by last_visited descending. Can be set multiple times
  .limit(10) // return 10 rows
  .offset(5); // from row 5

// Run the query
ahrefs.get(query, function(err, result){
  // do something
  if (err instanceof ahrefs.ValidationError) {
    // handle validation error
  }
});
```

## Run tests

You must specify your token to run the test suite:

```bash
  TOKEN=<YOUR TOKEN> npm test
```

You can also run the tests agains your own target if needed (default is `ahrefs.com`):
```bash
  TARGET=<YOUR TARGET> TOKEN=<YOUR TOKEN> npm test
```

**All tests run using `ahrefs.com` domain and therefore does not cost a peny**

# Special Thanks
Developed for <a target="_blank" href="http://optimiz.me">Optimiz.me</a>, an online software designed to help working the SEO optimisation of your web site, by yourself, without the need of technical knowledge.

Développé pour <a target="_blank" href="http://optimiz.me">Optimiz.me</a>, un logiciel en ligne conçu pour aider à travailler l'optimisation du référencement de votre site web, par vous-même, sans besoin de connaissances techniques.
