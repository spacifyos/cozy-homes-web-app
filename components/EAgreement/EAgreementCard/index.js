import StatusLabel from "@/components/StatusLabel";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import * as agreementSelector from "@/src/selectors/agreement";
import { isEmpty } from "lodash";

const EAgreementCard = ({ item }) => {
  const referenceNumber = agreementSelector.getReferenceNumber(item);
  const property = agreementSelector.getProperty(item);
  const status = agreementSelector.getStatus(item);
  const tenurePeriod = agreementSelector.getTenurePeriod(item);
  const getAgreed = agreementSelector.getAgree(item);
  const getSigned = agreementSelector.getSigned(item);
  const id = agreementSelector.getId(item);

  return (
    <a
      href={`/user/e-agreement/${id}`}
      className="global-box-shadow global-border-radius p-4 bg-white flex items-center cursor-pointer"
    >
      <div className="flex-1 pr-3">
        <StatusLabel status={status} />

        <CustomText textClassName="text-sm text-primary font-bold pt-1">
          {isEmpty(referenceNumber) ? "-" : referenceNumber}
        </CustomText>

        <CustomText textClassName="font-bold text-sm">
          {isEmpty(property) ? "-" : property}
        </CustomText>

        <CustomText textClassName="text-disable text-xs pt-1">
          {isEmpty(tenurePeriod) ? "-" : tenurePeriod}
        </CustomText>

        <div
          className="divider-line"
          style={{ marginTop: 10, marginBottom: 10 }}
        ></div>

        <div className="flex">
          <div className="flex mr-5">
            <CustomImage
              src={getAgreed ? Images.checkGreenIcon : Images.checkGreyIcon}
              className="mr-1"
              imageStyle={{ width: 15, height: 15 }}
            />
            <CustomText textClassName="text-xs text-disable">Agreed</CustomText>
          </div>

          <div className="flex">
            <CustomImage
              src={getSigned ? Images.checkGreenIcon : Images.checkGreyIcon}
              className="mr-1"
              imageStyle={{ width: 15, height: 15 }}
            />
            <CustomText textClassName="text-xs text-disable">Signed</CustomText>
          </div>
        </div>
      </div>
      <CustomImage
        src={Images.rightIcon}
        imageStyle={{ width: 10, height: 10 }}
      />
    </a>
  );
};

export default EAgreementCard;
