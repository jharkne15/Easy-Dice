const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!ching') {
		message.channel.send('chong');
	}
	if (message.content === '!mayo') {
		message.channel.send('naise');
	}
	if (message.content === '!vote') {
		message.channel.send('Vote Joe Budden for President 2020');
	}
});


client.login('Token');
