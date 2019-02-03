import Discord from 'discord.js';
import convertToMs from './lib/convert-time';
import discordIds from './lib/discord-ids';

const client = new Discord.Client();
client.login(process.env.CLIENT_SECRET);

let warWarning;
let warEnd;

client.on('message', (msg) => {
  if (msg.member.roles.get(discordIds.adminRole)) {
    if (msg.content.startsWith('!war start')) {
      // currently requires format _h_m
      const timeStr = msg.content.split(' ')[2];
      let hours = 12;
      let minutes = 0;
      if (timeStr) {
        const t = timeStr.split(/h|m/);
        hours = parseInt(t[0], 10);
        minutes = parseInt(t[1], 10);
      }

      const warDuration = convertToMs(hours, minutes);
      msg.channel.send(`@here Guild War has started with a duration of ${hours} hours and ${minutes} minutes!`);
      if (warDuration > 3600000) {
        warWarning = setTimeout(() => { msg.channel.send('@here One hour left in war!'); }, warDuration - 3600000);
      }
      warEnd = setTimeout(() => { msg.channel.send('War has ended.'); }, warDuration);
    }
    if (msg.content === '!war end') {
      msg.channel.send('Current Guild War has been ended.');
      clearTimeout(warWarning);
      clearTimeout(warEnd);
    }
  }
});

function heartbeat() {
  client.channels.get(discordIds.testChannel).send(`❤ ${(new Date()).toUTCString()} ❤`);
}

client.on('ready', () => {
  setInterval(heartbeat, 30000);
});
