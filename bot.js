require('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)

const helpMessage = `
    A simple Auction Bot
    /start - Start the bot
    /help - For contacting us
    /create - For creating your auction
`

bot.start((ctx) => {
    ctx.reply(helpMessage)
})

bot.help((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Help", {
        reply_markup: {
          keyboard: [
            [
              { text: "Contact" },
            ],
            [
              { text: "Remove Keyboard" },
            ]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      })
})

bot.hears('Contact', ctx => {
    ctx.reply('Contact the owner of the bot  @DagimAsnake');
  })


  let name, bid,  description, opens, closes
  let state = 0;
  
  bot.command("create", ctx => { 
    handleInput(ctx); 
  });
  
  function handleInput(ctx) {
    
    if(state === 0) {
      ctx.reply("Enter Your product name?");
      state++;
    }
    else if(state === 1) {
      name = ctx.message.text;
      ctx.reply("Enter Your product inital bid?"); 
      state++;
    }
    else if(state === 2) {
      bid = ctx.message.text;
      ctx.reply("Enter Your product description?");
      state++;
    }
    else if(state === 3) {
        description = ctx.message.text;
        ctx.reply("Enter Your auction opens at?");
        state++;
      }
      else if(state === 4) {
        opens = ctx.message.text;
        ctx.reply("Enter Your auction closes at?");
        state++;
      }
    else {
        closes = ctx.message.text;
        ctx.reply("Enter Your Product image?");

    const last = `
                  Name: ${name} 
                  Bid: ${bid}
                  Description: ${description}
                  Opens: ${opens}
                  Closes: ${closes}`;

        bot.on('photo', (ctx) => {
          const photo = ctx.message.photo[0] // Get the first photo from the message
        
          // Reply with the photo and the text "Hi there" below it
          ctx.replyWithPhoto(photo.file_id, { caption: `${last}` })
        })
        
      state = 0; 
    }
  
    bot.on('text', ctx => {
      handleInput(ctx);
    });
  
  }

bot.launch()