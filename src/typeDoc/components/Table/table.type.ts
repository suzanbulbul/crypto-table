import { Dispatch, SetStateAction } from "react";

/**
 * The props for the `Table` component.
 *
 * @typedef {Object} TableProps
 * @property {any[]} data - The data to be displayed in the table.
 * @property {Array<{ title: string, cell: (item: any) => JSX.Element, width?: string, className?: string, smHidden?: boolean }>} columns - The columns of the table.
 * @property {string} [className] - Additional class names for the table.
 * @property {PaginationProps} [pagination] - Pagination configuration.
 * @property {boolean} [loading] - Whether the table is in a loading state.
 */
export type TableProps = {
  data: any[];
  columns: Array<{
    title: string;
    cell: (item: any) => JSX.Element;
    width?: string;
    className?: string;
    smHidden?: boolean;
  }>;
  className?: string;
  pagination?: PaginationProps;
  loading?: boolean;
};

/**
 * The props for the `Pagination` component.
 *
 * @typedef {Object} PaginationProps
 * @property {number} currentPage - The current page number.
 * @property {number} totalPage - The total number of pages.
 * @property {(page: number) => Promise<any>} onNextPage - Function to call for fetching the next page.
 * @property {(page: number) => Promise<any>} onPrevPage - Function to call for fetching the previous page.
 */
export type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onNextPage: (page: number) => Promise<any>;
  onPrevPage: (page: number) => Promise<any>;
  setPage: Dispatch<SetStateAction<number>>;
};
