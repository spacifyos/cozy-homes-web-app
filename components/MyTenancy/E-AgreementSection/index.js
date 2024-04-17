import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabel from "@/components/StatusLabel";

const EAgreement = ({ t }) => {
  return (
    <div className="global-box-shadow global-border-radius primaryWhite-bg-color mb-5 pt-4 pb-2 px-4">
      <CustomText textClassName="disable-text font-size-small pb-2">
        {t("myTenancy.eAgreement")}
      </CustomText>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="flex justify-between pt-2">
        <CustomLabelValue
          value="XXXXXXXXXXX"
          label={t("eAgreementOverview.referenceNumber")}
        />
        <div className="pb-2">
          <CustomText textClassName="font-size-xxsmall disable-text">
            {t("eAgreementOverview.status")}
          </CustomText>
          <StatusLabel status="pending" />
        </div>
      </div>

      <CustomLabelValue
        value="E-Sign & E-Stamp"
        label={t("eAgreementOverview.service")}
      />
      <CustomLabelValue
        value="M Vertica, A-01-01, Room 1"
        label={t("eAgreementOverview.property")}
      />
      <CustomLabelValue
        value="19 Aug 2023"
        label={t("eAgreementOverview.agreementDate")}
      />
      <CustomLabelValue
        value="19 Aug 2023 -18 Aug 2023"
        label={t("eAgreementOverview.tenure")}
      />

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <CustomLabelValue
        value="M Vertica"
        label={t("eAgreementOverview.landlord")}
      />

      <div className="pb-2">
        <CustomText textClassName="font-size-xxsmall disable-text">
          {t("eAgreementOverview.activity")}
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
                {t("eAgreementOverview.agreed")}
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
                {t("eAgreementOverview.signed")}
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

      <CustomLabelValue
        value="John Doe"
        label={t("eAgreementOverview.tenant")}
      />

      <div className="pb-2">
        <CustomText textClassName="font-size-xxsmall disable-text">
          {t("eAgreementOverview.activity")}
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
                {t("eAgreementOverview.agreed")}
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
                {t("eAgreementOverview.signed")}
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
        <CustomLabelValue
          value="Pending"
          label={t("eAgreementOverview.stampingStatus")}
        />
        <CustomLabelValue
          value="No"
          label={t("eAgreementOverview.insurance")}
        />
      </div>
    </div>
  );
};

export default EAgreement;
