import DesktopModal from "@/components/DesktopModal";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, isEqual, map } from "lodash";
import CustomButton from "@/components/CustomButton";
import * as listingSelector from "@/src/selectors/listing";

const DesktopFilterModal = ({
  sortValue,
  setSortValue,
  genderValue,
  setGenderValue,
  amenities,
  onClickSelectAmenities,
}) => {
  const shortingList = [
    { title: "Lowest Price", value: "asc" },
    { title: "Highest Price", value: "desc" },
    { title: "Best Rating", value: "" },
  ];

  const genderList = [
    { title: "Female Unit", value: "female" },
    { title: "Male Unit", value: "male" },
    { title: "Mix Unit", value: "mix" },
  ];

  return (
    <DesktopModal id="desktop_filter_modal" styles={{ maxWidth: 600 }}>
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center font-bold">
            Filters
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                src={Images.cancelIcon}
                imageStyle={{ width: 18, height: 18 }}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <div className="pb-5">
          <CustomText textClassName="font-bold">Shorting By</CustomText>

          <div className="flex gap-2 pt-2">
            {map(shortingList, (item) => {
              const title = get(item, ["title"], "");
              const value = get(item, ["value"], "");

              return (
                <CustomButton
                  buttonText={title}
                  buttonClassName={`btn-sm ${isEqual(sortValue, value) ? "primary-btn" : "default-btn"} mr-2`}
                  textClassName="font-size-xsmall"
                  onClick={() => setSortValue(value)}
                />
              );
            })}
          </div>
        </div>

        <div className="pb-5">
          <CustomText textClassName="font-bold">Shorting By</CustomText>

          <div className="flex flex-wrap gap-2 pt-2">
            {map(amenities, (amenity) => {
              const name = listingSelector.getName(amenity);
              const icon = listingSelector.getImageUrl(amenity);
              const code = listingSelector.getCode(amenity);
              const iconActive = listingSelector.getImageUrlActive(amenity);
              const isActive = get(amenity, ["isActive"], false);

              return (
                <CustomButton
                  reverse
                  icon={isActive ? iconActive : icon}
                  buttonText={name}
                  buttonClassName={`btn-sm ${isActive ? "primary-btn" : "default-btn"} mr-2`}
                  textClassName="font-size-xsmall"
                  onClick={() => onClickSelectAmenities(name, code)}
                />
              );
            })}
          </div>
        </div>

        <div className="">
          <CustomText textClassName="font-bold">Shorting By</CustomText>

          <div className="flex gap-2 pt-2">
            {map(genderList, (item) => {
              const title = get(item, ["title"], "");
              const value = get(item, ["value"], "");

              return (
                <CustomButton
                  buttonText={title}
                  buttonClassName={`btn-sm ${isEqual(genderValue, value) ? "primary-btn" : "default-btn"} mr-2`}
                  textClassName="font-size-xsmall"
                  onClick={() => setGenderValue(value)}
                />
              );
            })}
          </div>
        </div>

        <div className="divider-line"></div>

        <div className="grid grid-cols-2 gap-2">
          <CustomButton
            buttonText="Clear All"
            buttonClassName="default-btn"
            // onClick={() => onClickCloseSignatureModal("desktop")}
          />
          <CustomButton
            buttonText="Apply"
            buttonClassName="primary-btn"
            // onClick={() => onClickSubmitSignature("desktop")}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopFilterModal;
