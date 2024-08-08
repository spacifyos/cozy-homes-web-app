import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";

const DetailLabel = ({ title, value }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
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
                className={"me-5 cursor-pointer"}
                src={Images.leftIconWhite}
                imageStyle={{ width: 10 }}
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
          <CustomImage src={Images.withdrawIcon} imageStyle={{ width: 30 }} />

          <div>
            <CustomText textClassName="font-size-xxlarge font-bold px-3 leading-4">
              {`RM1,000`}
            </CustomText>
            <CustomText textClassName="font-size-xxsmall disable-text px-3">
              {`withdraw amount`}
            </CustomText>
          </div>
        </div>
      </div>

      <div className="body-container primaryWhite-bg-color flex-1 pb-4 pt-16">
        <DetailLabel title="Transaction Type" value="Rental Income" />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel title="Payment Details" value="Withdraw From Wallet" />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel title="Payment Method" value="Bank Transfer" />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel title="Date/Time" value="01 Jul 2024, 3.35pm" />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel title="Wallet Ref" value="202407011234567890000000000" />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel title="Status" value="Successful" />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel title="Transactions No." value="ABC12345678900222331556" />
      </div>
    </div>
  );
};

export default TransactionOverview;
