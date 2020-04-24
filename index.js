const dotenv = require('dotenv').config();
const { prefix } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

let isReady = true;

client.once('ready', () => {
    console.log('Engines are firing at full capacity');
});

client.on('message', async (message) => {
    const commands = message.content.split(' ');
    if (commands[0] === prefix + 'sound') {
        if (canPlaySound(message)) {
            const soundName = commands[1];
            isReady === false;
            if (message.member.voice.channel) {
                message.delete();
                const connection = await message.member.voice.channel
                    .join()
                    .then((connection) => {
                        const dispatcher = connection.play(
                            `./sounds/${soundName}.mp3`,
                        );
                        dispatcher.on(
                            'finish',
                            () => {
                              message.member.voice.channel.leave();
                            }
                        );
                    }).catch((err) => console.log(err));
            }
            isReady = true;
        }
    }
});

function canPlaySound(message) {
    if (
        isReady &&
        message.guild &&
        message.member.voice.channel &&
        message.content.split(' ').length > 1
    ) {
        return true;
    } else {
        return false;
    }
}

client.login(process.env.BOT_TOKEN);
