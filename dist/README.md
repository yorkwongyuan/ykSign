> Terminal string styling done right

# yk-sign

## Install
This is a plugin that you can sign by ur hand on the screen.
```console
$ npm install yk-sign
```

## Usage

```js
const YkSign = require('yk-sign');

const yksign = new YkSign({
  el: '#container',
  width: 400,
  height: 400,
  canvasOptions: {
    lineWidth: 3,
    strokeStyle: '#323888',
    lineCap: 'round',
    lineJoin: 'round',
    shadowBlur: 1
  }
})
```

Easily clear the canvas:

```
...
yksign.clearRect(0, 0, 400, 400)
...

```

Get the image,which transformed from canvas

```
let img = yksign.canvas2Img()
```


## API

### ykSign(Object)

### ykSign.el

The wrap of canvas element

```js
const yksign = new Yksign({
    el:'selector'
})
```

### chalk.width/height

The width of canvas

```js
const yksign = new Yksign({
    width:100,
    height:100
})
```