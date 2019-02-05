import timeHelpers from './convert-time';

class War {
  constructor(client, message, duration, timerMessage) {
    this.client = client;
    this.message = message;
    this.duration = timeHelpers.convertToMs(duration);
    this.timerMessage = timerMessage;
    this.timer = this.createInterval();
    this.warningTimeout = this.createWarningTimeout();
    this.endTimeout = this.createEndTimeout();

    this.message.channel.send(`@here Guild War has started with a duration of ${this.duration.text}`);
  }

  active() {
    if (this.duration.ms === 0) { return false; }
    return true;
  }

  updateTimeLeft() {
    if (this.duration.ms > 0) {
      this.duration.ms -= 10000;
      this.timerMessage.edit(timeMessage(this.duration.ms));
    } else {
      clearInterval(this.timer);
    }
  }

  createInterval() {
    return setInterval(this.updateTimeLeft.bind(this), 10000);
  }

  createWarningTimeout() {
    if (this.duration.ms > 3600000) {
      return setTimeout(() => { this.message.channel.send('@here One hour left in war!'); }, this.duration.ms - 3600000);
    }
    return null;
  }

  createEndTimeout() {
    return setTimeout(() => { this.message.channel.send('War has ended.'); }, this.duration.ms);
  }

  endWar(endMsg) {
    endMsg.channel.send('Current Guild War has been ended.');
    clearTimeout(this.warningTimeout);
    clearTimeout(this.endTimeout);
    clearInterval(this.timer);
    this.duration.ms = 0;
    this.timerMessage.edit(timeMessage(0));
  }
}

export default War;

function timeMessage(timeMs) {
  return `\`\`\`Time remaining in the current Guild War:\n${timeHelpers.msToTime(timeMs)}\n\`\`\``;
}
