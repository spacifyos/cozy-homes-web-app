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
      <div className="divider-line" style={{ margin: 0 }}></div>
      <div className="flex justify-between pt-4">
        <CustomLabelValue value="XXXXXXXXXXX" label="Reference Number" />
        <div className="pb-2">
          <CustomText textClassName="font-size-xxsmall disable-text">
            Status
          </CustomText>
          <StatusLabel status="Pending" />
        </div>
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <CustomLabelValue value="E-Sign & E-Stamp" label="Service" />
      <CustomLabelValue value="M Vertica, A-01-01, Room 1" label="Property" />
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
              src={Images.checkGreyIcon}
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
              src={Images.checkGreyIcon}
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
    </div>
  );
};

export default EAgreement;
