const Counter = require('../models/Counter')

// 设置自增id
function getCounter(name) {
  return new Promise(function (resolve, reject) {
    Counter.findByIdAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
      function (error, counter) {
        if (error) {
          reject(error)
        } else {
          console.log('counter.seq', counter.seq)
          resolve(counter.seq)
        }
      }
    )
  })
}

module.exports = { getCounter }
