# indentation-length

Returns the indentation length of a string. *Tabs and spaces are treated equally*.

``` javascript
const indentation = require('indentation-length')

const indented = '   whammy'

console.log(indentation(indented)) // 3

const str = 'bam'

console.log(indentation(str)) // 0
```
