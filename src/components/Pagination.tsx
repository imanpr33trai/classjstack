// components/Pagination.tsx
"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  // Simple pagination: show first, last, current, and pages around current
  // For more complex logic, consider a pagination library or more elaborate logic
  const MAX_VISIBLE_PAGES = 5;

  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="pagination-sec py-8 md:py-12">
      {" "}
      {/* pb-100 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn px-4 py-2 border border-gray-700 rounded text-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <div className="flex gap-1">
            {startPage > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="pagination-nums px-3 py-2 border border-gray-700 rounded text-gray-700 hover:bg-gray-700 hover:text-white"
                >
                  1
                </button>
                {startPage > 2 && (
                  <span className="px-3 py-2 text-gray-700">...</span>
                )}
              </>
            )}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`pagination-nums px-3 py-2 border rounded transition-colors ${
                  currentPage === number
                    ? "bg-gray-700 text-white border-gray-700"
                    : "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {number}
              </button>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="px-3 py-2 text-gray-700">...</span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="pagination-nums px-3 py-2 border border-gray-700 rounded text-gray-700 hover:bg-gray-700 hover:text-white"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn px-4 py-2 border border-gray-700 rounded text-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
