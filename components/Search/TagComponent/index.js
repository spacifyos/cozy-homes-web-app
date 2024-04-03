import CustomButton from "@/components/CustomButton";
import _ from "lodash";

const TagComponent = ({ lists, onClickSelectTag }) => {
  return (
    <div className="flex tag-container pb-3 bg-transparent mr-2">
      {_.map(lists, (list) => {
        const name = _.get(list, ["name"], "");
        const isActive = _.get(list, ["isActive"], "");

        return (
          <CustomButton
            buttonText={name}
            buttonClassName={`${isActive ? "tag-button-active" : "tag-button"} btn-sm cursor-pointer mr-2`}
            textClassName="primary-text"
            onClick={() => onClickSelectTag(name)}
          />
        );
      })}
    </div>
  );
};

export default TagComponent;
