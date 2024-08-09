import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useRouter } from "next/router";
import TransactionComponent from "@/components/MyBank/TransactionComponent";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import { isEmpty } from "lodash";

export { getServerSideProps };

const MyBank = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [getWalletTransactionListingLoading, setGetWalletTransactionLoading] =
    useState(false);
  const [getWalletTransactionListing, setGetWalletTransaction] = useState([]);

  useEffect(() => {
    // fetchWalletTransactionListing();
    fetchUserprofileData();
  }, []);

  const fetchWalletTransactionListing = async () => {
    await apiRequest.getWalletTransactionListingRequest(
      setGetWalletTransactionLoading,
      getWalletSuccessCallback,
    );
  };

  const getWalletSuccessCallback = (res) => {
    setGetWalletTransaction(res);
  };

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToAddBank = () => {
    router.push("/owner/my-bank/add-bank");
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <NextSeo title="Add Bank - Spacify Asia" />

      <div className="body-container pt-5 pb-28">
        <div className="flex items-center">
          <CustomImage
            onClick={onClickGoBack}
            className={"me-5 cursor-pointer"}
            src={Images.leftIconWhite}
            imageStyle={{ width: 10 }}
          />

          <CustomText
            textClassName={"font-bold white-text"}
            styles={{ fontSize: 18 }}
          >
            My Bank
          </CustomText>
        </div>
      </div>

      <div className="mb-10 absolute top-16 w-full px-4 z-10">
        <div
          className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 relative flex items-center justify-center"
          style={{ height: 163 }}
        >
          {true ? (
            <div
              className="flex flex-col justify-center items-center flex-1 cursor-pointer"
              onClick={onClickToAddBank}
            >
              <CustomImage src={Images.addIcon} imageStyle={{ width: 30 }} />
              <CustomText textClassName="disable-text pt-2">
                Add Bank
              </CustomText>
            </div>
          ) : (
            <div className="flex-1">
              <div
                className="primary-bg-color absolute p-2 rounded-2xl flex justify-center items-center"
                style={{ width: 30, height: 30, right: -3, bottom: -3 }}
              >
                <CustomImage
                  src={Images.editIconWhite}
                  imageStyle={{ width: 15 }}
                />
              </div>

              <div className="flex justify-between items-center">
                <CustomText>Maybank</CustomText>

                <CustomImage
                  src={Images.logoImage}
                  imageStyle={{ width: 30 }}
                />
              </div>

              <CustomText textClassName="font-bold font-size-large pb-4">
                {" "}
                1234 1234 1234 1234
              </CustomText>

              <CustomLabelValue
                label="Bank Holder"
                highlight
                value={"Jia Hui"}
              />
            </div>
          )}
        </div>
      </div>

      <div className="body-container bg-color flex flex-1">
        <TransactionComponent
          data={getWalletTransactionListing}
          selectedCategory={selectedCategory}
          onClickSelectCategory={onClickSelectCategory}
        />
      </div>

      <LoadingOverlay
        loading={
          getWalletTransactionListingLoading ||
          (userProfileLoading && isEmpty(userProfileData))
        }
      />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyBank));
