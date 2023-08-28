import React from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    navigate(`/users-feed?page=${page}`);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const currentPageIndex = currentPage - 1;
    const startIndex = Math.max(
      currentPageIndex - Math.floor(totalPagesToShow / 2),
      0
    );
    const endIndex = Math.min(
      startIndex + totalPagesToShow - 1,
      totalPages - 1
    );

    for (let i = startIndex; i <= endIndex; i++) {
      pageNumbers.push(
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="flex justify-end space-x-2 mt-4 mr-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
        className={`p-2 rounded ${
          isFirstPage
            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
            : "bg-blueProfessional text-white"
        }`}
      >
        First
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`p-2 rounded ${
          isFirstPage
            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
            : "bg-blueProfessional text-white"
        }`}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`p-2 rounded ${
          isLastPage
            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
            : "bg-blueProfessional text-white"
        }`}
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPage}
        className={`p-2 rounded ${
          isLastPage
            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
            : "bg-blueProfessional text-white"
        }`}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
