# Api

## Ahrefs

```javascript
  var ahrefs = require('ahrefs')({ token: <YOUR TOKEN> });
```

- - -

### **ahrefs#newQuery() -> Query**

Get a new query object

```javascript
var query = ahrefs.newQuery();
query.target('ahrefs.com');
```

- - -

### **ahrefs#get(_Query_ query, _Function_ callback)**

Send a get request to ahrefs.

- **query** : a Query object
- **callback**: Callback which is called when the request is complete. Which will receive the following parameters:
  * **err**: The err passed to the callback may contain:
    - Any error raised by the module `request` when executing the request. i.e     http errors
    - Any XML or JSON parsing errors
    - Any error returned by ahrefs
  * **result**: Depend on the `output` parameter. It will contain a javascript object if output is `json` or a string representing the XML response if output is `xml`

```javascript
var query = ahrefs.newQuery()
  .target('ahrefs.com')
  .mode('domain')
  .from('anchors');

ahrefs.get(query, function(err, result){
  if (!err && resul.anchors.length > 0) {

  }
})
```

- - -

### **ahrefs#post(_Query_ query, _Function_ callback)**
Same as get but send the request using http POST method.
@see **ahrefs#get**

- - -

## Query

```javascript
  var query = ahrefs.newQuery();
```

- - -

### **query#target(_String_ target) -> query**

Set the query target

- **target** : A domain, a directory or an URL

```javascript
  query.target('ahrefs.com');
```

- - -

### **query#mode(_String_ mode) -> query**

Set the mode of operation.
Mode is optional, by default query will be send in exact mode.

- **mode** : One of `exact`, `domain`, `subdomains` or `prefix`

```javascript
  query.mode('subdomains');
```

- - -

### **query#output(_String_ output) -> query**

Set the response output format.
Output is optional, by default you will receive a json response.

- **output** : One of `xml` or `json`

```javascript
  query.output('xml');
```

- - -

### **query#select(_Array_ columns) -> query**

Alternative call syntax:
**query#select(_String_ columnA, _String_ columnB, ...) -> query**

Add a list of columns to select. Columns will be appended if called multiple times.

- **columns** : Array of strings representing the columns of a table to select. See [Ahrefs api documentation](https://ahrefs.com/api/documentation) to get the complete list of columns by tables.

```javascript
  query.select('date', 'time');
  // or
  query.select(['anchors', 'backlinks']);
```

- - -

### **query#from(_String_ from) -> query**

Set the table to query to.

- **from** : Table name. See [Ahrefs api documentation](https://ahrefs.com/api/documentation) to get the complete list of tables.

```javascript
  query.from('anchors');
```

- - -

### **query#where(_String_ operator, _String_ column, _Mixed_ value) -> query**

Add a where clause to the query.
Multiple where clause can be added.

- **operator** : One of `ne`, `eq`, `lt`, `gt`, `lte`, `gte`, `substring`, `word`, `subdomain`
- **column**: Column to apply the condition
- **value**: Condition value

```javascript
  query
    .from('anchors')
    .where('lt', 'backlinks', 10)
    .where('word', 'anchor', 'link');
```

- - -

### **query#having(_String_ target) -> query**

Add a having clause to the query.
Multiple having clause can be added.

- **operator** : One of `ne`, `eq`, `lt`, `gt`, `lte`, `gte`, `substring`, `word`, `subdomain`
- **column**: Column to apply the condition
- **value**: Condition value

```javascript
  query
    .from('anchors')
    .having('lt', 'backlinks', 10)
    .having('word', 'anchor', 'link');
```

- - -

### **query#orderBy(_Array_ columns) -> query**

Alternative call syntax:
**query#orderBy(_String_ columnA, _String_ columnB, ...) -> query**

Add a list of columns to sort by. Columns will be appended if called multiple times.

- **columns** : Array of strings representing the columns of a table to order by. `:asc` or `:desc` can be suffixed to the column name to specify the sort direction

```javascript
  query.orderBy('date', 'time');
  // or
  query.orderBy(['anchors:desc', 'backlinks:asc']);
```

- - -

### **query#limit(_Integer_ limit) -> query**

Set the response limit.

- **limit** : Number of results to return. Default : 1000.

```javascript
  query.limit(10);
```

- - -

### **query#offset(_String_ target) -> query**

Set the response offset.

- **limit** : Position from which to start returning data. Default : 0.

```javascript
  query.offset(10);
```

- - -
