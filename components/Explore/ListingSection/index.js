import CustomText from "@/components/CustomText";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import Skeleton from "@/components/Skeleton";

const ListingSection = ({
  lists,
  onClickSelectCategory,
  selectedCategory,
  listingLoading,

}) => {
  return (
    <div>
      <CustomText textClassName="section-title">Popular</CustomText>

      <div className="flex items-center pb-4">
        <CustomButton
          buttonText="City"
          buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "City") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("City")}
        />
        <CustomButton
          buttonText="College"
          buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "College") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("College")}
        />
        <CustomButton
          buttonText="Condominium"
          buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Condominium") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("Condominium")}
        />
        <CustomButton
          buttonText="All"
          buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("All")}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {_.map(lists, (item) => {
          return listingLoading ? <Skeleton /> : <ListingCardComponent/>;
        })}
      </div>
    </div>
  );
};

export default ListingSection;
