const { Telegraf } = require('telegraf');
const admin = require('firebase-admin');
const bot = new Telegraf('8755333892:AAGr2PdeZHZL6lm_2CKQr0XqN2W2kTWNOR0');

// Khởi tạo Firebase (dùng config của bạn)
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "taixiuug-bot",
    clientEmail: "firebase-adminsdk-xxx@taixiuug-bot.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----"
  })
});

const db = admin.firestore();

// Lệnh admin
bot.command('add', async (ctx) => {
  const [id, amount] = ctx.message.text.split(' ').slice(1);
  if (!id || !amount) return ctx.reply('Sử dụng: /add ID SỐ_CREDITS');
  await db.collection('users').doc(id).update({ balance: admin.firestore.FieldValue.increment(parseFloat(amount)) });
  ctx.reply(`✅ Đã cộng ${amount} Credits cho ID ${id}`);
});

bot.command('sub', async (ctx) => {
  const [id, amount] = ctx.message.text.split(' ').slice(1);
  if (!id || !amount) return ctx.reply('Sử dụng: /sub ID SỐ_CREDITS');
  await db.collection('users').doc(id).update({ balance: admin.firestore.FieldValue.increment(-parseFloat(amount)) });
  ctx.reply(`✅ Đã trừ ${amount} Credits cho ID ${id}`);
});

bot.command('rut', async (ctx) => {
  // Xử lý yêu cầu rút từ Mini App (sẽ gửi từ Mini App)
  ctx.reply('Đang kiểm tra yêu cầu rút...');
});

bot.launch();
console.log('Bot quản lý @quantritaixiu_bot đang chạy...');
