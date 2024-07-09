import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import UserDetailComponent from "@/components/Owner/UserDetailComponent";
import PropertyInfoComponent from "@/components/Owner/PropertyInfoComponent";
import PropertyCarouselComponent from "@/components/Owner/PropertyCarouselComponent";
import AuthWrapper from "@/components/AuthWrapper";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RentalIncomeComponent from "@/components/Owner/RentalIncomeComponent";
import { useRouter } from "next/router";

export { getServerSideProps };

const OwnerHome = () => {
  const router = useRouter();
  const name = "";
  const email = "";
  const phoneNumber = "";

  const onClickToPropertyDetail = (id = 1) => {
    router.push({
      pathname: `/owner/property/${id}`,
    });
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container pt-10 pb-12">
        <div className="flex items-center">
          <CustomText textClassName="white-text font-bold font-size-large">
            Welcome to{" "}
          </CustomText>
          <CustomImage
            src={Images.blackLogo}
            width={20}
            height={20}
            className="mx-1.5"
          />
          <CustomText textClassName="white-text font-bold font-size-large">
            Spacify
          </CustomText>
        </div>
      </div>

      <UserDetailComponent
        email={email}
        name={name}
        phoneNumber={phoneNumber}
      />

      <div className="body-container primaryWhite-bg-color flex-1 pb-24">
        <PropertyInfoComponent />

        <PropertyCarouselComponent
          onClickToPropertyDetail={onClickToPropertyDetail}
        />

        <RentalIncomeComponent />
      </div>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(OwnerHome));
