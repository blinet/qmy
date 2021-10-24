function check(Value, Default, Type = "undefined") {
  return typeof Value !== Type ? Value : Default;
}
module.exports = check;
