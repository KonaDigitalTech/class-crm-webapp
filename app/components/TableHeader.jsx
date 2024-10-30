'use client'
import React from "react";
import { CiSearch } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
const TableHeader = ({ onCreateLead, onSearch, onDelete, isDeleteLoading }) => {


  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="text-2xl font-medium">All leads</h1>
        </div>
        <div className="flex h-8 space-x-2">
          <button
            onClick={onCreateLead}
            className="bg-blue-500 text-white px-4 py-0 rounded-md text-sm"
          >
            Create Lead
          </button>
          <button
            onClick={onDelete}
            className="border bg-red-500 text-white px-4 py-0 rounded-md text-sm flex items-center"
            disabled={isDeleteLoading}
          >
            {isDeleteLoading && (
              <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            )}
            Delete
          </button>
        </div>
      </div>
      <div className="relative mt-2 w-72 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">
            <CiSearch />
          </span>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TableHeader;
