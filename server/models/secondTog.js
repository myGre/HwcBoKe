const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, required: true }, // 标签名
  typeId: { type: Number, required: true }, // 类型
  desc: { type: String, default: '' }, // 描述
  content: { type: String, default: '' }, // 二级标签内容
  createdAt: Number, // 创建时间
  updatedAt: Number // 更新时间
}, {
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
  }
})

module.exports = mongoose.model('secondTog', schema);