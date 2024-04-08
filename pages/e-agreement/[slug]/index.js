import CustomHeader from "@/components/CustomHeader";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import CustomImage from "@/components/CustomImage";
import CustomButton from "@/components/CustomButton";

export { getServerSideProps };

const EAgreementOverview = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToViewAgreement = (id) => {
    router.push(`/e-agreement/${id}/view-agreement`);
  };

  return (
    <CustomHeader
      onClickGoBack={onClickGoBack}
      hideBgImage
      pageTitle="E-Agreement Overview"
      rightButtonIcon={Images.downloadIcon}
    >
      <div className="body-container relative pt-6 pb-4 flex justify-center">
        <div className="primary-bg-color p-3 global-border-radius absolute top-0">
          <CustomImage
            src={Images.agreementIcon}
            imageStyle={{ width: 25, height: 25 }}
          />
        </div>
        <div className="global-box-shadow global-border-radius p-5 primaryWhite-bg-color pt-10 w-full">
          <div className="flex justify-between">
            <CustomLabelValue value="XXXXXXXXXXX" label="Reference Number" />
            <div className="pb-2">
              <CustomText textClassName="font-size-xxsmall disable-text">
                Status
              </CustomText>
              <StatusLabel status="pending" />
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue value="E-Sign & E-Stamp" label="Service" />
          <CustomLabelValue
            value="M Vertica, A-01-01, Room 1"
            label="Property"
          />
          <CustomLabelValue value="19 Aug 2023" label="Agreement Date" />
          <CustomLabelValue value="19 Aug 2023 -18 Aug 2023" label="Tenure" />

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue value="M Vertica" label="Landlord" />

          <div className="pb-2">
            <CustomText textClassName="font-size-xxsmall disable-text">
              Activity
            </CustomText>
            <div className="pt-1 grid grid-cols-2 gap-2">
              <div className="flex mr-3 items-start">
                <CustomImage
                  src={Images.checkGreyIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    Agreed
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
              <div className="flex items-start">
                <CustomImage
                  src={Images.checkGreenIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    Signed
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue value="John Doe" label="Tenant" />

          <div className="pb-2">
            <CustomText textClassName="font-size-xxsmall disable-text">
              Activity
            </CustomText>
            <div className="pt-1 grid grid-cols-2 gap-2">
              <div className="flex mr-3 items-start">
                <CustomImage
                  src={Images.checkGreyIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    Agreed
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
              <div className="flex items-start">
                <CustomImage
                  src={Images.checkGreenIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    Signed
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="grid grid-cols-2 gap-2">
            <CustomLabelValue value="Pending" label="Stamping Status" />
            <CustomLabelValue value="No" label="Insurance" />
          </div>

          <div className="flex justify-center pt-5 w-full">
            <CustomButton
              onClick={() => onClickToViewAgreement(1)}
              buttonText="View & Agree"
              buttonClassName="primary-btn w-3/5"
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EAgreementOverview);
