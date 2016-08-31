<img src="https://github.com/rogerbf/ior/blob/master/ior-logo.png" width="200px" height="200px">

# ior [ jo ]

Use indentation to describe relationships between objects. i.e:
 ```
universe:
  planets:
    terra: earth
```
Which would correspond to the following javascript object:
``` javascript
{
  universe: {
    planets: {
      terra: "earth"
    }
  }
}
```
