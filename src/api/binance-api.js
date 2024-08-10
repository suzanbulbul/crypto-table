const WebSocket = require("ws");

const socket = new WebSocket("wss://stream.binance.com:9443/ws/BTCUSDT@trade");

socket.on("open", () => {
  console.log("Bağlantı kuruldu.");
});

socket.on("message", (data) => {
  const tradeData = JSON.parse(data);
  console.log(tradeData);
});

socket.on("close", () => {
  console.log("Bağlantı kapatıldı.");
});

socket.on("error", (error) => {
  console.error("Hata:", error);
});
