const config = require('./config/cfg.json');
const tmi = require('tmi.js');
const request = require('request');
const fs = require('fs');
var prefix = "!";
let options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: config.twitch.nick,
        password: config.twitch.oauth
    },
    channels: ["#vertex101"]
};
let client = new tmi.client(options);
// Connect the client to the server..
client.connect();
//join the channels from the json file
client.on("connected", async (address, port) => {
    //TODO: loop through the json file to connect to the channels
    fs.readFile('config/channel.json', (err, data) => {  
        if (err) throw err;
        let jChan = JSON.parse(data);
        for (var key in jChan)
        {
            var juChan = jChan[key];
            client.join(juChan);
        }
    });
});
client.on("chat", async (channel, user, message, self) => {
    if (self) return;

    if(message.indexOf(prefix) !== 0) return;
    const args = message.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(user.username == channel.replace("#", "") ||  user.mod || user.username == "vertex101"){
        if(command == "cmds") {
            if(channel == "#finncapp") {
                client.say(channel, "Current Commands: !ex, !hunter, !doc, !mirror, !round, !chaos, !exc, !starter")
            } else {
                setTimeout(function () {
                    client.say(channel, "Current Commands: !ex, !hunter, !doc, !mirror, !round, !chaos, !exc, !starter")
                }, 3000); 
            }
        }
        if(command == "ex") {
            request('https://poe.ninja/api/data/currencyoverview?league=Delirium&type=Currency', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "1 Exalted Orb is equal to " + Math.round(pullData.lines[7].receive.value) + " Chaos")
                } else {
                    setTimeout(function () {
                        client.say(channel, "1 Exalted Orb is equal to " + Math.round(pullData.lines[7].receive.value) + " Chaos")
                    }, 3000);
                }
            });
        }
        if(command == "hunter") {
            request('https://poe.ninja/api/data/itemoverview?league=Delirium&type=UniqueAccessory', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "HeadHunter is worth " + pullData.lines[0].exaltedValue + "ex")
                } else {
                    setTimeout(function () {
                        client.say(channel, "HeadHunter is worth " + pullData.lines[0].exaltedValue + "ex")
                    }, 3000);  
                }
            });
        }
        if(command == "doc") {
            request('https://poe.ninja/api/data/itemoverview?league=Delirium&type=DivinationCard', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "The Doctor is worth " + pullData.lines[1].exaltedValue + "ex")
                } else {
                    setTimeout(function () {
                        client.say(channel, "The Doctor is worth " + pullData.lines[1].exaltedValue + "ex")
                    }, 3000);
                }
            });
        }
        if(command == "mirror") {
            request('https://poe.ninja/api/data/currencyoverview?league=Delirium&type=Currency', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "Mirror of Kalandra is worth " + Math.round(pullData.lines[0].receive.value / pullData.lines[7].receive.value) + "ex")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Mirror of Kalandra is worth " + Math.round(pullData.lines[0].receive.value / pullData.lines[7].receive.value) + "ex")
                    }, 3000); 
                } 
            });
        }
        if(command == "round") {
            if(args[0]) {
                request('https://poe.ninja/api/data/currencyoverview?league=Delirium&type=Currency', function (error, response, body) {
                    pullData = JSON.parse(body);
                    var cTotal = (pullData.lines[7].receive.value * Number("0." + args[0] + "0"))
                    if(channel == "#finncapp") {
                        client.say(channel, "0." + args[0] + "ex is " + Math.round(cTotal) + "c")
                    } else {
                        setTimeout(function () {
                            client.say(channel, "0." + args[0] + "ex is " + Math.round(cTotal) + "c")
                        }, 3000);
                    } 
                });
            } else {
                setTimeout(function () {
                    client.say(channel, "Usage: !round [1-9]")
                }, 3000);
            }
        }
        if(command == "chaos") {
            if(args[0]) {
                request('https://poe.ninja/api/data/currencyoverview?league=Delirium&type=Currency', function (error, response, body) {
                    pullData = JSON.parse(body);
                    var cTotal = (Number(args[0]) / pullData.lines[7].receive.value)
                    var getOdds = cTotal.toFixed(2).split('.')
                    var cChaos = (pullData.lines[7].receive.value * Number("0." + getOdds[1]))
                    if(channel == "#finncapp") {
                        client.say(channel, args[0]+"c = " + getOdds[0] + "ex " + Math.round(cChaos) + "c")
                    } else {
                        setTimeout(function () {
                            client.say(channel, args[0]+"c = " + getOdds[0] + "ex " + Math.round(cChaos) + "c")
                        }, 3000); 
                    }
                });
            } else {
                setTimeout(function () {
                    client.say(channel, "Usage: !chaos [amount]")
                }, 3000);
            }
        }
        if(command == "exc") {
            if(args[0]) {
                request('https://poe.ninja/api/data/currencyoverview?league=Delirium&type=Currency', function (error, response, body) {
                    pullData = JSON.parse(body);
                    if(args[0].includes('.')) {
                        var getARG = args[0].split('.')
                        var cTotal = (Number(getARG[0]) * pullData.lines[7].receive.value)
                        var getOdds = (pullData.lines[7].receive.value * Number("0." + getARG[1]))
                    } else {
                        var cTotal = (Number(args[0]) * pullData.lines[7].receive.value)
                        var getOdds = 0
                    }
                    if(channel == "#finncapp") {
                        client.say(channel, args[0]+"ex = " + Math.round(cTotal + getOdds) + "c")
                    } else {
                        setTimeout(function () {
                            client.say(channel, args[0]+"ex = " + Math.round(cTotal + getOdds) + "c")
                        }, 3000); 
                    }
                });
            } else {
                setTimeout(function () {
                    client.say(channel, "Usage: !exc [amount]")
                }, 3000);
            }
        }
        if(command == "sim") {
            request('https://poe.ninja/api/data/currencyoverview?league=Delirium&type=Fragment', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "Simulacrum is equal to " + Math.round(pullData.lines[5].receive.value) + " Chaos")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Simulacrum is equal to " + Math.round(pullData.lines[5].receive.value) + " Chaos")
                    }, 3000);
                }
            });
        }
        if(command == "starter") { //https://www.youtube.com/watch?v=2JPVJIn98B4
            if(channel == "#finncapp") {
                client.say(channel, "New to PoE (Path of Exile) go here https://www.youtube.com/watch?v=2JPVJIn98B4 and watch Beginner Guide + Zizaran's Tips and Tricks")
            } else {
                setTimeout(function () {
                    client.say(channel, "New to PoE (Path of Exile) go here https://www.youtube.com/watch?v=2JPVJIn98B4 and watch Beginner Guide + Zizaran's Tips and Tricks")
                }, 3000);
            }
        }
    }
    if(user.username == "vertex101") {
        if(command == "vso") {
            if(args[0]) {
                request({ url: 'https://api.twitch.tv/kraken/users?login=' + args[0].toLowerCase(), headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': config.twitch.client}}, function (error, response, body) {
                    pullData = JSON.parse(body);
                    request({ url: 'https://api.twitch.tv/kraken/channels/' + pullData.users[0]._id, headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': config.twitch.client}}, function (error, response, body) {
                        pullData = JSON.parse(body);
                        setTimeout(function () {
                            client.say(channel, "You should 100% check out " + pullData.display_name + "! You can find them," +
                            " here >> https://twitch.tv/" + pullData.name + " <3 They were last playing >> " + pullData.game + "!")
                        }, 3000);
                    });
                });
            }
        }
        if(command == "bpop") { //
            setTimeout(function () {
                client.say(channel, "Bane POP build by mbXtreme https://www.youtube.com/watch?v=RDJqEdWqdAE the PoB is in the video description")
            }, 3000);
        }
    }
    if(channel == "#finncapp") {
        if(command == "coc") { 
            setTimeout(function () {
                client.say(channel, 
                    "CoC Ice Nova Assassin" +
                    " ▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬" +
                    " currently running https://www.youtube.com/watch?v=UqC4WM7am20 <-- by Esoro" +
                    " and working torwards https://www.youtube.com/watch?v=lgBaGtv2w6s <-- by Zenn" +
                    " the PoB is in the video descriptions")
            }, 3000);
        }
    }
});