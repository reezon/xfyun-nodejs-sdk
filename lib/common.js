const axios = require('axios')
const W3CWebSocket = require('websocket').w3cwebsocket
const md5 = require('md5')
const hmacsha1 = require('hmacsha1')
const qs = require('querystring')
const { Base64 } = require('js-base64')

class API {
  constructor (appId, apiKey) {
    this.appId = appId
    this.apiKey = apiKey

    this.prefix = 'https://api.xfyun.cn/v1/service/v1'
  }

  async doHttpPost (url, params, body) {
    const encodeParams = Base64.encode(JSON.stringify(params))
    const timeStamp = parseInt(new Date().getTime() / 1000).toString()
    const requestParams = {
      method: 'post',
      url: url,
      data: qs.stringify(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'X-Appid': this.appId,
        'X-CurTime': timeStamp,
        'X-Param': encodeParams,
        'X-CheckSum': md5(this.apiKey + timeStamp + encodeParams)
      }
    }

    const res = await axios(requestParams)

    return res.data
  }

  async doSocketConnect (messageCallbackFunc) {
    let connectUrl = 'wss://rtasr.xfyun.cn/v1/ws?'

    const timeStamp = parseInt(new Date().getTime() / 1000).toString()

    const baseString = this.appId + timeStamp

    const signa = hmacsha1(this.apiKey, md5(baseString))

    connectUrl += 'appid=' + this.appId + '&ts=' + timeStamp + '&signa=' + signa

    let socket = new W3CWebSocket(connectUrl)

    socket.onopen = function () {
      console.log('WebSocket Client Connected')
    }

    socket.onerror = function () {
      console.log('Connection Error')
    }

    socket.onclose = function () {
      console.log('echo-protocol Client Closed')
    }

    socket.onmessage = function (e) {
      if (typeof e.data === 'string') {
        let data = JSON.parse(e.data)
        messageCallbackFunc(data)
      }
    }

    this.socket = socket
  }

  async doSocketMsgSend (message) {
    this.socket.send(message)
  }

  async doSocketDisconnect () {
    this.socket.send(JSON.stringify({end: true}))

    this.socket.close()
  }
}

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * @param {Object} obj 要合并的对象
 */
API.mixin = function (obj) {
  for (const key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error(
        "Don't allow override existed prototype method. method: " + key
      )
    }
    API.prototype[key] = obj[key]
  }
}

module.exports = API
