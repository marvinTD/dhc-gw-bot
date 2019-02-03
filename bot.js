require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client()
bot.login(process.env.BOT_SECRET);

let warWarning;
let warEnd;

bot.on('message', (msg) => {
  if (msg.content === '!war start') {
    msg.channel.send('@here Guild War has started!');
    warWarning = setTimeout(() => { msg.channel.send('@here One hour left in war!')}, 5000);
    warEnd = setTimeout(() => { msg.channel.send('War has ended.') }, 10000);
  }
});

bot.on('message', (msg) => {
  if (msg.content === '!war end') {
    msg.channel.send('Current Guild War has been ended.');
    clearTimeout(warWarning);
    clearTimeout(warEnd);
  }
});
