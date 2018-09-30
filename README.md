nodejs sdk for xfyun
===========

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/xfyun-nodejs-sdk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/xfyun-nodejs-sdk
[download-image]: https://img.shields.io/npm/dm/xfyun-nodejs-sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/xfyun-nodejs-sdk

## 功能模块
见[科大讯飞REST API文档](https://doc.xfyun.cn/rest_api/)

- 语音合成 tts
- 语音听写 iat
- 语音评测 ise
- 实时语音转写 rtasr

## Installation
```sh
$ npm install --save xfyun-nodejs-sdk
```

## Usage
```js
const XFYun = require('xfyun-nodejs-sdk')

const xfYun = new XFYun(appId, appKey)

const result = await xfYun.tts('测试一下这个翻译', 'audio/L16;rate=16000', 'raw', 'xiaoyan')

```
