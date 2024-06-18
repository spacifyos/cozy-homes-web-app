import CustomButton from "@/components/CustomButton";
import _ from "lodash";

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disableNext,
  disablePrevious,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage === totalPages) {
        for (let i = currentPage - 2; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="join gap-2">
        <CustomButton
          buttonClassName="join-item btn-sm"
          buttonText="«"
          onClick={
            disablePrevious
              ? () => {}
              : () => onPageChange(Math.max(1, currentPage - 1))
          }
          disabled={currentPage === 1}
        />

        {_.map(pageNumbers, (number, index) => (
          <CustomButton
            key={index}
            buttonClassName={`join-item btn-sm ${number === currentPage ? "join-item-active" : ""}`}
            buttonText={`${number}`}
            onClick={() => number !== "..." && onPageChange(number)}
            disabled={number === "..."}
          />
        ))}

        <CustomButton
          buttonClassName="join-item btn-sm"
          buttonText="»"
          onClick={
            disableNext
              ? () => {}
              : () => onPageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
