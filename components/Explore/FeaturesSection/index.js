import Image from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const FeaturesSection = ({ tags }) => {
  return (
    <div className="grid grid-cols-12 gap-3 pb-7">
      <a
        className="col-span-6 cursor-pointer"
        href={`/search?key=rental_type&id=${Constant.ROOM_FOR_RENT}`}
      >
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-row-reverse flex-nowrap bg-white border-none global-box-shadow feature-button"
          textClassName="text-black font-normal text-sm line-clamp-1"
          buttonText="Rooms For Rent"
          icon={Image.bedIconActive}
          imageHeight={25}
          imageWidth={25}
        />
      </a>
      <a
        className="col-span-6 cursor-pointer"
        href={`/search?key=space_type&id=car_park`}
      >
        <CustomButton
          buttonStyles={{ height: 60, width: "100%" }}
          buttonClassName="flex-row-reverse flex-nowrap bg-white border-none global-box-shadow feature-button"
          textClassName="text-black font-normal text-sm line-clamp-1"
          buttonText="Car Park"
          icon={Image.carParkSpaceIcon}
          imageHeight={25}
          imageWidth={25}
        />
      </a>

      {/*{_.map(tags, (item, index) => {*/}
      {/*  const icon = listingSelector.getImageUrl(item);*/}
      {/*  const name = listingSelector.getName(item);*/}
      {/*  const code = listingSelector.getCode(item);*/}

      {/*  return (*/}
      {/*    <div className="col-span-3" key={index}>*/}
      {/*      <CustomButton*/}
      {/*        buttonStyles={{ height: 60, width: "100%" }}*/}
      {/*        buttonClassName="flex-col-reverse gap-0 bg-white border-none global-box-shadow p-2 feature-button"*/}
      {/*        textClassName="text-black font-normal text-xs line-clamp-1 mt-1.5"*/}
      {/*        buttonText={name}*/}
      {/*        icon={icon}*/}
      {/*        imageStyle={{ width: 20, height: 20 }}*/}
      {/*        onClick={() => onClickToPropertyListing("tags", code)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
};

export default FeaturesSection;
