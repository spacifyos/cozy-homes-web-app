import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import { useRouter } from "next/router";
import PropertyInfoComponent from "@/components/Owner/PropertyInfoComponent";
import PropertyCarouselComponent from "@/components/Owner/PropertyCarouselComponent";
import SpaceDetailComponent from "@/components/OwnerProperty/SpaceDetailComponent";
import AuthWrapper from "@/components/AuthWrapper";

export { getServerSideProps };

const PropertyDetail = () => {
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container  py-5">
        <div
          className={`flex items-center justify-between overflow-hidden pb-6`}
        >
          <div className="flex justify-center items-center">
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 w-2.5 cursor-pointer"}
                src={Images.leftIconWhite}
              />
            </div>

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              My Wallet
            </CustomText>
          </div>

          {/*<CustomImage*/}
          {/*  src={rightButtonIcon}*/}
          {/*  imageStyle={{ width: 25, height: 25 }}*/}
          {/*  onClick={onClickRightButton}*/}
          {/*  className="cursor-pointer"*/}
          {/*/>*/}
        </div>

        <div className="pb-4">
          <CustomText textClassName="white-text font-bold font-size-xlarge">
            M Vertica KL City Residences
          </CustomText>
          <CustomText textClassName="white-text font-size-xsmall font-light">
            Jalan Cheras, Kuala Lumpur
          </CustomText>
        </div>

        <PropertyInfoComponent paddingTop={"0"} />
      </div>

      <div className="body-container primaryWhite-bg-color flex-1 pb-4">

      </div>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(PropertyDetail));
