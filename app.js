const tmi = require('tmi.js');
const request = require('requests');
const fs = require('fs');
require('dotenv').config();

var prefix = "?";
var newLeague = "Scourge";
let chaosPrice = "";

const modList = ["finncapp", "vertex101"];
const approvedList = ["vertex101", "akynashark"]

//getting current chaos price for commands
request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
    pullData = JSON.parse(response);
    pullData.lines.forEach(function (chaos) {
        if(chaos.currencyTypeName == "Exalted Orb") {
            chaosPrice = chaos.receive.value
        }
    })
}).on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
});
//getting mods for list
/* request('https://modlookup.3v.fi/api/user-v3/notvertex101?limit=2000&cursor=').on('data', function(response) {
    modList.length = 0
    getMods = JSON.parse(response);
    getMods.channels.forEach(function(mods) {
        modList.push(mods.name)
    });
}).on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
}); */

setInterval(function() {
    request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
        pullData = JSON.parse(response);
        pullData.lines.forEach(function (chaos) {
            if(chaos.currencyTypeName == "Exalted Orb") {
                chaosPrice = chaos.receive.value
            }
        })
    }).on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
    });
/*     request('https://modlookup.3v.fi/api/user-v3/vertex101?limit=2000&cursor=').on('data', function(response) {
        modList.length = 0
        getMods = JSON.parse(response);
        getMods.channels.forEach(function(mods) {
            modList.push(mods.name)
        });
    }).on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
    }); */
}, 300000);

