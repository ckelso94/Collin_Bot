const Discord = require('discord.js');
const client = new Discord.Client();

const TalkedRecently = new Set();

var gameName;
var allowGameNameChange = true;

var isReady = true;

function randomWholeNum(value) {
    return Math.floor(Math.random() * value) + 1;
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    if (isReady && (message.content.indexOf('!help') === 0)) {

        if (TalkedRecently.has(message.author.id + "_help")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 message.channel.send("```Since Your Little Bitch Ass Can't Remember Shit, Here Are the Available Commands:\n!help\n!kirk\n!zieg\n!licker\n!lag\n!horn\n!setGame Skin Flute\n\nKeywords:\nblack\nfortnite\naram\narams\nleague\nburrito\nmexican\nconstruction\ntaco\nborder```");
            } catch(err) {
                return;   
            }
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            isReady = true;

            TalkedRecently.add(message.author.id + "_help");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_help");
            }, 60000);

        }

    }
        
    if (message.content.toLowerCase().includes('black')) {

        if (TalkedRecently.has(message.author.id + "_black")) {
            return;
        } else {
            message.channel.send({files: ["./assets/images/cmonbruh.png"]});
        }

        TalkedRecently.add(message.author.id + "_black");
        console.log(TalkedRecently);
        setTimeout(() => {
            TalkedRecently.delete(message.author.id + "_black");
        }, 60000);

    }
    
    if (message.content.toLowerCase().includes('fortnite')) {

        if (TalkedRecently.has(message.author.id + "_fortnite")) {
            return;
        } else {
            message.channel.send({files: ["./assets/images/fortnite_sucks.jpg"]});
        }

        TalkedRecently.add(message.author.id + "_fortnite");
        setTimeout(() => {
            TalkedRecently.delete(message.author.id + "_fortnite");
        }, 60000);

    }

    if (isReady && (message.content.indexOf('!kirk') === 0)) {

        if (TalkedRecently.has(message.author.id + "_kirk")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/kirkWilhelm.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                return;   
            }
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            isReady = true;

            TalkedRecently.add(message.author.id + "_kirk");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_kirk");
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!licker') === 0)) {

        if (TalkedRecently.has(message.author.id + "_licker")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/windowlicker.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                return;   
            }
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            isReady = true;

            TalkedRecently.add(message.author.id + "_licker");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_licker");
            }, 60000);

        }

    }
    
    if (message.content.indexOf('!setGame') === 0) {

        if (!allowGameNameChange) {
            return;
        } else {
            
            gameName = message.content.slice(9);

            client.user.setPresence({
                game: {
                  name: gameName,
                    type: 0
                  }
            })
              .then(console.log)
              .catch(console.error);
            
            message.channel.send("Setting Game Name to " + gameName);
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            allowGameNameChange = false;
            setTimeout(() => {
              // Allows for the Game Name to be Set After 5 Minutes
              allowGameNameChange = true;
            }, 300000);

        }

    }
    
    if (isReady && (message.content.indexOf('!lag') === 0)) {

        if (TalkedRecently.has(message.author.id + "_lag")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/lag.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                return;   
            }
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            isReady = true;

            TalkedRecently.add(message.author.id + "_lag");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_lag");
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!horn') === 0)) {

        if (TalkedRecently.has(message.author.id + "_horn")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/horn.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                return;   
            }
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            isReady = true;

            TalkedRecently.add(message.author.id + "_horn");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_horn");
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!zieg') === 0)) {

        if (TalkedRecently.has(message.author.id + "_zieg")) {
            return;
        } else {

            message.channel.send({files: ["./assets/images/goat_fucker.png"]});
            
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);

            TalkedRecently.add(message.author.id + "_zieg");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_zieg");
            }, 60000);

        }

    }

    if (isReady && (message.content.toLowerCase().includes('league'))) {

        if (TalkedRecently.has(message.author.id + "_league")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;

            randomNum = randomWholeNum(2);
            switch(randomNum) {
                case 1:
                    clip = "./assets/audio/sameGame.mp3"
                    break;
                
                case 2:
                    clip = "./assets/audio/magicResist.mp3"
                    break;
                
              default:
                    clip = "picture";
            };
            
            if (clip == "picture") {
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/images/league_of_tanks.png"]});   
            } else {
                try {
                     voiceChannel.join().then(connection => {
                        const dispatcher = connection.playFile(clip);
                        dispatcher.on("end", end => {
                            voiceChannel.leave();
                        });
                    }); 
                } catch(err) {
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/images/league_of_tanks.png"]});   
                }
            }

            isReady = true;

            TalkedRecently.add(message.author.id + "_league");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_league");
            }, 60000);

        }

    }

    if (isReady && (message.content.toLowerCase().includes('aram') || message.content.toLowerCase().includes('arams'))) {

        if (TalkedRecently.has(message.author.id + "_aram")) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/goodOleArams.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/images/league_of_tanks.png"]});   
            }

            isReady = true;

            TalkedRecently.add(message.author.id + "_aram");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_aram");
            }, 60000);

        }

    }
    
    if (isReady && (message.content.toLowerCase().includes('burrito')
        || message.content.toLowerCase().includes('mexican')
        || message.content.toLowerCase().includes('construction')
        || message.content.toLowerCase().includes('taco')
        || message.content.toLowerCase().includes('border'))) {

        if (TalkedRecently.has(message.author.id + "_mexican")) {
            return;
        } else {

            message.channel.send({files: ["./assets/images/mexican.png"]});

            TalkedRecently.add(message.author.id + "_mexican");
            setTimeout(() => {
              // Removes the user from the set after a minute
              TalkedRecently.delete(message.author.id + "_mexican");
            }, 60000);

        }

    }

});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
    let channels = newMember.guild.channels;
    var generalChannel = (client.guilds.get(newMember.guild.id)).channels.find("name", "general");
    
    if (newMember.id === '93105200365043712') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(10);
            console.log('randomNum: ' + randomNum);
            
            if (randomNum === 1) {
                generalChannel.send("Hey, Eeyore (Kelso) is here!", {files: ["./assets/images/eeyore.png"]});
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
