import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";

const RentChargesSection = ({ openCharges, onClickOpenCharges, lists }) => {
  return (
    <div
      className="col-span-6 mt-3 flex flex-col primaryWhite-bg-color p-4 global-box-shadow"
      style={{ borderRadius: 15 }}
    >
      <div className="flex items-center">
        <CustomImage src={Images.logoImage} width={40} height={40} />

        <div className="flex flex-col pl-2">
          <CustomText textClassName="font-bold primary-text font-size-large">
            Room for Rent
          </CustomText>
          <CustomText textClassName="font-light font-size-small disable-text">
            Hosted by Sky Sanctuary
          </CustomText>
        </div>
      </div>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9", margin: "15px 0" }}
      ></div>

      <CustomText textClassName="font-bold pb-1">Move In Cost</CustomText>
      <CustomText textClassName="font-size-xsmall font-light leading-4 disable-text">
        Please check the payment breakdown below. Should you have any inquiries,
        please contact the owner or agent before proceeding with your payment.
      </CustomText>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>

      <div
        className={`collapse ${openCharges ? "collapse-open" : ""} pb-1`}
        style={{ borderRadius: 0 }}
      >
        <div
          className="collapse-title flex justify-between items-center cursor-pointer pb-1"
          style={{ padding: 0, minHeight: 20 }}
        >
          <div className="flex items-center" onClick={onClickOpenCharges}>
            <CustomText textClassName="font-bold pr-2">Rent Charges</CustomText>
            <CustomImage
              src={!openCharges ? Images.upIcon : Images.downIcon}
              width={13}
              height={13}
            />
          </div>

          <CustomText>RM756.00</CustomText>
        </div>
        <div className="collapse-content p-0">
          <div className="flex items-center pt-1">
            <CustomImage
              src={Images.infoIcon}
              height={20}
              width={20}
              onClick={() =>
                document.getElementById("rent_charges_details").showModal()
              }
            />
            <CustomText
              styles={{ color: "#1E1E1E" }}
              textClassName="pl-2 font-light font-size-small"
            >
              Inclusion of:
            </CustomText>
          </div>

          {_.map(lists, (item, index) => {
            const title = _.get(item, ["title"], "");
            const value = _.get(item, ["value"], "");

            return (
              <ul className="pl-7" key={index}>
                <li className="flex justify-between">
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light font-size-small"
                  >
                    - {title}
                  </CustomText>
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light"
                  >
                    {value}
                  </CustomText>
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pb-1">
        <CustomText textClassName="font-bold pr-2">Move In Fee</CustomText>
        <CustomText>RM300.00</CustomText>
      </div>
      <div className="flex justify-between items-center pb-1">
        <CustomText textClassName="font-bold pr-2">Security Deposit</CustomText>
        <CustomText>RM1,400.00</CustomText>
      </div>
      <div className="flex justify-between items-center">
        <CustomText textClassName="font-bold pr-2">Key Deposit</CustomText>
        <CustomText>RM200.00</CustomText>
      </div>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="font-bold pr-2">
          Total Move-in Cost
        </CustomText>
        <CustomText textClassName="primary-text font-bold">
          RM2,656.00
        </CustomText>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="is_pay_partial"
            value="full"
            className="radio booking-radio mr-2"
          />
          <CustomText>Pay in Full</CustomText>
        </div>

        <CustomText>RM2,656.00</CustomText>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="is_pay_partial"
            value="partial"
            className="radio booking-radio mr-2"
          />
          <CustomText>Pay in Partial</CustomText>
        </div>

        <CustomText>RM1,328.00</CustomText>
      </div>
    </div>
  );
};

export default RentChargesSection;
