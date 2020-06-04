const oneLine = require('common-tags').oneLine;
const Command = require('../base');
const Discord = require('discord.js');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Botun pingini gösterir.',
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	async run(msg) {
		if(!msg.editable) {
			const pingMsg = await msg.reply('Hesaplanıyor...');
			const embed = new Discord.RichEmbed()
			.setDescription(oneLine`
				:ping_pong: Mesaj gecikmesi: ${(pingMsg.createdTimestamp - msg.createdTimestamp) / 1000}s.
				${this.client.ping ? `Normal gecikme: ${Math.round(this.client.ping / 1000)}s.` : ''}
			`);
			
			return pingMsg.edit(msg.channel.type !== 'dm' ? `${msg.author},` : '', { embed });
		} else {
			await msg.edit('Hesaplanıyor...');
			const embed = new Discord.RichEmbed()
			.setDescription(oneLine`
				:ping_pong: Mesaj gecikmesi: ${(msg.editedTimestamp - msg.createdTimestamp) / 1000}s.
				${this.client.ping ? `Normal gecikme: ${Math.round(this.client.ping / 1000)}s.` : ''}
			`);
			
			return msg.edit({ embed });
		}
	}
};
