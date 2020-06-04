const stripIndents = require('common-tags').stripIndents;
const Command = require('../base');

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
		return msg.reply(stripIndents`
			__**Gruplar**__
			${this.client.registry.groups.map(grp =>
				`**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Devrede' : 'Devre dışı'}`
			).join('\n')}
		`);
	}
};
