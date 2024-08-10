export interface CoinData {
  symbol: string; // Coin sembolü
  lastPrice: string; // En son işlem fiyatı
  priceChange: string; // Son 24 saatteki fiyat değişikliği
  priceChangePercent: string; // Son 24 saatteki fiyat değişikliğinin yüzdesi
  highPrice: string; // Son 24 saatteki en yüksek fiyat
  lowPrice: string; // Son 24 saatteki en düşük fiyat
}
