import CustomButton from "@/components/CustomButton";
import _ from "lodash";

const TagComponent = ({ lists, onClickSelectTag }) => {
  return (
    <div className="flex tag-container pb-5 bg-transparent pl-4">
      {_.map(lists, (list, index) => {
        const name = _.get(list, ["name"], "");
        const isActive = _.get(list, ["isActive"], "");

        return (
          <CustomButton
            key={index}
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
