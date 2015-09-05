## Classes
<dl>
<dt><a href="#Ahrefs">Ahrefs</a></dt>
<dd></dd>
<dt><a href="#Query">Query</a></dt>
<dd></dd>
<dt><a href="#ValidationError">ValidationError</a></dt>
<dd></dd>
</dl>
## Members
<dl>
<dt><a href="#ValidationError">ValidationError</a> : <code><a href="#ValidationError">ValidationError</a></code></dt>
<dd><p>Error class that will be thrown during the validation process</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#responseCallback">responseCallback</a> : <code>function</code></dt>
<dd><p>Define a callback called on response</p>
</dd>
</dl>
<a name="Ahrefs"></a>
## Ahrefs
**Kind**: global class  

* [Ahrefs](#Ahrefs)
  * [new Ahrefs(options)](#new_Ahrefs_new)
  * [.newQuery()](#Ahrefs+newQuery) ⇒ <code>[Query](#Query)</code>
  * [.get(query, callback)](#Ahrefs+get)
  * [.post(query, callback)](#Ahrefs+post)

<a name="new_Ahrefs_new"></a>
### new Ahrefs(options)
Create a new Ahrefs instance


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | List of options |
| options.token | <code>string</code> | Ahrefs Token |
| [options.url] | <code>string</code> | Ahrefs API url. Default: 'http://apiv2.ahrefs.com/' |
| [options.validate] | <code>boolean</code> | Set to false to disable parameter validation. Default: true. |

<a name="Ahrefs+newQuery"></a>
### ahrefs.newQuery() ⇒ <code>[Query](#Query)</code>
Get a Query instance

**Kind**: instance method of <code>[Ahrefs](#Ahrefs)</code>  
<a name="Ahrefs+get"></a>
### ahrefs.get(query, callback)
Perform a GET request

**Kind**: instance method of <code>[Ahrefs](#Ahrefs)</code>  
**Throws**:

- <code>[ValidationError](#ValidationError)</code> 


| Param | Type | Description |
| --- | --- | --- |
| query | <code>[Query](#Query)</code> | Query to execute |
| callback | <code>[responseCallback](#responseCallback)</code> | Callback called on error or when received a response from the API |

<a name="Ahrefs+post"></a>
### ahrefs.post(query, callback)
Perform a POST request

**Kind**: instance method of <code>[Ahrefs](#Ahrefs)</code>  
**Throws**:

- <code>[ValidationError](#ValidationError)</code> 


| Param | Type | Description |
| --- | --- | --- |
| query | <code>[Query](#Query)</code> | Query to execute |
| callback | <code>[responseCallback](#responseCallback)</code> | Callback called on error or when received a response from the API |

<a name="Query"></a>
## Query
**Kind**: global class  

* [Query](#Query)
  * [new Query()](#new_Query_new)
  * [.select(select)](#Query+select) ⇒ <code>[Query](#Query)</code>
  * [.orderBy(select)](#Query+orderBy) ⇒ <code>[Query](#Query)</code>
  * [.where(operator, column, value)](#Query+where) ⇒ <code>[Query](#Query)</code>
  * [.having(operator, column, value)](#Query+having) ⇒ <code>[Query](#Query)</code>
  * [.target(target)](#Query+target) ⇒ <code>[Query](#Query)</code>
  * [.limit(limit)](#Query+limit) ⇒ <code>[Query](#Query)</code>
  * [.offset(offset)](#Query+offset) ⇒ <code>[Query](#Query)</code>
  * [.from(from)](#Query+from) ⇒ <code>[Query](#Query)</code>
  * [.output(output)](#Query+output) ⇒ <code>[Query](#Query)</code>
  * [.mode(mode)](#Query+mode) ⇒ <code>[Query](#Query)</code>

<a name="new_Query_new"></a>
### new Query()
Represent a Query to send to Ahrefs api

<a name="Query+select"></a>
### query.select(select) ⇒ <code>[Query](#Query)</code>
Set the select parameter.

Can be either a column name or an array of columns

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| select | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | Column(s) to select |

<a name="Query+orderBy"></a>
### query.orderBy(select) ⇒ <code>[Query](#Query)</code>
Set the order_by parameter.

Can be either a column name or an array of columns

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| select | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | Column(s) to order by |

<a name="Query+where"></a>
### query.where(operator, column, value) ⇒ <code>[Query](#Query)</code>
Add a where clause.

This method can be called multiple times

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| operator | <code>string</code> | One of ["eq","ne","lt", "gt", "lte", "gte", "substring","word","subdomain"] |
| column | <code>string</code> | Column to set the where condition on |
| value | <code>mixed</code> | Where condition value |

<a name="Query+having"></a>
### query.having(operator, column, value) ⇒ <code>[Query](#Query)</code>
Add a having clause.

This method can be called multiple times

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| operator | <code>string</code> | One of ["eq","ne","lt", "gt", "lte", "gte", "substring","word","subdomain"] |
| column | <code>string</code> | Column to set the having condition on |
| value | <code>mixed</code> | Having condition value |

<a name="Query+target"></a>
### query.target(target) ⇒ <code>[Query](#Query)</code>
Set the target parameter

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | Request target. E.g. an url |

<a name="Query+limit"></a>
### query.limit(limit) ⇒ <code>[Query](#Query)</code>
Set the limit parameter

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>integer</code> | Number of results to return |

<a name="Query+offset"></a>
### query.offset(offset) ⇒ <code>[Query](#Query)</code>
Set the offset parameter

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>integer</code> | Position from which to start returning data |

<a name="Query+from"></a>
### query.from(from) ⇒ <code>[Query](#Query)</code>
Set the from parameter

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | Table to select data from |

<a name="Query+output"></a>
### query.output(output) ⇒ <code>[Query](#Query)</code>
Set the output parameter.
Default output is set to json

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>string</code> | Output format. One of xml or json |

<a name="Query+mode"></a>
### query.mode(mode) ⇒ <code>[Query](#Query)</code>
Set the mode parameter
Default mode is set to `exact`

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>string</code> | Mode of operation: exact, domain, subdomains or prefix |

<a name="ValidationError"></a>
## ValidationError
**Kind**: global class  
<a name="new_ValidationError_new"></a>
### new ValidationError()
Error thrown during validation

```javascript
try {
  ahrefs.get(query, function(err){
    if (err instanceof ahrefs.ValidationError) {
       // Handle validation error
    }
  })
}
```

<a name="ValidationError"></a>
## ValidationError : <code>[ValidationError](#ValidationError)</code>
Error class that will be thrown during the validation process

**Kind**: global variable  
<a name="new_ValidationError_new"></a>
### new ValidationError()
Error thrown during validation

```javascript
try {
  ahrefs.get(query, function(err){
    if (err instanceof ahrefs.ValidationError) {
       // Handle validation error
    }
  })
}
```

<a name="responseCallback"></a>
## responseCallback : <code>function</code>
Define a callback called on response

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> &#124; <code>null</code> | Error thrown during the request, null if the request has been executed correctly |
| result | <code>object</code> &#124; <code>null</code> | Results return by the api or null if there is an error |

