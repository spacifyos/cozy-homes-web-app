import CustomText from "@/components/CustomText";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";

const ListingSection = ({ lists }) => {
  return (
    <div>
      <CustomText textClassName="font-size-xxlarge font-bold pb-2">
        Popular
      </CustomText>

      <div className="flex items-center pb-4">
        <CustomButton
          buttonText="City"
          buttonClassName="btn-sm primary-btn mr-2"
          textClassName="font-size-xsmall"
        />
        <CustomButton
          buttonText="College"
          buttonClassName="btn-sm default-btn mr-2"
          textClassName="font-size-xsmall"
        />
        <CustomButton
          buttonText="Condominium"
          buttonClassName="btn-sm default-btn mr-2"
          textClassName="font-size-xsmall"
        />
        <CustomButton
          buttonText="All"
          buttonClassName="btn-sm default-btn"
          textClassName="font-size-xsmall"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {_.map(lists, (item) => {
          return <ListingCardComponent />;
        })}
      </div>
    </div>
  );
};

export default ListingSection;
