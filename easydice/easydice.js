const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = '!';
const PREFIX2 = '!adv';
const PREFIX3 = '!dav';
const PREFIX4 = '!init';
const PREFIX5 = '!initd';
const init = [];
const regexpP1 = /\d{1,2}[d]\d{1,3}/;
const regexpP2 = /[+]\d{1,2}[d]\d{1,3}/;
const regexpP3 = /[+-]\d{1,2}/;

client.once('ready', () => {
	console.log('Ready!');
});

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
		client.user.setActivity("Goop's Soft and Supple Voice", {
  		type: "LISTENING",
  		url: "https://tenor.com/view/oh-omg-fish-gif-9720855"
		});
 });

function nat20Check(diceRoll, diceSize) {
	if (diceRoll === 20 && diceSize === '20') { return '```yaml\nTHASA NAT 20\n```'; }
	return '';
}
function nat1Check(diceRoll, diceSize, nat20) {
	if (diceRoll === 1 && diceSize === '20') { return '\nhttps://tenor.com/view/bruh-gif-5156041'; }
	return '';
}

function displayInit() {
	var display = '```css\n';
	display += '[------------------------Initiative List------------------------]\n\n';
	for (const element of init) {
		display += '  character: '+ element.mode1 + element.name + element.mode2 + ' '.repeat(25 - element.name.length) + ' initiative: #' + element.roll + '\n';
	}
	display += '\n[---------------------------------------------------------------]\n';
	display += '```';
	return display;
}

function pad(width, string, padding) {
  return (string.length <= width) ? string : pad(width, padding + string, padding);
}

function initClear() {
	init.splice(0, init.length);
	return 'Initiative Cleared';
}

function initRemove(initName) {
	for (var i = 0; i < init.length; i++)
	{
		if (init[i].name === initName) {
			// remove name from init list
			init.splice(i,1);
			return 'Initiative For ' + initName + ' Has Been Removed';
		}
	}
	return 0;
}

