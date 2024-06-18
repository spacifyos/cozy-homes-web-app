import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const TagComponent = ({ lists, onClickGeneralTag }) => {
  return (
    <div className="flex tag-container pb-5 bg-transparent pl-4">
      {_.map(lists, (list, index) => {
        const name = listingSelector.getName(list);
        const code = listingSelector.getCode(list);
        const isActive = _.get(list, ["isActive"], "");

        return (
          <CustomButton
            key={index}
            buttonText={name}
            buttonClassName={`${isActive ? "tag-button-active" : "tag-button"} btn-sm cursor-pointer mr-2`}
            textClassName="primary-text"
            onClick={() => onClickGeneralTag(name,code)}
          />
        );
      })}
    </div>
  );
};

export default TagComponent;
