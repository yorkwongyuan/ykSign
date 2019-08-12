class sign {
  constructor(options) {
    this.el = options.el || ''
    this.canvasOptions = options.canvasOptions
    this.canvasWidth = options.width || 300
    this.canvasHeight = options.height || 150
    this._canvas = null; // canvas节点
    this._ctx = null;
    this._startX = 0;
    this._startY = 0;
    this._isStop = false;
    this.events = ('ontouchstart' in window) ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
    this.init()
  }
  isSuppertCanvas () {
    let el = document.createElement('canvas');
    return Boolean(el.getContext && el.getContext('2d'));
  }
  // 初始化
  init () {
    // 如果设备不支持canvas
    if (!this.isSuppertCanvas) {
      console.log('您的设备暂时不支持canvas')
      return;
    }
    this._initCanvas()
    this._getContext()
  }

  // 点击开始
  _startEventHandler (e) {
    e = e.touches ? e.touches[0] : e
    let x = this._canvas.getBoundingClientRect().x;
    let y = this._canvas.getBoundingClientRect().y;
    this._startX = e.clientX - x;
    this._startY = e.clientY - y;
    this._ctx.beginPath();
    this._ctx.moveTo(this._startX, this._startY)
    this._ctx.lineTo(e.clientX - x, e.clientY - y)
    this._ctx.stroke()
    this._isStop = false;
    this._canvas.addEventListener(this.events[1], this._moveEventHandler.bind(this), false)
    this._canvas.addEventListener(this.events[2], this._endEventHandler.bind(this), false)
  }

  // 鼠标移动
  _moveEventHandler (e) {
    e = e.touches ? e.touches[0] : e
    if (!this._isStop) {
      let x = this._canvas.getBoundingClientRect().x;
      let y = this._canvas.getBoundingClientRect().y;
      this._ctx.lineTo(e.clientX - x, e.clientY - y)
      this._ctx.stroke()
    }
  }

  // 鼠标弹开
  _endEventHandler (e) {
    e.preventDefault();
    this._isStop = true;
  }

  // 初始化canvas
  _initCanvas () {
    let canvasWrap = document.querySelector(this.el)
    this._canvas = document.createElement('canvas');
    this._canvas.setAttribute('width', this.canvasWidth);
    this._canvas.setAttribute('height', this.canvasHeight);
    let fragment = document.createDocumentFragment()
    fragment.appendChild(this._canvas)
    canvasWrap.appendChild(fragment)
    this._canvas.addEventListener(this.events[0], this._startEventHandler.bind(this), false)

  }
  // 获取canvas上下文
  _getContext () {
    this._ctx = this._canvas.getContext('2d');
    Object.keys(this.canvasOptions).forEach(item => {
      this._ctx[item] = this.canvasOptions[item]
    })
  }

  clearRect () {
    this._ctx.clearRect(...arguments)
  }
  canvas2Img () {
    let img = this._canvas.toDataURL("image/png")
    document.querySelector('img').src = img
  }
}

window.sign = sign;