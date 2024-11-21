import { random } from "lodash";

const Skeleton = ({
  height,
  width,
  minWidth = "100%",
  className,
  hideText = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mr-2">
      <div
        className={`skeleton ${className}`}
        style={{ height: height, width: width, minWidth: minWidth }}
      ></div>
      {hideText ? (
        false
      ) : (
        <div className="flex items-center" style={{ height: 36 }}>
          <div
            className="skeleton"
            style={{ height: 20, width: random(50, 80) }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Skeleton;
