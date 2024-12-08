import React, { Dispatch, SetStateAction, useState } from "react";
import cn from "classnames";
import Skeleton from "react-loading-skeleton";

// Component
import Pagination from "./Pagination";
import { WhiteBox } from "../";

// Type
import { TableProps } from "./table.type";

const WIDTHS_CN: { [key: string]: string } = {
  small: "w-1/4",
  medium: "w-1/3",
  large: "w-1/2",
  full: "w-full",
};

const Table = ({
  data,
  columns,
  className,
  pagination,
  loading,
}: TableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(pagination?.currentPage);

  return (
    <WhiteBox className={cn("relative", className)}>
      <table className="w-full">
        <thead className="border-b">
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left font-light text-xs text-gray-400 min-w-28",
                  column.className,
                  column.width ? WIDTHS_CN[column.width] : "",
                  column.smHidden && "hidden md:table-cell"
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 10 }, (_, index) => (
                <tr key={index} className="bg-white ">
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={cn("px-4 py-3 text-left text-sm")}
                    >
                      <div className="w-full">
                        <Skeleton className="h-4" />
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            : data.map((item: any, index) => (
                <tr key={index} className="bg-white ">
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={cn(
                        "px-4 py-3 text-left text-sm",
                        column.className,
                        column.width ? WIDTHS_CN[column.width] : "",
                        column.smHidden && "hidden md:table-cell"
                      )}
                    >
                      <div className="font-medium text-gray-900">
                        {column.cell(item)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      {pagination && pagination.totalPage > 1 && (
        <Pagination
          currentPage={pagination.currentPage as number}
          setPage={setPage as Dispatch<SetStateAction<number>>}
          onNextPage={pagination?.onNextPage as (page: number) => Promise<any>}
          onPrevPage={pagination?.onPrevPage as (page: number) => Promise<any>}
          totalPage={pagination?.totalPage as number}
        />
      )}
    </WhiteBox>
  );
};

export default Table;
