# Ahrefs


## install

```bash
  npm install node-ahrefs
```


## Usage

```javascript

var ahrefs = require('node-ahrefs')({
  token: '<YOUR TOKEN>'
});

var req = ahrefs.newRequest('ahrefs.com', 'domain')
  // Select using an array
  .select(['date','type'])
  // can be used with arguments
  //.select('refdomain','domain_rating')

  .exec(function(err, result){

  })

```

## Options

- token


## Run tests

You must specify your token to run the test suite:

```bash
  TOKEN=<YOUR TOKEN> npm test
```

You can also run the tests agains your own target if needed (default is `ahrefs.com`):
```bash
  TARGET=<YOUR TARGET> TOKEN=<YOUR TOKEN> npm test
```

**All tests run using `ahrefs.com` domain and therefore does not cost anything**
