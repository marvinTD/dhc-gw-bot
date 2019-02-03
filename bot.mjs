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
      const warDuration = convertToMs(msg.content.split(' ')[2]);
      msg.channel.send(`@here Guild War has started with a duration of ${warDuration.text}`);
      if (warDuration.ms > 3600000) {
        warWarning = setTimeout(() => { msg.channel.send('@here One hour left in war!'); }, warDuration.ms - 3600000);
      }
      warEnd = setTimeout(() => { msg.channel.send('War has ended.'); }, warDuration.ms);
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
