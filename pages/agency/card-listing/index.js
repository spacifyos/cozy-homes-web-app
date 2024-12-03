import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import AgencyAuthWrapper from "@/components/AgencyAuthWrapper";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { isEmpty, map } from "lodash";
import * as listingSelector from "@/src/selectors/listing";

export { getServerSideProps };

const CardListing = () => {
  const { t } = useTranslation("common");

  const [propertyListing, setPropertyListing] = useState([]);
  const [propertyListingLoading, setPropertyListingLoading] = useState(false);
  const [unitListing, setUnitListing] = useState([]);

  useEffect(() => {
    fetchPropertyListing();
  }, []);

  const fetchPropertyListing = async () => {
    await apiRequest.postPropertyListingCardViewRequest(
      setPropertyListingLoading,
      propertyListingSuccessCallback,
    );
  };

  const propertyListingSuccessCallback = (res) => {
    setPropertyListing(res);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Agency Sign In - Spacify Asia" />

      <DesktopLayout hideNav footerPaddingBottom="pb-20" loading={true}>
        <div className="container mx-auto">
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-1 flex flex-col gap-4">
              {map(propertyListing, (list) => {
                const imageUrl = listingSelector.getImageUrl(list);
                const name = listingSelector.getName(list);

                return (
                  <div className="flex flex-col justify-center items-center p-2 global-border-radius global-box-shadow cursor-pointer">
                    <CustomImage
                      className="w-16 h-16 overflow-hidden cover"
                      src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
                    />

                    <CustomText textClassName="text-xs text-center pt-1">
                      {isEmpty(name) ? "-" : name}
                    </CustomText>
                  </div>
                );
              })}
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="collapse global-box-shadow global-border-radius">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Click me to show/hide content
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>

              <div className="collapse global-box-shadow global-border-radius">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Click me to show/hide content
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AgencyAuthWrapper(CardListing));
