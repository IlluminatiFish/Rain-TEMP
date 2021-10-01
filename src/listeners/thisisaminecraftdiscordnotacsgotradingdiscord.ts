import { exec } from 'child_process'
import { promisify } from 'util'
import { BotListener } from '../extensions/BotListener'
import fs from 'fs'
import commandManager from '../functions/commandManager'
import skyclientutils from '../functions/skyclientutils'
import utils from '../functions/utils'
import got from 'got/dist/source'
import { Message, TextChannel } from 'discord.js'

class thisIsAMinecraftModDiscordNotACSGOTradingDiscord extends BotListener {
	constructor() {
		super('thisIsAMinecraftModDiscordNotACSGOTradingDiscord', {
			emitter: 'client',
			event: 'messageCreate',
		})
	}

	async exec(message) {
		if (!message.member) return
		if (message.author.id === this.client.user.id) return
		if (message.member.roles.cache.has('780182606628782100')) return
		if (message.member.roles.cache.has('885960137544695819')) return
		if (message.member.permissions.toArray().includes('ADMINISTRATOR')) return

		//all of these are mostly used for scams, gotten from some people on discord.gg/skyclient (specifically 304054669372817419 and 208338448677994496)
		const IPs = [
			"45.133.1.45",
			"45.138.72.93",
			"45.138.72.103",
			"45.138.72.104",
			"45.138.72.107",
			"45.138.72.110",
			"45.138.72.207",
			"46.17.96.21",
			"95.181.152.14",
			"95.181.152.37",
			"95.181.152.47",
			"95.181.152.88",
			"95.181.152.232",
			"95.181.155.77",
			"95.181.155.109",
			"95.181.155.143",
			"95.181.155.250",
			"95.181.157.27",
			"95.181.157.34",
			"95.181.157.36",
			"95.181.157.84",
			"95.181.157.237",
			"95.181.163.44",
			"95.181.163.46",
			"95.181.163.57",
			"95.181.163.72",
			"95.181.163.79",
			"95.181.172.204",
			"95.181.172.205",
			"95.181.172.206",
			"95.181.172.207",
			"95.181.172.208",
			"95.181.172.209",
			"95.181.172.238",
			"139.28.223.33",
			"141.95.23.50",
			"141.95.23.52",
			"141.95.23.53",
			"141.95.23.54",
			"141.95.23.55",
			"141.95.23.56",
			"141.95.23.57",
			"176.96.238.58",
			"185.233.203.46",
			"190.115.18.178",
			"194.147.142.94",
			"194.226.139.7",
			"194.226.139.9",
			"194.226.139.11",
			"194.226.139.115",
			"194.226.139.120",
			"194.226.139.121",
			"194.226.139.123",
			"198.251.84.212",
			"198.251.89.14"
		]

		const scamLinks = await skyclientutils.getRepo('scamlinks.json', true)

		const links = utils.getLinksFromString(message.content)


		links.forEach(async (l) => {
			let link = l as string

			if (link.includes('steamcommunity.com')) return await message.reply('This is an actual steam link. It isn\'t one of the older CS:GO scam links.')

			if (link.startsWith('https://')) link = link.replace('https://', '')
			if (link.startsWith('http://')) link = link.replace('http://', '')
			if (link.endsWith('/')) link = link.substring(0, link.length - 1)

			const linkData = JSON.parse((await got.get(`http://ip-api.com/json/${link.replace('https://', '').replace('http://', '')}`)).body)

			if (IPs.includes(linkData.query)) {
				//console.log(`ip: ${true}`)
				return await ban(message)
			}
			//if (scamLinks.includes(link)) return ban = true

			const splitLink = link.split('/')
			//console.log(splitLink)

			splitLink.forEach(async (l) => {
				//console.log(l)
				if (scamLinks.includes(l))
					//console.log(`repo: ${true}`)
					//console.log(scamLinks.includes(l))
					return await ban(message)
			})
		})

		//console.log(ban)
	}
}

module.exports = thisIsAMinecraftModDiscordNotACSGOTradingDiscord

// async function ban(message: Message, reason:string) {
// 	await message.reply(`banned ${reason}`)
// }

async function ban(message: Message) {
	if (message.guild.id == '780181693100982273') {
		let hasRole = false
		message.member.roles.cache.forEach((role) => {
			if (commandManager.bypassRoles.includes(role.id) || message.author.id == message.guild.ownerId) {
				return (hasRole = true)
			}
		})
		if (hasRole) {
			await message.delete()
			await (message.guild.channels.cache.get('796895966414110751') as TextChannel).send(`${message.author.tag} sent a scam link.\nMessage content: \`\`\`\n${message.content}\`\`\``)
			return message.channel.send(`hey yeah you shouldn't send those ${message.author}`)
		}

		if (message.member.bannable && !hasRole) {
			try {
				await message.author.send('Hey, did you know that we ban for scam/malicious links?')
			} catch (err) {}
			await message.member.ban({ reason: 'Sending a scam link' })
			await message.delete()
			await (message.guild.channels.cache
				.get('796895966414110751') as TextChannel)
				.send(`${message.author.tag} has been banned for sending a scam, or otherwise malicious link.\nMessage content: \`\`\`\n${message.content}\`\`\``)
		}
	} else if (message.guild.id == '762808525679755274') {
		if (message.member.permissions.toArray().includes('ADMINISTRATOR')) {
			await message.delete()
			await (message.guild.channels.cache.get('879037311235526666') as TextChannel).send(`${message.author.tag} sent a scam link.\nMessage content: \`\`\`\n${message.content}\`\`\``)
			return message.channel.send(`hey yeah you shouldn't send those ${message.author}`)
		}

		if (message.member.bannable && !message.member.permissions.toArray().includes('ADMINISTRATOR')) {
			try {
				await message.author.send('Hey, did you know that we ban for scam/malicious links?')
			} catch (err) {}
			await message.member.ban({ reason: 'Sending a scam link' })
			await message.delete()
			await (message.guild.channels.cache
				.get('879037311235526666') as TextChannel)
				.send(`${message.author.tag} has been banned for sending a scam, or otherwise malicious link.\nMessage content: \`\`\`\n${message.content}\`\`\``)
		}
	} else {
		await message.reply('hey fuck you thats a scam link')
	}
}
