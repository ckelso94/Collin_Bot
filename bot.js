const Discord = require('discord.js');
const client = new Discord.Client();

var user;
var status;
var overwatch_data;

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    //if(message.content.indexOf(config.prefix) !== 0) return;
    
    /*if(message.content.indexOf('!overwatch ' === 0) {
       message.channel.send('test');
    
        var options = {
            host: "ow-api.com",
            path: "/v1/stats/pc/us/${user}/profile",
            method: "GET",
        };
    
        https.get(options, function(response) {
            status = response.statusCode;
            
            response.on('data', function(chunk) {
                overwatch_data = JSON.parse(chunk);
                
                
    
    }*/
    
    if(message.author.username === 'HazyArc14') {
      message.reply('Stay in Plat Bud!');
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
