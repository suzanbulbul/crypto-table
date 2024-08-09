import { Dispatch, SetStateAction } from "react";

export interface TableProps {
  data: any[];
  columns: {
    title: any;
    cell: any;
    className?: string;
    width?: string;
  }[];
  className?: string;
  pagination?: {
    currentPage: number;
    totalPage: number;
    onNextPage: (page: number) => Promise<any>;
    onPrevPage: (page: number) => Promise<any>;
    setPage: Dispatch<SetStateAction<number>>;
  };
}

export type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onNextPage: (page: number) => Promise<any>;
  onPrevPage: (page: number) => Promise<any>;
  setPage: Dispatch<SetStateAction<number>>;
};
