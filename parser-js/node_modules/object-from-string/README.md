# object-from-string

Creates an object form a string where key and value are separated by a delimiter.

``` javascript
const objectFrom = require('object-from-string')(':')

console.log(objectFrom('captain: jean-luc picard')) // { captain: "jean-luc picard" }

console.log(objectFrom('first officer, william riker')) // {}
```
