const Discord = require('discord.js');
const client = new Discord.Client();

clinet.on('ready', () => {
  console.log('I am ready!');
});

clinet.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
}):

clinet.login(process.env.BOT_TOKEN);
