import { render, act, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jest } from "@jest/globals";
import { useWebSocket } from "../../util/helper";

// Mocking the WebSocket and QueryClient
const mockWebSocket = {
  onopen: jest.fn(),
  onmessage: jest.fn(),
  onerror: jest.fn(),
  onclose: jest.fn(),
  close: jest.fn(),
};

global.WebSocket = jest.fn(() => mockWebSocket) as any;

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useWebSocket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle WebSocket errors", () => {
    const TestComponent = () => {
      const { data, loading } = useWebSocket("wss://mock.url");
      return (
        <>
          <div data-testid="data">{JSON.stringify(data)}</div>
          <div data-testid="loading">{loading.toString()}</div>
        </>
      );
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    act(() => {
      mockWebSocket.onerror(new Event("error"));
    });

    // Verify WebSocket onerror was called
    expect(mockWebSocket.onerror).toHaveBeenCalled();
    // Verify loading state
    expect(screen.getByTestId("loading").textContent).toBe("false");
  });

  // Other tests...
});
