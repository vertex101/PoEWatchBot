const config = require('./config/cfg.json');
const tmi = require('tmi.js');
const request = require('request');
const fs = require('fs');
var gem2120 = [], gem2123 = [], jewel = [], timeless = [], fiveway = [], trusted = []
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
    channels: ["#poewatchbot"]
};
let client = new tmi.client(options);
// Connect the client to the server..
client.connect();
//join the channels from the json file
client.on("connected", (address, port) => {
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
    //TODO: load the list of trusted users
    fs.readFile('config/trusted.json', (err, data) => {  
        if (err) throw err;
        let lTrust = JSON.parse(data);
        for (var key in lTrust)
        {
            trusted.push(lTrust[key])
        }
    });
});
client.on("chat", (channel, user, message, self) => {
    // Don't listen to my own messages..
    if (self) return;
    // Do your stuff.
    msg = message.split(" ");
    //PoE command things
    if(user.username == channel.replace("#", "") ||  trusted.includes(user.username) || user.mod){
        if(msg[0] == "!cmds") {
            setTimeout(function () {
                client.say(channel, "Current Commands: !ex, !23, !20, !jewel, !hunter, !mirror, !round")
            }, 3000); 
        }
        if(msg[0] == "!ex") {
            request('https://api.poe.watch/item?id=142', function (error, response, body) {
                pullData = JSON.parse(body);
                setTimeout(function () {
                    client.say(channel, "1 Exalted Orb is equal to " + pullData.leagues[0].mode + " Chaos")
                }, 3000); 
            });
        }
        if(msg[0] == "!23") {
            request("https://api.poe.watch/get?league=Blight&category=gem", function (error, responce, body) {
                top523 = JSON.parse(body);
                top523.forEach(function (fruit) {
                    if(fruit.gemLevel == "21" && fruit.gemQuality == "23" && fruit.change != "0") {
                        gem2123.push(fruit.name+":"+fruit.exalted.toFixed(2))
                    }
                });
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
            });
        }
        if(msg[0] == "!20") {
            request("https://api.poe.watch/get?league=Blight&category=gem", function (error, responce, body) {
                top520 = JSON.parse(body);
                top520.forEach(function (fruit) {
                    if(fruit.gemLevel == "21" && fruit.gemQuality == "20" && fruit.change != "0") {
                        gem2120.push(fruit.name+":"+fruit.exalted.toFixed(2))
                    }
                });
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
            });
        }
        if(msg[0] == "!jewel") {
            request("https://api.poe.watch/get?league=Blight&category=jewel", function (error, responce, body) {
                top520 = JSON.parse(body);
                top520.forEach(function (fruit) {
                    jewel.push(fruit.name+":"+fruit.exalted.toFixed(2))
                });
                setTimeout(function() {
                    var gem1 = jewel[0].split(":")
                    var gem2 = jewel[1].split(":")
                    var gem3 = jewel[2].split(":")
                    var gem4 = jewel[3].split(":")
                    var gem5 = jewel[4].split(":")
                    client.say(channel, "Top 5 JEWELS 1) "
                        + gem1[0] + " - " + gem1[1]
                        + "ex 2) " + gem2[0] + " - " + gem2[1]
                        + "ex 3) " + gem3[0] + " - " + gem3[1]
                        + "ex 4) " + gem4[0] + " - " + gem4[1]
                        + "ex 5) " + gem5[0] + " - " + gem5[1] + "ex")
                }, 3000)
            });
        }
        if(msg[0] == "!hunter") {
            request('https://api.poe.watch/item?id=3891', function (error, response, body) {
                pullData = JSON.parse(body);
                setTimeout(function () {
                    client.say(channel, "HeadHunter is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                }, 3000); 
            });
        }
        if(msg[0] == "!mirror") {
            request('https://api.poe.watch/item?id=3283', function (error, response, body) {
                pullData = JSON.parse(body);
                setTimeout(function () {
                    client.say(channel, "Mirror of Kalandra is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                }, 3000); 
            });
        }
        if(msg[0] == "!round") {
            if(msg[1]) {
                request('https://api.poe.watch/item?id=142', function (error, response, body) {
                    pullData = JSON.parse(body);
                    var cTotal = (pullData.leagues[0].mode * Number("0." + msg[1] + "0"))
                    setTimeout(function () {
                        client.say(channel, "0." + msg[1] + "ex is " + Math.round(cTotal) + "c")
                    }, 3000); 
                });
            } else {
                setTimeout(function () {
                    client.say(channel, "Usage: !round [1-9]")
                }, 3000);
            }
        }
    }
    //trusted command
    if(user.username == "vertex101") {
        if(msg[0] == "!trusted") {
            if(msg[1] == "add") {
                fs.readFile('config/trusted.json', (err, data) => {  
                    var json = JSON.parse(data);
                    json['trusted' + msg[3].toLowerCase()] = msg[3].toLowerCase()
                    console.log(JSON.stringify(json, null, 2))
                    fs.writeFile('config/trusted.json', JSON.stringify(json, null, 2), (err) => {  
                        if (err) throw err;
                        setTimeout(function () {
                            client.say(channel, msg[3] + " you have been added to the trusted list")
                        }, 3000); 
                    });
                });
            }
        }
        if(msg[0] == "!vso") {
            request({ url: 'https://api.twitch.tv/kraken/users?login=' + msg[1].toLowerCase(), headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': config.twitch.client}}, function (error, response, body) {
                pullData = JSON.parse(body);
                request({ url: 'https://api.twitch.tv/kraken/channels/' + pullData.users[0]._id, headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': config.twitch.client}}, function (error, response, body) {
                    pullData = JSON.parse(body);
                    setTimeout(function () {
                        client.say(channel, "You should 100% check out " + msg[1] + "! You can find them," +
                        "here >> https://twitch.tv/" + msg[1].toLowerCase() + " <3 They were last playing >> " + pullData.game + "!")
                    }, 3000);
                });
            });
        }
    }
    //join channel
    if(channel == "#poewatchbot") {
        if(msg[0] == "!join") {
            client.join(user.username);
            //TODO: add teh channel into the json file
            fs.readFile('config/channel.json', (err, data) => {  
                var json = JSON.parse(data);
                json['channel' + user.username] = "#" + user.username
                console.log(JSON.stringify(json, null, 2))
                fs.writeFile('config/channel.json', JSON.stringify(json, null, 2), (err) => {  
                    if (err) throw err;
                    setTimeout(function () {
                        client.say(channel, "You have been added to the bot")
                    }, 3000); 
                });
            });
        }
    }
});