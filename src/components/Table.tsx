import React from "react";
import cn from "classnames";

//Components
import WhiteBox from "./WhiteBox.tsx";

interface TablePrpos {
  data: any[];
  columns: {
    title: any;
    cell: any;
    className?: string;
    width?: number;
  }[];
  className?: string;
}

const WIDTHS_CN: { [key: string]: string } = {
  small: "w-1/4",
  medium: "w-1/3",
  large: "w-1/2",
  full: "w-full",
};

const Table = ({ data, columns, className }: TablePrpos) => {
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
                  column.width ? WIDTHS_CN[column.width] : ""
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index) => (
            <tr key={item.id} className="bg-white ">
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={cn(
                    "px-4 py-3 text-left text-sm min-w-28 h-6",
                    column.className,
                    column.width ? WIDTHS_CN[column.width] : ""
                  )}
                >
                  {column.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </WhiteBox>
  );
};

export default Table;
