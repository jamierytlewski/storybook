type AvatarSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";
type AvatarColorBg = "darkblue" | "gunmetal" | "bronze" | "detroitblue";

type AvatarProps = {
  size: AvatarSize;
  avatarColorBg: AvatarColorBg;
  src?: string;
  alt: string;
  initials?: string;
};

const Avatar = (props: AvatarProps) => {
  const classList = [
    "flex items-center justify-center transition duration-500 hover:shadow-xl rounded-full text-center text-white leading-none font-bold",
  ];

  const avatarSizeClassList: Record<AvatarSize, string[]> = {
    small: ["h-6", "w-6", "text-xs"],
    medium: ["h-8", "w-8", "text-base"],
    large: ["h-10", "w-10", "text-xl"],
    xlarge: ["h-12", "w-12", "text-2xl"],
    xxlarge: ["h-14", "w-14", "text-3xl"],
  };

  const avatarColorClassList: Record<AvatarColorBg, string[]> = {
    darkblue: ["bg-darkblue-500", "hover:bg-darkblue-700"],
    gunmetal: ["bg-gunmetal-500", "hover:bg-gunmetal-700"],
    bronze: ["bg-bronze-600", "hover:bg-bronze-800"],
    detroitblue: [
      "bg-detroitblue-500",
      "hover:bg-detroitblue-700",
      "hover:shadow-current",
    ],
  };

  return (
    <div
      className={`${classList
        .concat(avatarColorClassList[props.avatarColorBg])
        .concat(avatarSizeClassList[props.size])
        .join(" ")}`}
      title={props.alt}
    >
      {props.src ? (
        <img src={props.src} alt={props.alt} className="rounded-full" />
      ) : (
        <span>{props.initials ?? ""}</span>
      )}
    </div>
  );
};
export default Avatar;