let options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.Nick,
        password: process.env.Auth
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
    if(user.username == channel.replace("#", "") ||  user.mod || approvedList.includes(user.username) || user.subscriber){
        if(command == "cmd") {
            if(modList.includes(channel.replace("#", ""))) {
                client.say(channel, "Current Commands: ?ex, ?hunter, ?tabby, ?doc, ?house ?mirror, ?round, ?chaos, ?exc, ?sim, ?starter")
            } else {
                setTimeout(function () {
                    client.say(channel, "Current Commands: ?ex, ?hunter, ?tabby, ?doc, ?mirror, ?round, ?chaos, ?exc, ?sim, ?starter")
                }, 3000); 
            }
        }
        if(command == "ex") {
            request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.forEach(function (ex) {
                    if(ex.currencyTypeName == "Exalted Orb") {
                        if(modList.includes(channel.replace("#", ""))) {
                            client.say(channel, "1 Exalted Orb is equal to " + Math.round(ex.receive.value) + " Chaos")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "1 Exalted Orb is equal to " + Math.round(ex.receive.value) + " Chaos")
                            }, 3000);
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "hunter") {
            request('https://poe.ninja/api/data/itemoverview?league=' + newLeague + '&type=UniqueAccessory').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.forEach(function (hunt) {
                    if(hunt.name == "Headhunter") {
                        if(modList.includes(channel.replace("#", ""))) {
                            client.say(channel, "HeadHunter is worth " + hunt.exaltedValue + "ex")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "HeadHunter is worth " + hunt.exaltedValue + "ex")
                            }, 3000);  
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "tabby") {
            request('https://poe.ninja/api/data/itemoverview?league=' + newLeague + '&type=UniqueArmour').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.forEach(function (hunt) {
                    if(hunt.name == "Tabula Rasa") {
                        if(modList.includes(channel.replace("#", ""))) {
                            client.say(channel, "Tabula Rasa is worth " + hunt.chaosValue + "c")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "Tabula Rasa is worth " + hunt.chaosValue + "c")
                            }, 3000);  
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "doc") {
            request('https://poe.ninja/api/data/itemoverview?league=' + newLeague + '&type=DivinationCard').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.forEach(function (doc) {
                    if(doc.name == "The Doctor") {
                        if(modList.includes(channel.replace("#", ""))) {
                            client.say(channel, "The Doctor is worth " + doc.exaltedValue + "ex")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "The Doctor is worth " + doc.exaltedValue + "ex")
                            }, 3000);
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "house") {
            request('https://poe.ninja/api/data/itemoverview?league=' + newLeague + '&type=DivinationCard').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.forEach(function (doc) {
                    if(doc.name == "House of Mirrors") {
                        if(modList.includes(channel.replace("#", ""))) {
                            client.say(channel, "House of Mirrors is worth " + doc.exaltedValue + "ex")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "House of Mirrors is worth " + doc.exaltedValue + "ex")
                            }, 3000);
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "mirror") {
            request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.some(function (mir) {
                    if(mir.currencyTypeName == "Mirror of Kalandra") {
                        if(modList.includes(channel.replace("#", ""))) { 
                            client.say(channel, "Mirror of Kalandra is worth " + Math.round(mir.receive.value / chaosPrice) + " exalts")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "Mirror of Kalandra is worth " + Math.round(mir.receive.value / chaosPrice) + " exalts")
                            }, 3000); 
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "round") {
            if(Number(args[0]) >= 10 || Number(args[0]) == 0) {
                if(modList.includes(channel.replace("#", ""))) {
                    client.say(channel, "Usage: ?round [1-9]")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Usage: ?round [1-9]")
                    }, 3000);
                }
            } else if(args[0]) {
                request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
                    pullData = JSON.parse(response);
                    pullData.lines.forEach(function (round) {
                        if(round.currencyTypeName == "Exalted Orb") {
                            var cTotal = (round.receive.value * Number("0." + args[0] + "0"))
                            if(modList.includes(channel.replace("#", ""))) {
                                client.say(channel, "0." + args[0] + "ex is " + Math.round(cTotal) + "c")
                            } else {
                                setTimeout(function () {
                                    client.say(channel, "0." + args[0] + "ex is " + Math.round(cTotal) + "c")
                                }, 3000);
                            }
                        }
                    }) 
                }).on('end', function (err) {
                    if (err) return console.log('connection closed due to errors', err);
                });
            } else {
                if(modList.includes(channel.replace("#", ""))) {
                    client.say(channel, "Usage: ?round [1-9]")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Usage: ?round [1-9]")
                    }, 3000);
                }
            }
        }
        if(command == "chaos") {
            if(args[0]) {
                request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
                    pullData = JSON.parse(response);
                    pullData.lines.forEach(function (chaos) {
                        if(chaos.currencyTypeName == "Exalted Orb") {
                            var cTotal = (Number(args[0]) / chaos.receive.value)
                            var getOdds = cTotal.toFixed(2).split('.')
                            var cChaos = (chaos.receive.value * Number("0." + getOdds[1]))
                            if(modList.includes(channel.replace("#", ""))) {
                                client.say(channel, args[0]+"c = " + getOdds[0] + "ex " + Math.round(cChaos) + "c")
                            } else {
                                setTimeout(function () {
                                    client.say(channel, args[0]+"c = " + getOdds[0] + "ex " + Math.round(cChaos) + "c")
                                }, 3000); 
                            }
                        }
                    })
                }).on('end', function (err) {
                    if (err) return console.log('connection closed due to errors', err);
                });
            } else {
                if(modList.includes(channel.replace("#", ""))) {
                    client.say(channel, "Usage: ?chaos [amount]")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Usage: ?chaos [amount]")
                    }, 3000);
                }
            }
        }
        if(command == "exc") {
            if(args[0]) {
                request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Currency').on('data', function (response) {
                    pullData = JSON.parse(response);
                    pullData.lines.forEach(function (exc) {
                        if(exc.currencyTypeName == "Exalted Orb") {
                            if(args[0].includes('.')) {
                                var getARG = args[0].split('.')
                                var cTotal = (Number(getARG[0]) * exc.receive.value)
                                var getOdds = (exc.receive.value * Number("0." + getARG[1]))
                            } else {
                                var cTotal = (Number(args[0]) * exc.receive.value)
                                var getOdds = 0
                            }
                            if(modList.includes(channel.replace("#", ""))) {
                                client.say(channel, args[0]+"ex = " + Math.round(cTotal + getOdds) + "c")
                            } else {
                                setTimeout(function () {
                                    client.say(channel, args[0]+"ex = " + Math.round(cTotal + getOdds) + "c")
                                }, 3000); 
                            }
                        }
                    })
                }).on('end', function (err) {
                    if (err) return console.log('connection closed due to errors', err);
                });
            } else {
                if(modList.includes(channel.replace("#", ""))) {
                    client.say(channel, "Usage: ?exc [amount]")
                } else {
                    setTimeout(function () {
                        client.say(channel, "Usage: ?exc [amount]")
                    }, 3000);
                }
            }
        }
        if(command == "sim") {
            request('https://poe.ninja/api/data/currencyoverview?league=' + newLeague + '&type=Fragment').on('data', function (response) {
                pullData = JSON.parse(response);
                pullData.lines.forEach(function (sim) {
                    if(sim.currencyTypeName == "Simulacrum") {
                        if(modList.includes(channel.replace("#", ""))) {
                            client.say(channel, "Simulacrum is equal to " + Math.round(sim.receive.value) + " Chaos")
                        } else {
                            setTimeout(function () {
                                client.say(channel, "Simulacrum is equal to " + Math.round(sim.receive.value) + " Chaos")
                            }, 3000);
                        }
                    }
                })
            }).on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
        if(command == "starter") { //https://www.youtube.com/watch?v=2JPVJIn98B4
            if(modList.includes(channel.replace("#", ""))) {
                client.say(channel, "New to PoE (Path of Exile) go here https://www.youtube.com/watch?v=2JPVJIn98B4 and watch Beginner Guide + Zizaran's Tips and Tricks")
            } else {
                setTimeout(function () {
                    client.say(channel, "New to PoE (Path of Exile) go here https://www.youtube.com/watch?v=2JPVJIn98B4 and watch Beginner Guide + Zizaran's Tips and Tricks")
                }, 3000);
            }
        }
        if(command == "uni") { //[3.15] https://www.youtube.com/playlist?list=PLbpExg9_Xax0rWolbI639z4MqizyiLy6I - [3.14] https://www.youtube.com/playlist?list=PLbpExg9_Xax3itHnJz7CJPcE5igbg-YNi
            if(modList.includes(channel.replace("#", ""))) {
                client.say(channel, "New to PoE (Path of Exile) go here https://www.youtube.com/playlist?list=PLbpExg9_Xax3itHnJz7CJPcE5igbg-YNi and watch PoE University by Zizaran")
            } else {
                setTimeout(function () {
                    client.say(channel, "New to PoE (Path of Exile) go here https://www.youtube.com/playlist?list=PLbpExg9_Xax3itHnJz7CJPcE5igbg-YNi and watch PoE University by Zizaran")
                }, 3000);
            }
        }
    }
    if(user.username == "vertex101") {
        if(command == "btime") {
            client.say(channel, "The bot has been running for " + secondsToDhms(process.uptime()))
        }
    }
    if(channel == "#finncapp") {
        if(command == "awakened") {
            client.say(channel, 
                "Awakened PoE Trade" +
                " ▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬" +
                " go check it out here over at github" +
                " https://github.com/SnosMe/awakened-poe-trade")
        }
    }
});

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
