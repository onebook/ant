### Usage

```html
<a ant-click="id1">hello</a>
<a ant-mouseout="id2">world</a>
```

```js
import { trigger, gather } from 'ant'

trigger('id1', function(event) {
  // do ...
})

let events = gather(id)

trigger('*', function(event, id, type) {
  // do ...
})
```

### License
MIT
