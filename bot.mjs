import Discord from 'discord.js';
import logger from './lib/logger';
import discordIds from './lib/discord-ids';
import War from './lib/war';

const client = new Discord.Client();
client.login(process.env.CLIENT_SECRET);

let war;
let timeRemainingMessage;

function heartbeat() {
  logger.info('Bot is online');
}

client.on('message', (msg) => {
  if (msg.member.roles.get(discordIds.adminRole)) {
    if (msg.content.startsWith('!war start')) {
      if (war && war.active()) {
        msg.channel.send('Unable to start war; there is an ongoing war.');
      } else {
        // TODO: Refactor timeRemainingMessage; clear msgs in channel, create and use upon init?
        war = new War(client, msg, msg.content.split(' ')[2], timeRemainingMessage);
      }
    }
    if (msg.content === '!war end') {
      if (!war || !war.active()) {
        msg.channel.send('There is no ongoing war.');
      } else {
        war.endWar(msg);
      }
    }
  }
});

client.on('ready', () => {
  const channel = client.channels.get(discordIds.timeRemainingChannel);
  timeRemainingMessage = channel.fetchMessage(discordIds.timeRemainingMessage)
    .then((message) => { timeRemainingMessage = message; })
    .catch(logger.error);
  setInterval(heartbeat, 30000);
});

client.on('error', (err) => {
  logger.error(err);
});

process.on('uncaughtException', (exception) => {
  logger.error(exception);
});
