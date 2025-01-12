import { MessageEmbed } from 'discord.js'
import { BotCommand } from '../../extensions/BotCommand'
import utils from '../../functions/utils'

export default class pccVerify extends BotCommand {
	constructor() {
		super('pccVerify', {
			aliases: ['verify'],
			args: [{ id: 'person', type: 'string', match: 'rest' }],

			description: 'gives someone the member role because our role list is annoying',

			slashOptions: [{ name: 'person', type: 'USER', description: 'the person you want to verify', required: true }],
			slash: true,

			slashGuilds: ['762808525679755274'],
		})
	}
	async exec(message, args) {
		if (message.guild.id != '762808525679755274') return
		const person = this.client.util.resolveMember(args.person, message.guild.members.cache)
		if (!message.member.permissions.toArray().includes('MANAGE_ROLES')) {
			return await message.reply({ content: "You can't do that!", ephemeral: true })
		}
		if (!message.guild.me.permissions.toArray().includes('MANAGE_ROLES')) return await message.reply({ content: "I can't verify people if I can't give them the role.", ephemeral: true })

		if (!person) return await message.reply({ content: "I can't verify nobody!", ephemeral: true })

		await person.roles.add('879040337983705128')
		await message.reply({ content: `Succesfully verified ${person.user.tag}.` })
	}
}
