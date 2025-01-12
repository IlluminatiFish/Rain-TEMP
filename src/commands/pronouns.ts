import { MessageEmbed } from 'discord.js'
import msgutils from '../functions/msgutils'
import { BotCommand } from '../extensions/BotCommand'
import utils from '../functions/utils'

export default class pronouns extends BotCommand {
	constructor() {
		super('pronouns', {
			aliases: ['pronouns'],
			args: [{ id: 'person', type: 'string', match: 'rest' }],

			description: 'Shows the pronouns of a user, if they have them set on https://pronoundb.org',

			slashOptions: [{ name: 'person', type: 'USER', description: 'the person you want to know the pronouns of' }],
			slash: true,
		})
	}
	async exec(message, args) {
		const person = await utils.fetchUser(args.person ?? message.author.id)

		const pronouns = await utils.getPronouns(person, 'details')
		const pronounsEmbed = new MessageEmbed()

		if (person.id == message.author.id) {
			pronounsEmbed.setTitle('Your pronouns')
		} else {
			pronounsEmbed.setTitle(`${person.username}'s pronouns`)
		}

		pronounsEmbed.setDescription(pronouns)
		pronounsEmbed.setFooter('Data from https://pronoundb.org')

		msgutils.reply(message, { embeds: [pronounsEmbed] })
	}
}
