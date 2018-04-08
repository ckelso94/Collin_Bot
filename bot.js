const Discord = require('discord.js');
const client = new Discord.Client();

const talkedRecently = new Set();

var isReady = true;

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
    } else {
    
        if (message.content.includes('fortnite')) {
            message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
        }

        if (isReady && (message.content.includes('aram') || message.content.includes('arams') || message.content.includes('league'))) {
            message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});

            isReady = false;
            var voiceChannel = message.member.voiceChannel;

            voiceChannel.join().then(connection => {

                const dispatcher = connection.playFile('./assets/league_file.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });

            }).catch(err => console.log(err));

            isReady = true;

        }
        
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
        
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
