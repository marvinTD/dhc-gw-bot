import Discord from 'discord.js';
import timeHelpers from './lib/convert-time';
import discordIds from './lib/discord-ids';

const client = new Discord.Client();
client.login(process.env.CLIENT_SECRET);

let warWarning;
let warEnd;
let timeLeft;
let timer;
let timeRemainingMessage;

function heartbeat() {
  client.channels.get(discordIds.testChannel).send(`❤ ${(new Date()).toUTCString()} ❤`);
}

function updateTimeLeft() {
  if (timeLeft > 0) {
    timeLeft -= 10000;
    timeRemainingMessage.edit(`\`\`\`Time remaining in the current Guild War:\n${timeHelpers.msToTime(timeLeft)}\n\`\`\``);
  }
}

client.on('message', (msg) => {
  if (msg.member.roles.get(discordIds.adminRole)) {
    if (msg.content.startsWith('!war start')) {
      // currently requires format _h_m
      const warDuration = timeHelpers.convertToMs(msg.content.split(' ')[2]);
      timeLeft = warDuration.ms;
      timer = setInterval(updateTimeLeft, 10000);
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
      clearInterval(timer);
      timeLeft = 0;
    }
  }
});

client.on('ready', () => {
  const channel = client.channels.get(discordIds.timeRemainingChannel);
  timeRemainingMessage = channel.fetchMessage('541770892259229749')
    .then(message => timeRemainingMessage = message)
    .catch(console.error);
  setInterval(heartbeat, 30000);
});
