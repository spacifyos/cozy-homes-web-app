import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";

const DetailLabel = ({ title, value }) => {
  return (
    <div className="grid grid-cols-3 gap-3 pb-6">
      <CustomText textClassName="font-size-small">{title}</CustomText>
      <CustomText textClassName="text-end font-size-small col-span-2">
        {value}
      </CustomText>
    </div>
  );
};

const TransactionOverview = () => {
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container pt-5 pb-7">
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
              Transaction Overview
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

      <div className="px-4 absolute top-16 w-full z-10">
        <div className="global-box-shadow global-border-radius p-5 flex items-center primaryWhite-bg-color">
          <CustomImage src={Images.withdrawIcon} width={23} height={23} />
          <CustomText textClassName="font-size-xxlarge font-bold px-3">
            {` Withdraw - RM1,000`}
          </CustomText>
        </div>
      </div>

      <div className="body-container primaryWhite-bg-color flex-1 pb-4 pt-16">
        <DetailLabel title="Transaction Type" value="Rental Income" />

        <DetailLabel title="Payment Details" value="Withdraw From Wallet" />

        <DetailLabel title="Payment Method" value="Bank Transfer" />

        <DetailLabel title="Date/Time" value="01 Jul 2024, 3.35pm" />

        <DetailLabel title="Wallet Ref" value="202407011234567890000000000" />

        <DetailLabel title="Status" value="Successful" />

        <DetailLabel title="Transactions No." value="ABC12345678900222331556" />
      </div>
    </div>
  );
};

export default TransactionOverview;
