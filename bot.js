require('dotenv').config();

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const helpMessage = `
    A simple Auction Bot
    /start - Start the bot
    /create - For creating your auction
`;

bot.start((ctx) => {
  ctx.reply(helpMessage);
});

let name, bid, description, opens, closes;
let state = 0;

bot.command("create", ctx => {
  handleInput(ctx);
});

function handleInput(ctx) {
  if (state === 0) {
    ctx.reply("Enter Your product name?");
    state++;
  } else if (state === 1) {
    name = ctx.message.text;
    ctx.reply("Enter Your product initial bid?");
    state++;
  } else if (state === 2) {
    bid = ctx.message.text;
    ctx.reply("Enter Your product description?");
    state++;
  } else if (state === 3) {
    description = ctx.message.text;
    ctx.reply("Enter Your auction opens at?");
    state++;
  } else if (state === 4) {
    opens = ctx.message.text;
    ctx.reply("Enter Your auction closes at?");
    state++;
  } else {
    closes = ctx.message.text;
    ctx.reply("Enter Your Product image?");
    state++;
  }
}

bot.on("photo", (ctx) => {
  if (state === 6) {
    const photo = ctx.message.photo[0]; // Get the first photo from the message

    const last = `
    Name: ${name}
    Bid: ${bid}
    Description: ${description}
    Opens: ${opens}
    Closes: ${closes}
    `;

    // Reply with the photo and the text below it
    ctx.replyWithPhoto(
      photo.file_id,
      {
        caption: last,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Pay", callback_data: "pay" },
              { text: "Back", callback_data: "back" },
            ],
          ],
        },
      }
    );
  }

  state = 0
});

bot.on('text', ctx => {
  handleInput(ctx);
  });

bot.action("pay", (ctx) => {
  ctx.reply("Payment action selected");
});

bot.action("back", (ctx) => {
  // Reset the state
  state = 0;
  ctx.reply("Action cancelled");
});

bot.launch();