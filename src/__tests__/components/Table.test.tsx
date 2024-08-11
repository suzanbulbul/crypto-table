import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { PaginationProps } from "../../components/Table/table.type";
import { WhiteBoxProps } from "../../components/WhiteBox";
import Table from "../../components/Table/Table";

// Mock Pagination ve WhiteBox bileşenleri
jest.mock("../../components/Table/Pagination", () => ({
  __esModule: true, // ES Module olarak mockluyoruz
  default: ({
    currentPage,
    setPage,
    onNextPage,
    onPrevPage,
    totalPage,
  }: PaginationProps) => (
    <div>
      <button onClick={() => onPrevPage(currentPage - 1)}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={() => onNextPage(currentPage + 1)}>Next</button>
    </div>
  ),
}));

jest.mock("../../components/WhiteBox", () => ({
  __esModule: true, // ES Module olarak mockluyoruz
  default: ({ children }: WhiteBoxProps) => <div>{children}</div>,
}));

const columns = [
  { title: "Name", cell: (item: any) => item.name, width: "small" },
  { title: "Value", cell: (item: any) => item.value, width: "large" },
];

const mockData = [
  { name: "Item 1", value: "$100" },
  { name: "Item 2", value: "$200" },
];

describe("Table Component", () => {
  it("renders the table with data", () => {
    render(<Table data={mockData} columns={columns} loading={false} />);

    // Check if data is rendered
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
  });

  it("handles pagination", async () => {
    const onNextPage = jest.fn();
    const onPrevPage = jest.fn();
    const setPage = jest.fn();

    render(
      <Table
        data={mockData}
        columns={columns}
        loading={false}
        pagination={{
          currentPage: 1,
          totalPage: 2,
          onNextPage,
          onPrevPage,
          setPage,
        }}
      />
    );

    // Check initial page number
    expect(screen.getByText("1")).toBeInTheDocument();

    // Simulate next page button click
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(onNextPage).toHaveBeenCalledWith(2);
    });

    // Simulate previous page button click
    fireEvent.click(screen.getByText("Previous"));

    await waitFor(() => {
      expect(onPrevPage).toHaveBeenCalledWith(0);
    });
  });
});
