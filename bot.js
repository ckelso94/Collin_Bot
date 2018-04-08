const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    //if(message.content.indexOf(config.prefix) !== 0) return;
    
    if(message.content.includes('fortnite')) {
        message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
    }
    
    if(message.content.includes('aram')) {
        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
    }
    if(message.content.includes('league')) {
        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
    }
    if(message.content.includes('arams')) {
        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
    }
    
    /*
    if(message.author.username === 'HazyArc14') {
        message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
    }
    */

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
