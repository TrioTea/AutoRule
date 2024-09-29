export function splitSms (content) {
  let json = JSON.parse(content)
  // 【广东农信】您尾数0666的卡号09月25日12:09补助款收入人民币1000.00元,余额8888.12元。【和平农商银行】
  // ^【(.*?)】(.*)$
  const match1 = json.body.match( /^【(.*?)】(.*)$/);
  const match2 = json.body.match(/^(.*)【(.*?)】$/);
  if (!match1 && !match2) {
    throw new Error('不支持处理的消息格式');
  }
  let [,bankName, text] = match;
  return {
    "sender": json.sender,
    "bankName": bankName,
    "text":text,
    "t": json.t
  }
}