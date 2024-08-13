import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

export { getServerSideProps };

const MyReport = () => {
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col flex-1 ">
      <div className="body-container py-5 owner-bg-color">
        <div className={`flex items-center justify-between overflow-hidden`}>
          <div className="flex justify-center items-center">
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 cursor-pointer"}
                src={Images.leftIconWhite}
                imageStyle={{ width: 10 }}
              />
            </div>

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              My Property
            </CustomText>
          </div>

          {/*<CustomImage*/}
          {/*  src={rightButtonIcon}*/}
          {/*  imageStyle={{ width: 25, height: 25 }}*/}
          {/*  onClick={onClickRightButton}*/}
          {/*  className="cursor-pointer"*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
