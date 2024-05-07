import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

export { getServerSideProps };

const TitlePage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectBtn, setSelectBtn] = useState("All");

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.title")}
      hideBgImage
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container relative pt-6 pb-4 flex justify-center">
        <div className="primary-bg-color p-2 global-border-radius absolute top-0">
          <CustomImage
            src={Images.ringIcon}
            imageStyle={{ width: 30, height: 30 }}
          />
        </div>
        <div className="global-box-shadow global-border-radius p-5 primaryWhite-bg-color pt-10 w-full">
          <CustomText textClassName="disable-text font-size-small mb-5">
            15 Dec 2024
          </CustomText>
          <CustomText textClassName="disable-text font-size-xsmall">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
            lorem ut ligula posuere viverra. Nam sem lorem, egestas quis
            ultricies ut, pellentesque et nibh. Duis sit amet pulvinar
            metus. Etiam convallis vulputate tincidunt. Proin arcu diam,
            pharetra sit amet mauris quis, malesuada vehicula lacus.<br/> Nam
            aliquet, lacus non dapibus ultrices, purus nisi consequat metus, sed
            tincidunt sapien nulla ut mi. Morbi ante arcu, accumsan nec
            elementum a, tristique a lorem. Nullam non nisi quam. Ut pulvinar,
            risus a pellentesque varius, dui eros placerat enim, ac hendrerit
            velit nibh in sapien. Phasellus vulputate risus magna, nec consequat
            neque porta et. Nulla in ante dui.
          </CustomText>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(TitlePage);
