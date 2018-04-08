const Discord = require('discord.js');
const client = new Discord.Client();

var isReady = true;

//Testing audio
//var forniteSucks = new Audio('480.mp4');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    //if(message.content.indexOf(config.prefix) !== 0) return;
    
    /*const args = message.content.slice(prefix.length).trim().split(/ +/g);
    
    for (var i = 0; i < args.length; i++) {
        
        if(message.content.includes('aram') || message.content.includes('arams') || message.content.includes('league')) {
            message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
        }
        
        if(message.content.includes('fortnite')) {
            message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
            //Testing audio
            message.channel.play({files: ["./assets/480.mp4"]});
        }
        
    }*/
    
    if (message.content.includes('fortnite')) {
        message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
    }
    
    if (isReady && (message.content.includes('aram') || message.content.includes('arams') || message.content.includes('league'))) {
        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
        //message.channel.play({files: ["./assets/480.mp4"]});
        
        isReady = false;
        var voiceChannel = message.member.voiceChannel;
        
        voiceChannel.join().then(connection => {
            
            const dispatcher = connection.playFile('./assets/league_file.mp3');
            dispatcher.on("end", end => {
                voiceChannel.leave();
            }
            
        }.catch(err => console.log(err));
        
    }
    
    /*
    if (message.author.username === 'HazyArc14') {
        message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
    }
    */

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
