const express = require('express')
const request = require('request')

const app = express()

app.get('/api/news/latest', (req, res) => {
  const targetUrl = 'http://news-at.zhihu.com/api/4/news/latest' // 目标地址

  // 发起代理请求
  request.get(targetUrl, (error, response, body) => {
    if (error) {
      console.error('Error:', error)
      res.status(500).send('Internal Server Error')
    } else {
      // 将目标地址的响应返回给客户端
      res.send(body)
    }
  })
})

// 启动服务器
app.listen(3000, () => {
  console.log('Proxy server is running on port 3000')
})
// 在上述示例中，我们使用 Express 框架创建了一个简单的代理服务器。当客户端发起 `/api/news/latest` 的 GET 请求时，服务器将使用 `request` 模块发起一个 GET 请求到目标地址，并将目标地址的响应返回给客户端。
