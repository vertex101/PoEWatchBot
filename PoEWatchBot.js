const config = require('./config/cfg.json');
const tmi = require('tmi.js');
const request = require('request');
const fs = require('fs');
var gem2120 = [], gem2123 = [], gemAwake = []
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
                client.say(channel, "Current Commands: !ex, !23, !awakened, !20, !hunter, !doc, !mirror, !round, !chaos, !exc, !starter")
            } else {
                setTimeout(function () {
                    client.say(channel, "Current Commands: !ex, !23, !awakened, !20, !hunter, !doc, !mirror, !round, !chaos, !exc, !starter")
                }, 3000); 
            }
        }
        if(command == "ex") {
            request('https://api.poe.watch/item?id=142', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "1 Exalted Orb is equal to " + pullData.leagues[0].mode + " Chaos")
                } else {
                    setTimeout(function () {
                        client.say(channel, "1 Exalted Orb is equal to " + pullData.leagues[0].mode + " Chaos")
                    }, 3000);
                }
            });
        }
        if(command == "23") {
            request("https://api.poe.watch/get?league=Metamorph&category=gem", function (error, responce, body) {
                top523 = JSON.parse(body);
                top523.forEach(function (fruit) {
                    if(fruit.gemLevel == "21" && fruit.gemQuality == "23") { // && fruit.change != "0"
                        gem2123.push(fruit.name+":"+fruit.exalted.toFixed(2))
                    }
                });
                if(channel == "#finncapp") {
                    var gem1 = gem2123[0].split(":")
                        var gem2 = gem2123[1].split(":")
                        var gem3 = gem2123[2].split(":")
                        var gem4 = gem2123[3].split(":")
                        var gem5 = gem2123[4].split(":")
                        client.say(channel, "Top 5 21/23 GEMS 1) "
                            + gem1[0] + " - " + gem1[1]
                            + "ex 2) " + gem2[0] + " - " + gem2[1]
                            + "ex 3) " + gem3[0] + " - " + gem3[1]
                            + "ex 4) " + gem4[0] + " - " + gem4[1]
                            + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                } else {
                    setTimeout(function() {
                        var gem1 = gem2123[0].split(":")
                        var gem2 = gem2123[1].split(":")
                        var gem3 = gem2123[2].split(":")
                        var gem4 = gem2123[3].split(":")
                        var gem5 = gem2123[4].split(":")
                        client.say(channel, "Top 5 21/23 GEMS 1) "
                            + gem1[0] + " - " + gem1[1]
                            + "ex 2) " + gem2[0] + " - " + gem2[1]
                            + "ex 3) " + gem3[0] + " - " + gem3[1]
                            + "ex 4) " + gem4[0] + " - " + gem4[1]
                            + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                    }, 3000)
                }
            });
        }
        if(command == "awakened") {
            request("https://api.poe.watch/get?league=Metamorph&category=gem", function (error, responce, body) {
                topAwak = JSON.parse(body);
                topAwak.forEach(function (fruit) {
                    if(fruit.name.includes("Awakened") && fruit.gemQuality == "20") { // && fruit.change != "0"
                    gemAwake.push(fruit.name+":"+fruit.exalted.toFixed(2))
                    }
                });
                if(channel == "#finncapp") {
                    var gem1 = gemAwake[0].split(":")
                        var gem2 = gemAwake[1].split(":")
                        var gem3 = gemAwake[2].split(":")
                        var gem4 = gemAwake[3].split(":")
                        var gem5 = gemAwake[4].split(":")
                        client.say(channel, "Top 5 Awakened GEMS 1) "
                            + gem1[0] + " - " + gem1[1]
                            + "ex 2) " + gem2[0] + " - " + gem2[1]
                            + "ex 3) " + gem3[0] + " - " + gem3[1]
                            + "ex 4) " + gem4[0] + " - " + gem4[1]
                            + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                } else {
                    setTimeout(function() {
                        var gem1 = gemAwake[0].split(":")
                        var gem2 = gemAwake[1].split(":")
                        var gem3 = gemAwake[2].split(":")
                        var gem4 = gemAwake[3].split(":")
                        var gem5 = gemAwake[4].split(":")
                        client.say(channel, "Top 5 Awakened GEMS 1) "
                            + gem1[0] + " - " + gem1[1]
                            + "ex 2) " + gem2[0] + " - " + gem2[1]
                            + "ex 3) " + gem3[0] + " - " + gem3[1]
                            + "ex 4) " + gem4[0] + " - " + gem4[1]
                            + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                    }, 3000) 
                } 
            });
        }
        if(command == "20") {
            request("https://api.poe.watch/get?league=Metamorph&category=gem", function (error, responce, body) {
                top520 = JSON.parse(body);
                top520.forEach(function (fruit) {
                    if(fruit.gemLevel == "21" && fruit.gemQuality == "20") { //&& fruit.change != "0"
                        gem2120.push(fruit.name+":"+fruit.exalted.toFixed(2))
                    }
                });
                if(channel == "#finncapp") {
                    var gem1 = gem2120[0].split(":")
                        var gem2 = gem2120[1].split(":")
                        var gem3 = gem2120[2].split(":")
                        var gem4 = gem2120[3].split(":")
                        var gem5 = gem2120[4].split(":")
                        client.say(channel, "Top 5 21/20 GEMS 1) "
                            + gem1[0] + " - " + gem1[1]
                            + "ex 2) " + gem2[0] + " - " + gem2[1]
                            + "ex 3) " + gem3[0] + " - " + gem3[1]
                            + "ex 4) " + gem4[0] + " - " + gem4[1]
                            + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                } else {
                    setTimeout(function() {
                        var gem1 = gem2120[0].split(":")
                        var gem2 = gem2120[1].split(":")
                        var gem3 = gem2120[2].split(":")
                        var gem4 = gem2120[3].split(":")
                        var gem5 = gem2120[4].split(":")
                        client.say(channel, "Top 5 21/20 GEMS 1) "
                            + gem1[0] + " - " + gem1[1]
                            + "ex 2) " + gem2[0] + " - " + gem2[1]
                            + "ex 3) " + gem3[0] + " - " + gem3[1]
                            + "ex 4) " + gem4[0] + " - " + gem4[1]
                            + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                    }, 3000)
                } 
            });
        }
        if(command == "hunter") {
            request('https://api.poe.watch/item?id=3891', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "HeadHunter is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                } else {
                    setTimeout(function () {
                        client.say(channel, "HeadHunter is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                    }, 3000);  
                }
            });
        }
        if(command == "doc") {
            request('https://api.poe.watch/item?id=3509', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "The Doctor is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                } else {
                    setTimeout(function () {
                        client.say(channel, "The Doctor is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                    }, 3000);
                }
            });
        }
        if(command == "mirror") {
            request('https://api.poe.watch/item?id=3283', function (error, response, body) {
                pullData = JSON.parse(body);
                if(channel == "#finncapp") {
                    client.say(channel, "Mirror of Kalandra is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Mirror of Kalandra is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                    }, 3000); 
                } 
            });
        }
        if(command == "round") {
            if(args[0]) {
                request('https://api.poe.watch/item?id=142', function (error, response, body) {
                    pullData = JSON.parse(body);
                    var cTotal = (pullData.leagues[0].mode * Number("0." + args[0] + "0"))
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
                request('https://api.poe.watch/item?id=142', function (error, response, body) {
                    pullData = JSON.parse(body);
                    var cTotal = (Number(args[0]) / pullData.leagues[0].mode)
                    var getOdds = cTotal.toFixed(2).split('.')
                    request('https://api.poe.watch/item?id=142', function (error, response, body) {
                        pullData = JSON.parse(body);
                        var cChaos = (pullData.leagues[0].mode * Number("0." + getOdds[0]))
                        if(channel == "#finncapp") {
                            client.say(channel, args[0]+"c = " + getOdds[0] + "ex " + cChaos + "c")
                        } else {
                            setTimeout(function () {
                                client.say(channel, args[0]+"c = " + getOdds[0] + "ex " + cChaos + "c")
                            }, 3000); 
                        }
                    });
                });
            } else {
                setTimeout(function () {
                    client.say(channel, "Usage: !chaos [amount]")
                }, 3000);
            }
        }
        if(command == "exc") {
            if(args[0]) {
                request('https://api.poe.watch/item?id=142', function (error, response, body) {
                    pullData = JSON.parse(body);
                    var getARG = args[0].split('.')
                    var cTotal = (Number(getARG[0]) * pullData.leagues[0].mode)
                    var getOdds = (pullData.leagues[0].mode * Number("0." + getARG[1]))
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
    if(channel == "#sketch") {
        if(command == "gfg") { 
            setTimeout(function () {
                client.say(channel, 
                    "Gamers for Giving is a weekend-long competitive gaming tournament,"+
                    "LAN party, & streamathon that helps raise money in support of Gamers Outreach programs."+
                    "Ticket sales and donations help provide entertainment devices to hospitalized children."+
                    " to learn more go to https://gamersforgiving.org/")
            }, 3000);
        }
        if(command == "go") { 
            setTimeout(function () {
                client.say(channel, 
                    "What is Gamers Outreach?"+
                    "Founded in 2007, we're a 501(c)(3) charity organization that provides equipment,"+
                    "technology, and software to help kids cope with treatment inside hospitals."+
                    " to learn more go to https://gamersoutreach.org/")
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