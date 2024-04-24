import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import ListingCoinsTransaction from "@/components/CoinsTransaction/ListingCoinsTransaction";
import _ from "lodash";

export { getServerSideProps };

const CoinsTransaction = () => {
  const { t } = useTranslation("common");
  const lists = [
    {
      date: "15 Dec 2022, 2.33pm",
      title: t("coinsTransaction.paymentForRent"),
      price: "RM760.00",
      coins: "380",
    },
    {
      date: "15 Dec 2022, 1.48pm",
      title: t("coinsTransaction.paymentForUtility"),
      price: "RM120.00",
      coins: "60",
    },
    {
      date: "15 Dec 2022, 2.33pm",
      title: t("coinsTransaction.paymentForRent"),
      price: "RM760.00",
      coins: "380",
    },
    {
      date: "15 Dec 2022, 1.48pm",
      title: t("coinsTransaction.paymentForUtility"),
      price: "RM120.00",
      coins: "60",
    },
  ];

  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.coinsTransaction")}
      hideBgImage
      rightButtonIcon={Images.filterProIcon}
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container flex flex-col justify-center items-center">
        <div className="profile-coin-container w-1/2 mb-7">
          <div className="profile-coin-icon-container">
            <CustomImage src={Images.logoImage} height={30} width={30} />
          </div>

          <CustomText textClassName="disable-text font-size-small">
            {t("account.roomzCoins")}
          </CustomText>

          <div className="flex items-center">
            <CustomText textClassName="primary-text font-size-xxlarge font-bold pr-2">
              5,123
            </CustomText>
            <CustomImage src={Images.refreshIcon} height={20} width={20} />
          </div>
        </div>

        {_.map(lists, (item) => {
          return <ListingCoinsTransaction item={item} />;
        })}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(CoinsTransaction);
