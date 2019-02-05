# dhc-gw-bot

Discord bot for Dungeon Hunter Champions guild war management

## Functions:
* Allows admins to designate the start of a war
* Notification to users when war begins
* One hour remaining notification to users
* Live timer for war

## Usage:
Start the war - duration defaults to 12h if unspecified:
```
!war start #h#m
```
Cancel/end an ongoing war
```
!war end
```

## Getting Started:
Required environment variables (can create/place in .env):
```
DISCORD_TEST_CHANNEL_ID=<Channel Id for Heartbeat>
DISCORD_TIME_REMAINING_CHANNEL_ID=<Channel Id for Timer>
DISCORD_TIME_REMAINING_MESSAGE_ID=<Message Id for Timer>
DISCORD_ADMIN_ID=<Role Id for Admin>
```
Install packages and run:
```
npm i; npm start
```
