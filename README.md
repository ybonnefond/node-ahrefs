# Ahrefs

[Ahrefs api documentation](https://ahrefs.com/api/documentation)

## installation

```bash
  npm install ahrefs
```


## Usage

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

Finally make the request and get the result. The err passed to the callback may contain:
- Any error raised by the module `request` when executing the request. i.e http errors
- Any XML or JSON parsing errors
- Any error returned by ahrefs

```javascript
// Make a get request
ahrefs.get(query, function(err, result){

});

// Make a post request
ahrefs.post(query, function(err, result){

});
```

### Query methods

| Method      | Req. | Default | Multi | Description                                                    | Example                                                                               |
|-------------|------|---------|-------|----------------------------------------------------------------|---------------------------|
| **target**  | Y    |     | N     | Aim of a request: a domain, a directory or a URL               | query.target('ahrefs.com')|
| **from**    | Y    |       | N     | Table to select data from                                      | query.from('anchors')|
| **mode**    | N    | 'exact' | N     | Mode of operation: `exact`, `domain`, `subdomains` or `prefix` | query.mode('domain')|
| **output**  | N    | 'json'  | N     | Output format: xml, json                                       | query.output('xml')|
| **select**  | N    |         | Y     | List of columns to select                                      | query.select('backlink', 'anchor') or query.select(['backlink', 'anchor']) |
| **where**   | N    |         | Y     | "Where" condition to satisfy                                   | query.where('lt', 'backlinks', 10) |
| **having**  | N    |         | Y     | "Having" condition to satisfy                                  | query.having('lt', 'backlinks', 10) |
| **orderBy** | N    |         | Y     | List of columns to sort on                                     | query.orderBy('backlink', 'anchor:desc') or query.orderBy(['backlink:asc', 'anchor']) |
| **limit**   | N    | 1000    | N     | Number of results to return                                    | query.limit(10) |
| **offset**  | N    |         | N     | Position from which to start returning data                    | query.offset(10)|


### Complete Example

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
