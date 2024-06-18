import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import * as listingSelector from "@/src/selectors/listing";

const AmenitiesComponent = ({ data, loading, onClickSelectAmenities }) => {
  const screenHeight = window.innerHeight;

  return (
    <div
      className="amenities-nav-container"
      style={{
        height: screenHeight * 0.65,
        top: 10,
        borderRadius: "0 10px 10px 0",
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-md primary-text"></span>
        </div>
      ) : (
        _.map(data, (item, index) => {
          const name = listingSelector.getName(item);
          const icon = listingSelector.getImageUrl(item);
          const code = listingSelector.getCode(item);
          const iconActive = listingSelector.getImageUrlActive(item);
          const isActive = _.get(item, ["isActive"], false);

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => onClickSelectAmenities(name, code)}
            >
              <CustomImage
                src={isActive ? iconActive : icon}
                width={25}
                height={25}
              />
              <CustomText
                textClassName={`${isActive ? "primary-text" : "disable-text"} text-center font-size-xxsmall`}
              >
                {name}
              </CustomText>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AmenitiesComponent;
