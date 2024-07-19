import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-duotone-svg-icons";

type Props = {
  tagText: string;
  onClick: () => void;
};

const Tag = (props: Props) => {
  return (
    <div className="mr-2 inline-block rounded bg-detroitblue-500 px-2.5 py-2 text-sm font-bold uppercase leading-none text-white">
      <span className="mr-1.5 inline-block tracking-wider">
        #{props.tagText}
      </span>
      <button type="button" onClick={props.onClick} aria-label="Remove Tag">
        <FontAwesomeIcon
          icon={faXmark}
          swapOpacity
          className="text-sm leading-none"
        />
      </button>
    </div>
  );
};

export default Tag;
