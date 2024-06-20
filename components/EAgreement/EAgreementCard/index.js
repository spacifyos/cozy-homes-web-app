import StatusLabel from "@/components/StatusLabel";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import * as agreementSelector from "@/src/selectors/agreement";

const EAgreementCard = ({ item, onClickToDetail, t }) => {
  const referenceNumber = agreementSelector.getReferenceNumber(item);
  const property = agreementSelector.getProperty(item);
  const status = agreementSelector.getStatus(item);
  const tenurePeriod = agreementSelector.getTenurePeriod(item);
  const getAgree = agreementSelector.getAgree(item);
  const getSigned = agreementSelector.getSigned(item);

  return (
    <div
      className="global-box-shadow global-border-radius p-4 primaryWhite-bg-color flex items-center cursor-pointer"
      onClick={() => onClickToDetail(1)}
    >
      <div className="flex-1 pr-3">
        <StatusLabel status={item} />
        <CustomText textClassName="font-size-small primary-text font-bold">
          XXXXXXXXX
        </CustomText>
        <CustomText textClassName="font-bold">
          M Vertica, A-01-01, Room 1
        </CustomText>
        <CustomText textClassName="disable-text font-size-xsmall">
          15 Dec 2022 - 14 Dec 2023
        </CustomText>

        <div
          className="divider-line"
          style={{ marginTop: 10, marginBottom: 10 }}
        ></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <CustomText textClassName="font-size-small">
              {t("eAgreement.landlord")}
            </CustomText>
            <div className="flex">
              <div className="flex mr-3 items-center">
                <CustomImage
                  src={Images.checkGreyIcon}
                  className="mr-1"
                  height={15}
                  width={15}
                />
                <CustomText textClassName="font-size-xsmall disable-text">
                  {t("eAgreement.agreed")}
                </CustomText>
              </div>
              <div className="flex">
                <CustomImage
                  src={Images.checkGreenIcon}
                  className="mr-1"
                  height={15}
                  width={15}
                />
                <CustomText textClassName="font-size-xsmall disable-text">
                  {t("eAgreement.signed")}
                </CustomText>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <CustomText textClassName="font-size-small">
              {t("eAgreement.tenant")}
            </CustomText>
            <div className="flex">
              <div className="flex mr-3">
                <CustomImage
                  src={Images.checkGreyIcon}
                  className="mr-1"
                  height={15}
                  width={15}
                />
                <CustomText textClassName="font-size-xsmall disable-text">
                  {t("eAgreement.agreed")}
                </CustomText>
              </div>
              <div className="flex">
                <CustomImage
                  src={Images.checkGreenIcon}
                  className="mr-1"
                  height={15}
                  width={15}
                />
                <CustomText textClassName="font-size-xsmall disable-text">
                  {t("eAgreement.signed")}
                </CustomText>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomImage src={Images.rightIcon} width={10} height={10} />
    </div>
  );
};

export default EAgreementCard;