client.on('message', async message => {
	if (message.content === '!help') {
		var help = '```diff\n';
		help += '<---------------------Commands--------------------->\n';
		help  += '+ !help - Shows Command List\n';
		help  += '+ ! xdx + modifier - Rolls Dice\n';
		help  += '+ !r - indepth dice usage\n';
		help  += '+ !adv <DICEROLL> - Rolls Dice With Advantage\n';
		help  += '+ !dav <DICEROLL> - Rolls Dice With Disadvantage\n';
		help  += '+ !init <DICEROLL> - Rolls Initiative \n';
		help  += '+ !initd <DICEROLL> <CREATURE NAME> - Rolls Initiative (For DM Use) \n';
		help  += '+ !init show - Shows Initiative List\n';
		help  += '+ !init remove <NAME> - Removes Creature From The Initiative List\n';
		help  += '+ !init clear - Clears Initiative List';
		help  += '+ !mayo\n';
		help  += '+ !vote\n';
		help  += '+ !fishpog\n';
		help  += '+ !pogfish\n';
		help  += '+ !topo\n';
		// Add New Commands Here
		help  += '<-------------------------------------------------->';
		help  += '```';
		message.channel.send(help);
	}
	if (message.content === '!r') {
		message.channel.send(' Dice Roll Usage: <Number of Dice> d <Dice Size> (+/- <Modifiers/Other Die>)* i.e. 1d20+3-1+1d4 \n  * *Leave Blank if No Modifiers*');
	}
	if (message.content === '!mayo') {
		message.channel.send('naise');
	}
	if (message.content === '!vote') {
		message.channel.send('Vote Joe Budden for President 2020');
	}
	if (message.content === '!fishpog' || message.content === '!pogfish') {
		message.channel.send('https://tenor.com/view/oh-omg-fish-gif-9720855');
	}
	if (message.content === '!topo') {
		message.channel.send('chico');
	}
	if (message.content === '!init show') {
		message.channel.send( displayInit() );
	}
	if (message.content === '!init clear') {
		message.channel.send( initClear() );
	}
	if (message.content.startsWith('!init remove ')) {
		message.channel.send(initRemove(message.content.substr(13)));
	}
	else {
		try {
			// if '!' is present
			var ctr = 0;
			var diceRoll = [];
			var diceRollVal = '';
			var diceTotal = 0;
			var nat20 = '';
			var nat1 = '';
			var charName = message.member.displayName;
			if (message.content.startsWith(PREFIX)) {
				// if this is an advantage or disadvantage roll
				var commandsubstr = 1;
				if (message.content.startsWith(PREFIX2) || message.content.startsWith(PREFIX3)) { commandsubstr = 4; }
				else if (message.content.startsWith(PREFIX5)) { commandsubstr = 6; }
				else if (message.content.startsWith(PREFIX4)) { commandsubstr = 5; }
				var command = (message.content.split(' ').join('')).substr(commandsubstr);
				while (true) {
					if ((command.substr(0,6).search(regexpP1) === 0) || command.substr(0,6).search(regexpP2) === 0)
					{
						if (command.substr(0,6).search(regexpP2) === 0) { command = command.substr(1); }
						console.log(command.substr(0,6).match(regexpP1));
						const input = command.substr(0,6).match(regexpP1)[0];
						const numDie = command.substring(0,command.indexOf('d'));
						const diceSize = input.substr(input.indexOf('d')+1);
						for (var i = 0; i < numDie; i++) {
							diceRoll[diceRoll.length] = Math.floor((Math.random() * diceSize) + 1);
							if (message.author.tag === '* Dark *#8350') { diceRoll[i] = diceRoll[i] }; // this is reserved for testing purposes
							if (diceRoll[i] === 1 && diceSize === '20' && nat20 === '') { nat1 = '\nhttps://tenor.com/view/bruh-gif-5156041'; }
							if (diceRoll[i] === 20 && diceSize === '20') { nat20 = '```yaml\nTHASA NAT 20\n```'; nat1 = ''; }
							diceTotal += diceRoll[i];
						}
						if ( message.content.startsWith(PREFIX2) ) { diceTotal = Math.max( ...diceRoll ); nat1 = nat1Check(diceTotal, diceSize); nat20 = nat20Check(diceTotal,diceSize); }		// For Advantage Rolls
						if ( message.content.startsWith(PREFIX3) ) { diceTotal = Math.min( ...diceRoll ); nat1 = nat1Check(diceTotal, diceSize); nat20 = nat20Check(diceTotal,diceSize); }		// For Disadvantage Rolls
						// trim string
						command = command.substr(input.length);
						diceRoll.sort(function(a, b) { return a - b } );
						diceRollVal += '[' + diceRoll.toString() + ']';
						diceRoll = [];
					}
					else if (command.substr(0,3).search(regexpP3) === 0)
					{
						// P Modifier
						const input = command.substr(0,3).match(regexpP3)[0];
						const diceModifier = input;
						diceTotal += eval(diceModifier);
						command = command.substr(input.length);
					}
					else {
						if (commandsubstr === 6 && ctr > 0) { init.push({ name: command, roll: diceTotal, mode1: '#', mode2: ''}); init.sort((a,b) => (a.roll < b.roll) ? 1 : -1); message.channel.send (displayInit()); }
						else if (commandsubstr === 5 && ctr > 0) { init.push({ name: charName, roll: diceTotal, mode1: '#', mode2: ''}); init.sort((a,b) => (a.roll < b.roll) ? 1 : -1); message.channel.send (displayInit()); }
						else if (ctr > 0) { message.channel.send('** ' + message.member.displayName +' ** Rolled: '+ diceRollVal + ' = **' + diceTotal + '**' + nat20 + nat1); }
						break;
					}
					ctr++;
					console.log(command);
				}
			}
		}
			catch (err) {
				message.channel.send('Error Occurred');
				console.log(err);
			}
		}
});


client.login('Token');
