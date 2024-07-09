import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const RentalIncomeCard = () => {
  return (
    <div className="global-box-shadow global-border-radius p-4 flex justify-between items-center">
      <div className="flex">
        <CustomImage src={Images.rentalInIcon} width={30} height={30} />

        <div className="px-3">
          <CustomText textClassName="disable-text italic font-size-xxsmall">
            08 Feb 2024, 3.35pm
          </CustomText>
          <CustomText textClassName="font-bold font-size-small">M Vertica Unit A202-23, Room1</CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            Transfer to Wallet
          </CustomText>
        </div>
      </div>

      <CustomText textClassName="font-bold primary-text font-size-large">+RM1,000</CustomText>
    </div>
  );
};

export default RentalIncomeCard;
