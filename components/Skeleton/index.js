import { random } from "lodash";

const Skeleton = ({ height, width, minWidth = "100%" }) => {
  return (
    <div className="flex flex-col gap-2 w-full mr-2">
      <div
        className="skeleton"
        style={{ height: height, width: width, minWidth: minWidth }}
      ></div>
      <div className="skeleton h-3" style={{ width: random(50, 80) }}></div>
    </div>
  );
};

export default Skeleton;
