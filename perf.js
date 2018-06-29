const isCircular = require('./')

let o = {
  test: 123,
  y: {
    z: {
      test: 123
    }
  }
}

let i = 0
while (i < 10000000) {
  isCircular(o)
  i++
}
