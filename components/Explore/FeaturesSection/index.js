import Image from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";

const FeaturesSection = ({ onClickToPropertyListing }) => {
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
      <div className="col-span-3">
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-col-reverse gap-0 primaryWhite-bg-color border-none global-box-shadow p-2 feature-button"
          textClassName="black-text font-normal font-size-xsmall line-clamp-1 mt-1.5"
          buttonText="Short Stay"
          icon={Image.shortStayIcon}
          imageStyle={{ width: 20, height: 20 }}
        />
      </div>
      <div className="col-span-3">
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-col-reverse gap-0 primaryWhite-bg-color border-none global-box-shadow p-2 feature-button"
          textClassName="black-text font-normal font-size-xsmall line-clamp-1 mt-1.5"
          buttonText="Event Space"
          icon={Image.eventIcon}
          imageStyle={{ width: 20, height: 20 }}
        />
      </div>
      <div className="col-span-3">
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-col-reverse gap-0 primaryWhite-bg-color border-none global-box-shadow p-2 feature-button"
          textClassName="black-text font-normal font-size-xsmall line-clamp-1 mt-1.5"
          buttonText="Car park"
          icon={Image.carParkIcon}
          imageStyle={{ width: 20, height: 20 }}
        />
      </div>
      <div className="col-span-3">
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-col-reverse gap-0 primaryWhite-bg-color border-none global-box-shadow p-2 feature-button"
          textClassName="black-text font-normal font-size-xsmall line-clamp-1 mt-1.5"
          buttonText="Workspace"
          icon={Image.workspaceIcon}
          imageStyle={{ width: 20, height: 20 }}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
