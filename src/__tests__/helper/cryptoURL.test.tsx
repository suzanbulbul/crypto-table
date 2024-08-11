import { COINS } from "../../util/constants/coins";
import { icon, coin } from "../../util/helper/cryptoURL";

describe("Constants", () => {
  it("should generate correct WebSocket URL for 'coin'", () => {
    // Beklenen URL'yi oluştur
    const expectedUrl = `wss://stream.binance.com:9443/stream?streams=${COINS.map(
      (coin) => `${coin.code}usdt@ticker`
    ).join("/")}`;

    // `coin` sabitinin beklenen URL ile eşleştiğini doğrula
    expect(coin).toBe(expectedUrl);
  });

  it("should format the icon URL correctly", () => {
    // Test için bir örnek sembol kullan
    const testSymbol = "BTC";
    const expectedIconUrl = `https://cdn.bilira.co/symbol/svg/${testSymbol}.svg`;

    // `icon` sabitini test etmek için bir fonksiyon kullan
    const formattedIconUrl = icon.replace("${symbol}", testSymbol);

    // `icon` sabitinin doğru formatta olduğunu doğrula
    expect(formattedIconUrl).toBe(expectedIconUrl);
  });
});
