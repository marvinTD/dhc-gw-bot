import Discord from 'discord.js';
import discordIds from './lib/discord-ids';
import War from './lib/war';

const client = new Discord.Client();
client.login(process.env.CLIENT_SECRET);

let war;
let timeRemainingMessage;

// TODO: Refactor to not spam a channel
function heartbeat() {
  client.channels.get(discordIds.testChannel).send(`❤ ${(new Date()).toUTCString()} ❤`);
}

client.on('message', (msg) => {
  if (msg.member.roles.get(discordIds.adminRole)) {
    if (msg.content.startsWith('!war start')) {
      if (war && war.active()) {
        msg.channel.send('Unable to start war; there is an ongoing war');
      } else {
        // TODO: Refactor timeRemainingMessage; clear msgs in channel, create and use upon init?
        war = new War(client, msg, msg.content.split(' ')[2], timeRemainingMessage); // duration must be in _h_m format
      }
    }
    if (msg.content === '!war end') { war.endWar(msg); }
  }
});

client.on('ready', () => {
  const channel = client.channels.get(discordIds.timeRemainingChannel);
  timeRemainingMessage = channel.fetchMessage(discordIds.timeRemainingMessage)
    .then((message) => { timeRemainingMessage = message; })
    .catch(console.error); // eslint-disable-line no-console
  setInterval(heartbeat, 30000);
});
