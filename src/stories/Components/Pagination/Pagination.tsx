import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaginationProps = {
  numberOfPages: number;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
};

const defaultPaginationProps = (numberOfPages: number): number[] => {
  const numberOfPageArray = [];
  for (let i = 1; i <= 3; i++) {
    numberOfPageArray.push(i);
  }
  numberOfPageArray.push(-1);
  for (let i = numberOfPages - 2; i <= numberOfPages; i++) {
    numberOfPageArray.push(i);
  }
  return numberOfPageArray;
};

const createPagination = (numberOfPages: number, activePage: number) => {
  const numberOfPageArray = [];
  numberOfPageArray.push(1);
  numberOfPageArray.push(-1);
  for (let i = activePage - 1; i <= activePage + 1; i++) {
    numberOfPageArray.push(i);
  }
  numberOfPageArray.push(-2);
  numberOfPageArray.push(numberOfPages);
  return numberOfPageArray;
};

const Pagination = (props: PaginationProps) => {
  let numberOfPageArray: number[] = [];
  if (props.numberOfPages < 7) {
    for (let i = 1; i <= props.numberOfPages; i++) {
      numberOfPageArray.push(i);
    }
  } else if (
    props.activePage < 4 ||
    props.activePage > props.numberOfPages - 3
  ) {
    numberOfPageArray = defaultPaginationProps(props.numberOfPages);
  } else {
    numberOfPageArray = createPagination(props.numberOfPages, props.activePage);
  }

  const previousNextButton =
    "pt-4 border-t-2 border-transparent transition hover:text-detroitblue-500 disabled:text-gunmetal-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-detroitblue-500";

  const pageActive = `text-detroitblue-500 border-detroitblue-500`;

  return (
    <div className="flex justify-between border-t text-sm font-medium text-gunmetal-500">
      <div className="flex-1">
        <button
          type="button"
          className={`ml-2 ${previousNextButton}`}
          onClick={() => props.onPageChange(props.activePage - 1)}
          disabled={props.activePage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2" />
          Previous
        </button>
      </div>
      <div className="flex flex-1 justify-center">
        {numberOfPageArray.map((pageNumber) =>
          pageNumber < 0 ? (
            <span
              className="w-12 items-stretch border-t-2 border-transparent pl-4 pr-4 pt-4"
              key={pageNumber}
            >
              ...
            </span>
          ) : (
            <button
              type="button"
              key={pageNumber}
              className={`w-15 items-stretch border-t-2 pl-4 pr-4 pt-4 text-center transition duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-detroitblue-500  ${
                pageNumber === props.activePage
                  ? pageActive
                  : "border-transparent"
              }`}
              onClick={() => props.onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className={`mr-2 ${previousNextButton}`}
          onClick={() => props.onPageChange(props.activePage + 1)}
          disabled={props.activePage === props.numberOfPages}
        >
          Next <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
