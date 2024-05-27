import CustomText from "@/components/CustomText";
import _ from "lodash";

const CustomDropdown = ({ items, top }) => {
  return (
    <div
      className="absolute  right-4 global-border-radius global-box-shadow primaryWhite-bg-color max-w-36 min-w-10 z-50 global-border"
      style={{ top: top }}
    >
      <div className="flex flex-col justify-center items-center w-36 ">
        {_.map(items, (item, index) => {
          const title = _.get(item, ["title"], "");
          const onClickHandler = _.get(item, ["function"], () => {});

          return (
            <CustomText
              textClassName="p-2 cursor-pointer w-full text-center"
              onClick={onClickHandler}
              styles={{
                borderBottom:
                  _.size(items) !== index + 1 ? "1px solid #e0ecff" : "none",
              }}
            >
              {title}
            </CustomText>
          );
        })}
      </div>
    </div>
  );
};

export default CustomDropdown;
