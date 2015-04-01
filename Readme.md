### Usage

```html
<a ant-click="id1">hello</a>
<a ant-mouseout="id2">world</a>
```

```js
ant.trigger(id, function(event) {
  // do ...
})

let events = ant.gather(id)

ant.all = function(event, id) {
  // do ...
}
```

### License
MIT
