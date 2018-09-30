const urlencode = require('urlencode')
const { Base64 } = require('js-base64')
/**
 * 语音评测
 * 语音评测接口通过智能语音技术自动对发音水平进行评价、发音错误、缺陷定位和问题分析，包括：中文普通话发音水平自动评测技术、英文发音水平自动评测技术
 * 详情请见：<https://doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E8%AF%84%E6%B5%8B.html>
 * @param {String} audio 音频数据，base64 编码后进行 urlencode，要求 base64 编码和 urlencode 后大小不超过2M，原始音频时长不超过60s
 * @param {String} text 评测文本（使用 utf-8 编码），需urlencode，要求长度中文不超过180字符、英文不超过300字符；
 * @param {String} aue 音频编码，可选值：raw（未压缩的pcm或wav格式）、speex（speex格式）、speex-wb（宽频speex格式）
 * @param {String} language 评测语种，可选值： en_us（英语）、 zh_cn（汉语）
 * @param {String} category 评测题型，可选值： read_syllable（单字朗读，汉语专有）、 read_word（词语朗读）、 read_sentence（句子朗读）、read_chapter(段落朗读，需开通权限)
 * @param {String} speexSize speex音频帧率，speex音频必传
 * @param {String} resultLevel 评评测结果等级，可选值： entirety、 simple，默认为 entirety
 * @param {String} extraAbility 拓展能力，可选值：multi_dimension(全维度)、chapter（段落评测）
 */
exports.ise = async function (audio, text, aue, language, category, speexSize, resultLevel, extraAbility) {
  const apiUrl = this.prefix + '/ise'

  let params = {
    aue: aue,
    language: language,
    category: category
  }

  if (speexSize) {
    params.speex_size = speexSize
  }

  if (resultLevel) {
    params.result_level = resultLevel
  }

  if (extraAbility) {
    params.extra_ability = extraAbility
  }

  let encodeAudio = Base64.encode(audio)

  return this.doHttpPost(apiUrl, params, {audio: encodeAudio, text: urlencode(text)})
}
