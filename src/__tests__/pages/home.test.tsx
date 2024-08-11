import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../../pages/home";
import { useWebSocket } from "../../util/helper";
import { COIN_SHORTCODE, COIN_NAME } from "../../util/enum/crypto";
import { CoinData } from "../../util/type/coin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../../util/helper", () => ({
  useWebSocket: jest.fn(),
  CRYPTO_URL: {
    coin: "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker",
    icon: "https://cdn.bilira.co/symbol/svg/BTC.svg",
  },
}));

const mockData: CoinData[] = [
  {
    symbol: "BTCUSDT",
    lastPrice: "60506.11000000",
    priceChangePercent: "-0.643",
    marketvalue: "10923.05628000",
  },
];

const queryClient = new QueryClient();

describe("Home Component", () => {
  beforeEach(() => {
    (useWebSocket as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
    });
  });

  it("renders the table with data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Verify that data is displayed correctly
    expect(
      screen.getByText(`${COIN_SHORTCODE.BTCUSDT} / USDT`)
    ).toBeInTheDocument();
    expect(screen.getByText("60,506.11")).toBeInTheDocument(); // Ensure formatted price is as expected
    expect(screen.getByText("10.92K")).toBeInTheDocument(); // Ensure formatted market value is as expected
    expect(screen.getByText("-0.64%")).toBeInTheDocument(); // Adjust based on actual component formatting
  });

  it("handles pagination", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Verify initial page
    expect(screen.getByText("1")).toBeInTheDocument();

    // Simulate next page button click
    fireEvent.click(screen.getByText("Next"));

    // Wait for pagination to update
    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("displays correct icon and coin information", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const iconUrl = `https://cdn.bilira.co/symbol/svg/${COIN_SHORTCODE.BTCUSDT}.svg`;
    const expectedIcon = screen.getByAltText(COIN_NAME.BTCUSDT);

    // Verify that the icon URL is correct
    expect(expectedIcon).toHaveAttribute("src", iconUrl);
    expect(screen.getByText(COIN_NAME.BTCUSDT)).toBeInTheDocument();
  });

  it("displays price correctly formatted", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Verify that the price is formatted correctly
    expect(screen.getByText("60,506.11")).toBeInTheDocument(); // Adjust based on actual component formatting
  });

  it("displays market value correctly formatted", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Verify that the market value is formatted correctly
    expect(screen.getByText("10.92K")).toBeInTheDocument(); // Adjust based on actual component formatting
  });

  it("displays 24h change with correct color", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Verify that 24h change displays correctly with color
    const changePercent = "-0.64%"; // Adjust based on actual component formatting
    expect(screen.getByText(changePercent)).toHaveClass("text-red-600"); // Assuming color for negative change
  });
});
