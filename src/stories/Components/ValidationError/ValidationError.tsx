import { faTriangleExclamation } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ValidationErrorProps = {
  message?: string;
};

const ValidationError = (props: ValidationErrorProps) => {
  return (
    <div
      role="alert"
      className="mt-2 h-5 text-sm font-medium text-error-700"
      aria-label={props.message}
    >
      {props.message ? (
        <>
          <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2" />
          {props.message}
        </>
      ) : null}
    </div>
  );
};

export default ValidationError;
