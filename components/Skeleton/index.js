import _ from "lodash";

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="skeleton" style={{ height: 100, width: 100 }}></div>
      <div className="skeleton h-3" style={{ width: _.random(50, 80) }}></div>
    </div>
  );
};

export default Skeleton;
