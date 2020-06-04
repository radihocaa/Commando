const stripIndents = require('common-tags').stripIndents;
const Command = require('../base');
const Discord = require('discord.js');

module.exports = class ListGroupsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gruplar',
			aliases: ['list-groups', 'show-groups'],
			group: 'admin',
			memberName: 'gruplar',
			description: 'Tüm komut gruplarını listeler.',
			guarded: true
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
	}

	async run(msg) {
		const embed = new Discord.RichEmbed()
		.setTitle('__**Gruplar**__')
		.setDescription(stripIndents`
			${this.client.registry.groups.map(grp =>
				`**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Devrede' : 'Devre dışı'}`
			).join('\n')}
		`)
		.setFooter(`${msg.author.tag} tarafından istendi`, this.client.user.avatarURL)
		.setTimestamp();
		
		return msg.channel.send({embed});
	}
};
