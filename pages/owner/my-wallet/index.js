import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import WalletSummary from "@/components/MyWallet/WalletSummary";
import TransactionComponent from "@/components/MyWallet/TransactionComponent";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { useState } from "react";

export { getServerSideProps };

const MyWallet = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const onClickSelectCategory = (value) => {
    setSelectedCategory(value);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToTransactionOverview = (id) => {
    router.push({
      pathname: `/owner/my-wallet/transaction-overview/${id}`,
    });
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container pt-5 pb-10">
        <div
          className={`flex items-center justify-between overflow-hidden pb-6`}
        >
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

        <div className="flex justify-between items-center pb-6">
          <div className="">
            <CustomText
              textClassName="white-text font-bold"
              styles={{ fontSize: 30 }}
            >
              RM99,999
            </CustomText>
            <CustomText textClassName="white-text font-size-xxsmall font-light">
              Updated on 02 Jul 2024, 4.09pm
            </CustomText>
          </div>

          <div className="global-box-shadow global-border-radius p-3 primaryWhite-bg-color flex justify-center items-center">
            <CustomImage src={Images.withdrawIcon} imageStyle={{ width: 18 }} />
            <CustomText textClassName="primary-text pl-2 font-size-small">
              Withdraw
            </CustomText>
          </div>
        </div>
      </div>

      <WalletSummary />

      <div className="body-container primaryWhite-bg-color flex-1 pb-4 pt-16">
        <TransactionComponent
          selectedCategory={selectedCategory}
          onClickSelectCategory={onClickSelectCategory}
          data={Array(10)}
          onClickToTransactionOverview={onClickToTransactionOverview}
        />
      </div>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyWallet));
