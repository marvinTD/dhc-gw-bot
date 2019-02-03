require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client()
bot.login(process.env.BOT_SECRET);

let warWarning;
let warEnd;

function convertToMs(h, m) {
  return 3600000 * h + 60000 * m;
}

bot.on('message', (msg) => {
  if (msg.member.roles.find((role) => role.name === 'warmonger')) {
    if (msg.content.startsWith('!war start')) {
      // currently requires format _h_m
      time = msg.content.split(' ')[2]
      let hours = 12;
      let minutes = 0;
      let seconds = 0;
      if (time) {
        splitTime = time.split(/h|m/);
        hours = parseInt(splitTime[0]);
        minutes = parseInt(splitTime[1]);
      }

      const warDuration = convertToMs(hours, minutes)
      msg.channel.send(`@here Guild War has started with ${hours} hours and ${minutes} minutes!`);
      if (warDuration > 3600000) {
        warWarning = setTimeout(() => { msg.channel.send('@here One hour left in war!') }, warDuration - 3600000);
      }
      warEnd = setTimeout(() => { msg.channel.send('War has ended.') }, warDuration);
    }
  }
});

bot.on('message', (msg) => {
  if (msg.content === '!war end') {
    if (msg.member.roles.find((role) => role.name === 'warmonger')) {
      msg.channel.send('Current Guild War has been ended.');
      clearTimeout(warWarning);
      clearTimeout(warEnd);
    }
  }
});
