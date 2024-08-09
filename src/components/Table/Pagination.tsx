import React from "react";
import cn from "classnames";

//Type
import { PaginationProps } from "./table.type";

const Pagination = ({
  currentPage,
  setPage,
  totalPage,
  onNextPage,
  onPrevPage,
}: PaginationProps) => {
  return (
    <nav
      className={
        "w-full flex items-center justify-between border-t border-gray-200 bg-white px-0 pl-3 pt-3"
      }
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm font-normal text-gray-500">
          Page <span data-test-id="table-current-page">{currentPage}</span> of{" "}
          <span data-test-id="table-total-page-count">{totalPage}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          data-test-id="table-previous-page"
          onClick={() => {
            onPrevPage(currentPage - 1).then(() => {
              setPage((page) => page - 1);
            });
          }}
          disabled={currentPage === 1}
          className={cn(
            "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed",
            {
              "hover:bg-gray-50": currentPage !== 1,
            }
          )}
        >
          Previous
        </button>

        <span className="block sm:hidden">
          <span className="relative inline-flex items-center  px-4 py-2 text-sm font-medium text-gray-700">
            {currentPage}/{totalPage}
          </span>
        </span>

        <button
          data-test-id="table-next-page"
          onClick={() => {
            onNextPage(currentPage + 1).then(() => {
              setPage((page) => page + 1);
            });
          }}
          disabled={currentPage === totalPage}
          className={cn(
            "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed",
            {
              "hover:bg-gray-50": currentPage !== totalPage,
            }
          )}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export { Pagination };
