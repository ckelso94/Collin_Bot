const Discord = require('discord.js');
const client = new Discord.Client();

const blackTalkedRecently = new Set();
const leagueTalkedRecently = new Set();
const fortniteTalkedRecently = new Set();
const kirkCmdTalkedRecently = new Set();
const ziegCmdTalkedRecently = new Set();
const windowLickerCmdTalkedRecently = new Set();
const helpCmdTalkedRecently = new Set();
const mexicanCmdTalkedRecently = new Set();

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

        if (helpCmdTalkedRecently.has(message.author.id)) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 message.channel.send("Since Your Little Bitch Ass Can't Rememeber Shit!\nHere Are the Available Commands:\n\n!help\n!kirk\n!zieg\n!licker\nblack\nfortnite\naram\narams\nleague\nburrito\nmexican\nconstruction\ntaco bell\ntaco\nborder\nbuilder");
            } catch(err) {
                return;   
            }

            isReady = true;

            helpCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              helpCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }
        
    if (message.content.toLowerCase().includes('black')) {

        if (blackTalkedRecently.has(message.author.id)) {
            return;
        } else {
            message.channel.send({files: ["./assets/images/cmonbruh.png"]});
        }

        blackTalkedRecently.add(message.author.id);
        setTimeout(() => {
            blackTalkedRecently.delete(message.author.id);
        }, 60000);

    }
    
    if (message.content.toLowerCase().includes('fortnite')) {

        if (fortniteTalkedRecently.has(message.author.id)) {
            return;
        } else {
            message.channel.send({files: ["./assets/images/fortnite_sucks.jpg"]});
        }

        fortniteTalkedRecently.add(message.author.id);
        setTimeout(() => {
            fortniteTalkedRecently.delete(message.author.id);
        }, 60000);

    }

    if (isReady && (message.content.indexOf('!kirk') === 0)) {

        if (kirkCmdTalkedRecently.has(message.author.id)) {
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

            isReady = true;

            kirkCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              kirkCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!licker') === 0)) {

        if (windowLickerCmdTalkedRecently.has(message.author.id)) {
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

            isReady = true;

            windowLickerCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              windowLickerCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!zieg') === 0)) {

        if (ziegCmdTalkedRecently.has(message.author.id)) {
            return;
        } else {

            message.channel.send({files: ["./assets/images/goat_fucker.png"]});

            ziegCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              ziegCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }

    if (isReady && (message.content.toLowerCase().includes('league'))) {

        if (leagueTalkedRecently.has(message.author.id)) {
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

            leagueTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              leagueTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }

    if (isReady && (message.content.toLowerCase().includes('aram') || message.content.toLowerCase().includes('arams'))) {

        if (leagueTalkedRecently.has(message.author.id)) {
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

            leagueTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              leagueTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }
    
    if (isReady && (message.content.toLowerCase().includes('burrito')\
        || message.content.toLowerCase().includes('mexican')
        || message.content.toLowerCase().includes('construction')
        || message.content.toLowerCase().includes('taco bell')
        || message.content.toLowerCase().includes('taco')
        || message.content.toLowerCase().includes('border')
        || message.content.toLowerCase().includes('builder'))) {

        if (mexicanCmdTalkedRecently.has(message.author.id)) {
            return;
        } else {

            message.channel.send({files: ["./assets/images/mexican.png"]});

            mexicanCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              mexicanCmdTalkedRecently.delete(message.author.id);
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
                generalChannel.send("Hey, Eeyore is here!", {files: ["./assets/images/eeyore.png"]});
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
