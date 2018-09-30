const urlencode = require('urlencode')
const { Base64 } = require('js-base64')
/**
 * 语音听写
 * 语音听写接口可将语音(≤60秒)转换成对应的文字信息。本接口适用于将音频一次性发送至云端，块式传输。
 * 详情请见：<https://doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E5%90%AC%E5%86%99.html>
 * @param {String} audio 音频数据，base64 编码后进行 urlencode，要求 base64 编码和 urlencode 后大小不超过2M，原始音频时长不超过60s
 * @param {String} engineType 引擎类型，可选值：sms16k（16k采样率普通话音频）、sms8k（8k采样率普通话音频）等，其他参见引擎类型说明
 * @param {String} aue 音频编码，可选值：raw（未压缩的pcm或wav格式）、speex（speex格式）、speex-wb（宽频speex格式）
 * @param {String} speexSize speex音频帧率，speex音频必传
 * @param {String} scene 情景模式。如需使用热词功能，必须指定scene=main
 * @param {String} vadEos 后端点检测（单位：ms），默认1800
 */
exports.iat = async function (audio, engineType, aue, speexSize, scene, vadEos) {
  const apiUrl = this.prefix + '/iat'

  let params = {
    engine_type: engineType,
    aue: aue
  }

  if (speexSize) {
    params.speex_size = speexSize
  }

  if (scene) {
    params.scene = scene
  }

  if (vadEos) {
    params.vad_eos = vadEos
  }

  let encodeAudio = Base64.encode(audio)

  return this.doHttpPost(apiUrl, params, {audio: encodeAudio})
}
