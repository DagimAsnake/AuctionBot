require('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("You have click Start command")
})

bot.help((ctx) => {
    ctx.reply("You have click Help command")
})


bot.launch()