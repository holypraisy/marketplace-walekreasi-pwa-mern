const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false, // ubah ke true untuk production
  serverKey: 'SB-Mid-server-oB6N_L7x6XyGBG1BS8oW-TDt',
  clientKey: 'SB-Mid-client-TbI2Y6nK5rFp9NYu',
});

module.exports = snap;
