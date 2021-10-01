//Copyright(c) 2021 Arth(qmy)
function TextP(str,code) {
    let Central = `${str}`.split(",")
    let Output = [];
    for (let index = 0; index < Central.length; index++) {
      Output.push(`${code}${Central[index]}${code}`)
    }
    return Output.toString();
  }
  module.exports =TextP