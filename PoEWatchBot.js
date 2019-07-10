const config = require('./config/cfg.json');
const tmi = require('tmi.js');
const request = require('request');
global.__basedir = __dirname;
var gem2120 = []
var gem2123 = []
var jewel = []
var timeless = []
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
    channels: ["#finncapp", "#sketch", "#ixixghostxixi", "#vertex101", "#vervamon"]
};
let client = new tmi.client(options);
// Connect the client to the server..
client.connect();
client.on("chat", (channel, user, message, self) => {
    // Don't listen to my own messages..
    if (self) return;
    // Do your stuff.
    msg = message.split(" ");
    //PoE command things
    if(user.username == channel.replace("#", "") || user.username == "vertex101" || user.mod){
        if(msg[0] == "!ex"){
            request('https://api.poe.watch/item?id=142', function (error, response, body) {
                pullData = JSON.parse(body);
                setTimeout(function () {
                    client.say(channel, "1 Exalted Orb is equal to " + pullData.leagues[0].median + " Chaos")
                }, 3000); 
            });
        }
        if(msg[0] == "!23") {
            request("https://api.poe.watch/get?league=Legion&category=gem", function (error, responce, body) {
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
            request("https://api.poe.watch/get?league=Legion&category=gem", function (error, responce, body) {
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
            request("https://api.poe.watch/get?league=Legion&category=jewel", function (error, responce, body) {
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
        if(msg[0] == "!timeless") {
            request("https://api.poe.watch/get?league=Legion&category=jewel", function (error, responce, body) {
                top520 = JSON.parse(body);
                top520.forEach(function (fruit) {
                    if(fruit.type == "Timeless Jewel") {
                        timeless.push(fruit.name+":"+fruit.mean.toFixed(2))
                    }
                });
                setTimeout(function() {
                    var gem1 = timeless[0].split(":")
                    var gem2 = timeless[1].split(":")
                    var gem3 = timeless[2].split(":")
                    var gem4 = timeless[3].split(":")
                    var gem5 = timeless[4].split(":")
                    client.say(channel, "Top 5 TIMELESS JEWELS 1) "
                        + gem1[0] + " - " + gem1[1]
                        + "c 2) " + gem2[0] + " - " + gem2[1]
                        + "c 3) " + gem3[0] + " - " + gem3[1]
                        + "c 4) " + gem4[0] + " - " + gem4[1]
                        + "c 5) " + gem5[0] + " - " + gem5[1] + "c")
                }, 3000)
            });
        }
        if(msg[0] == "!hunter"){
            request('https://api.poe.watch/item?id=3891', function (error, response, body) {
                pullData = JSON.parse(body);
                setTimeout(function () {
                    client.say(channel, "HeadHunter is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                }, 3000); 
            });
        }
        if(msg[0] == "!mirror"){
            request('https://api.poe.watch/item?id=3283', function (error, response, body) {
                pullData = JSON.parse(body);
                setTimeout(function () {
                    client.say(channel, "Mirror of Kalandra is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex")
                }, 3000); 
            });
        }
    } else {
        setTimeout(function () {
            client.say(channel, "You don't have permission to use the command!")
        }, 3000); 
    }
    //join channel
    if(channel == "#poewatchbot") {
        if(msg[0] == "!join") {
            client.join(msg[1]);
        }
    }
});