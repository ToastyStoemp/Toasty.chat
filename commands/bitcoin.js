var request = require("request");

request("https://api.coindesk.com/v1/bpi/currentprice.json", function (err, res, body) {
  if(err) 
    return;
  module.btc = JSON.parse(body);
});

function prepareArgs(args) {
  var a = args;
  if(!a[0])
    a[0] = 1;
  a[0] = parseFloat(a[0]);
  if(String(a[0]) == "NaN")
    return "";
  return a;
}
function BtcToUSD(bot, sender, args, data, client) {
  args = prepareArgs(args);
  if(!args)
    return bot.sendAll("Could not process", client);
  var output = "@" + sender + " " + args[0] + " BTC = " + (args[0] * module.btc.bpi.USD.rate_float) + " USD.";
  return bot.sendAll(output, client);
}

function BtcToEUR(bot, sender, args, data, client) {
  args = prepareArgs(args);
  if(!args)
    return bot.sendAll("Could not process", client);
  var output = "@" + sender + " " + args[0] + " BTC = " + (args[0] * module.btc.bpi.EUR.rate_float) + " USD.";
  return bot.sendAll(output, client);
}
module.exports = {
  btctousd: BtcToUSD,
  btctoeuro: BtcToEUR,
};
