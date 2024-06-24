import Image from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const FeaturesSection = ({ onClickToPropertyListing, tags }) => {
  return (
    <div className="grid grid-cols-12 gap-3 pb-7">
      <div className="col-span-6">
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-row-reverse flex-nowrap primaryWhite-bg-color border-none global-box-shadow feature-button"
          textClassName="black-text font-normal font-size-small line-clamp-1"
          buttonText="Rooms For Rent"
          icon={Image.bedAmenitiesIconActive}
          imageHeight={25}
          imageWidth={25}
          onClick={() =>
            onClickToPropertyListing("rental_type", Constant.ROOM_FOR_RENT)
          }
        />
      </div>
      <div className="col-span-6">
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-row-reverse flex-nowrap primaryWhite-bg-color border-none global-box-shadow feature-button"
          textClassName="black-text font-normal font-size-small line-clamp-1"
          buttonText="House For Rent"
          icon={Image.unitAmenitiesIconActive}
          imageHeight={25}
          imageWidth={25}
          onClick={() =>
            onClickToPropertyListing("rental_type", Constant.HOME_FOR_RENT)
          }
        />
      </div>

      {_.map(tags, (item, index) => {
        const icon = listingSelector.getImageUrl(item);
        const name = listingSelector.getName(item);
        const code = listingSelector.getCode(item);

        return (
          <div className="col-span-3" key={index}>
            <CustomButton
              buttonStyles={{ height: 60, width: "100%" }}
              buttonClassName="flex-col-reverse gap-0 primaryWhite-bg-color border-none global-box-shadow p-2 feature-button"
              textClassName="black-text font-normal font-size-xsmall line-clamp-1 mt-1.5"
              buttonText={name}
              icon={icon}
              imageStyle={{ width: 20, height: 20 }}
              onClick={() => onClickToPropertyListing("tags", code)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesSection;
