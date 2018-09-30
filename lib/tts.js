const urlencode = require('urlencode')
/**
 * 语音合成
 * 语音合成接口将文字信息转化为声音信息，同时提供了众多极具特色的发音人（音库）供您选择。
 * 详情请见：<https://doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E5%90%88%E6%88%90.html>
 * @param {String} text 待合成文本，使用utf-8编码，需urlencode，长度小于1000字节
 * @param {String} auf 音频采样率
 * @param {String} aue 音频编码，可选值：raw（未压缩的pcm或wav格式），lame（mp3格式）
 * @param {String} voiceName 发音人
 * @param {Number} speed 语速，可选值：[0-100]，默认为50
 * @param {Number} volume 音量，可选值：[0-100]，默认为50
 * @param {Number} pitch 音高，可选值：[0-100]，默认为50
 * @param {String} engineType 引擎类型，可选值：aisound（普通效果），intp65（中文），intp65_en（英文），mtts（小语种，需配合小语种发音人使用），x（优化效果），默认为inpt65
 * @param {String} textType 文本类型，可选值：text（普通格式文本），默认为text
 */
exports.tts = async function (text, auf, aue, voiceName, speed = 50, volume = 50, pitch = 50, engineType = 'intp65', textType = 'text') {
  const apiUrl = this.prefix + '/tts'

  let params = {
    auf: auf,
    aue: aue,
    voice_name: voiceName,
    speed: speed.toString(),
    volume: volume.toString(),
    pitch: pitch.toString(),
    engine_type: engineType,
    text_type: textType
  }

  return this.doHttpPost(apiUrl, params, {text: urlencode(text)})
}
