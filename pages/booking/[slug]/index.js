import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import BookingInput from "@/components/Booking/BookingInput";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import Image from "@/src/utils/Image";
import { useState } from "react";
import AgentSection from "@/components/Detail/AgentSection";

export { getServerSideProps };

const lists = [
  {
    title: "First Month Rental",
    value: "RM100",
  },
  {
    title: "Insurance Extra Charges",
    value: "RM100",
  },
  {
    title: "Aircond Charges",
    value: "RM100",
  },
  {
    title: "Water Bill",
    value: "RM100",
  },
];

const Booking = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [openCharges, setOpenCharges] = useState(false);

  const onClickOpenCharges = () => {
    setOpenCharges(!openCharges);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBooking = () => {
    router.push(`/booking/1/overview`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.booking")}
      hideBgImage
      hideRightButton
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-36">
        <div className="flex justify-center pb-4">
          <CustomImage
            src={Images.filterDefaultImage}
            imageStyle={{ width: "100%" }}
            className="rounded-2xl"
          />
        </div>

        <CustomText textClassName="primary-text font-bold">
          Room for Rent
        </CustomText>
        <CustomText textClassName="font-bold pb-3">
          RM1,100 / Monthly
        </CustomText>

        <CustomText textClassName="font-bold">
          M Vertica, Kuala Lumpur
        </CustomText>
        <CustomText textClassName="primary-text font-size-small">
          A-01-01, Room 2
        </CustomText>
        <CustomText textClassName="disable-text font-size-xxsmall">
          Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala
          Lumpur, Federal Territory of Kuala Lumpur.
        </CustomText>

        <div className="grid grid-cols-6 gap-2">
          <CustomText textClassName="col-span-4 font-bold pt-3">
            Tenancy Period
          </CustomText>
          <BookingInput
            inputClassName="col-span-3"
            placeholder="2023-02-13"
            title="Check in date"
            name="check_in"
          />

          <BookingSelect
            inputClassName="col-span-3"
            placeholder="Select period"
            title="Tenure Period"
            lists={[
              { name: "3 months", value: "3" },
              { name: "6 months", value: "6" },
              { name: "1 year", value: "12" },
              { name: "2 years", value: "24" },
            ]}
            name="tenure_period"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Please Fill in The Form
          </CustomText>

          <BookingInput
            inputClassName="col-span-6"
            placeholder="name"
            title="Name"
          />

          <BookingSelect
            inputClassName="col-span-2"
            placeholder="Select ID type"
            title="ID Type"
            lists={[
              { name: "NRIC", value: "bric" },
              { name: "Passport", value: "passport" },
            ]}
            name="type"
          />

          <BookingInput
            inputClassName="col-span-4"
            placeholder="ID Number"
            title="ID Number"
            name="id_number"
          />

          <BookingSelect
            inputClassName="col-span-6"
            placeholder="Select race"
            title="Race"
            name="race"
            lists={[
              { name: "Malay", value: "melay" },
              { name: "Chinese", value: "chinese" },
              { name: "Indian", value: "indian" },
            ]}
          />

          <BookingSelect
            inputClassName="col-span-6"
            placeholder="Select gender"
            title="Gender"
            lists={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
            name="gender"
          />

          <BookingInput
            inputClassName="col-span-6"
            placeholder="xxx@gmail.com"
            title="Email"
            name="name"
          />

          <BookingSelect
            inputClassName="col-span-2"
            placeholder="Select area code"
            title="Area Code"
            lists={[{ name: "+60", value: "+60" }]}
            name="area_code"
          />

          <BookingInput
            inputClassName="col-span-4"
            placeholder="0123456789"
            title="Phone Number"
            name="phone_number"
          />

          <BookingSelect
            inputClassName="col-span-6"
            placeholder="Select nationality"
            title="Nationality"
            lists={[{ name: "Malaysian", value: "malaysian" }]}
            name="nationality"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Address Information
          </CustomText>

          <BookingInput
            inputClassName="col-span-6"
            placeholder="your address"
            title="Your Address"
            name="address"
          />

          <BookingInput
            inputClassName="col-span-3"
            placeholder="city"
            title="City"
            name="city"
          />

          <BookingInput
            inputClassName="col-span-3"
            placeholder="postcode"
            title="PostCode"
            name="postcode"
          />

          <BookingSelect
            inputClassName="col-span-3"
            placeholder="Select country"
            title="Country"
            lists={[{ name: "Malaysia", value: "malaysia" }]}
            name="country"
          />

          <BookingSelect
            inputClassName="col-span-3"
            placeholder="Select state"
            title="State"
            lists={[{ name: "Johor", value: "johor" }]}
            name="state"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Emergency Contact Information
          </CustomText>

          <BookingInput
            inputClassName="col-span-6"
            placeholder="your name"
            title="Your Name"
            name="name"
          />

          <BookingInput
            inputClassName="col-span-6"
            placeholder="enter relationship"
            title="Enter Relationship"
            name="relationship"
          />

          <BookingSelect
            inputClassName="col-span-2"
            placeholder="Select area code"
            title="Area Code"
            lists={[{ name: "+60", value: "+60" }]}
            name="area code"
          />

          <BookingInput
            inputClassName="col-span-4"
            placeholder="0123456789"
            title="Phone Number"
            name="phone_number"
          />

          <BookingInput
            inputClassName="col-span-6"
            placeholder="xxx@gmail.com"
            title="Your Email"
            name="email"
          />

          <CustomButton
            buttonText={"+ Add Contact"}
            buttonStyles={{ backgroundColor: "#D9D9D9", border: "none" }}
            textClassName="black-text"
            buttonClassName="col-span-6"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Verification
          </CustomText>

          <BookingInput
            inputClassName="col-span-6"
            placeholder="000000"
            title="Code"
            name="code"
          />

          <CustomButton
            buttonText={"Send Code"}
            buttonClassName="primary-btn col-span-6"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Supporting Documents
          </CustomText>

          <div className="col-span-6 pl-1">
            <CustomText textClassName="font-light font-size-xsmall ">
              1. Please make sure your IC or passport is clear and readable.
            </CustomText>
            <CustomText textClassName="font-light font-size-xsmall ">
              2. Please avoid flash or glare.
            </CustomText>
          </div>

          <CustomText textClassName="col-span-6 font-light disable-text font-size-small">
            Example:
          </CustomText>

          <div className="col-span-3 flex flex-col items-center">
            <CustomImage src={Images.icFront} imageStyle={{ width: "100%" }} />
            <CustomButton
              icon={Images.uploadIcon}
              buttonText="Front Image"
              buttonClassName="primary-btn flex-row-reverse mt-1 w-full"
            />
          </div>

          <div className="col-span-3 flex flex-col items-center">
            <CustomImage src={Images.icBack} imageStyle={{ width: "100%" }} />
            <CustomButton
              icon={Images.uploadIcon}
              buttonText="Back Image"
              buttonClassName="primary-btn flex-row-reverse mt-1 w-full"
            />
          </div>

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
                <CustomText
                  styles={{ color: "#939CA2" }}
                  textClassName="font-light font-size-small"
                >
                  Hosted by Sky Sanctuary
                </CustomText>
              </div>
            </div>

            <div
              className="divider-line"
              style={{ backgroundColor: "#D9D9D9", margin: "15px 0" }}
            ></div>

            <CustomText textClassName="font-bold pb-1">Move In Cost</CustomText>
            <CustomText
              styles={{ color: "#939CA2" }}
              textClassName="font-size-xsmall font-light leading-4"
            >
              Please check the payment breakdown below. Should you have any
              inquiries, please contact the owner or agent before proceeding
              with your payment.
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
                  <CustomText textClassName="font-bold pr-2">
                    Rent Charges
                  </CustomText>
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
                  <CustomImage src={Images.infoIcon} height={20} width={20} />
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="pl-2 font-light"
                  >
                    Inclusion of:
                  </CustomText>
                </div>

                {_.map(lists, (item, index) => {
                  const title = _.get(item, ["title"], "");
                  const value = _.get(item, ["value"], "");

                  return (
                    <ul className="pl-7">
                      <li className="flex justify-between">
                        <CustomText
                          styles={{ color: "#1E1E1E" }}
                          textClassName="font-light"
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
              <CustomText textClassName="font-bold pr-2">
                Move In Fee
              </CustomText>
              <CustomText>RM300.00</CustomText>
            </div>
            <div className="flex justify-between items-center pb-1">
              <CustomText textClassName="font-bold pr-2">
                Security Deposit
              </CustomText>
              <CustomText>RM1,400.00</CustomText>
            </div>
            <div className="flex justify-between items-center">
              <CustomText textClassName="font-bold pr-2">
                Key Deposit
              </CustomText>
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
                  name="radio-1"
                  className="radio booking-radio mr-2"
                  checked
                />
                <CustomText>Pay in Full</CustomText>
              </div>

              <CustomText>RM2,656.00</CustomText>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio booking-radio mr-2"
                />
                <CustomText>Pay in Partial</CustomText>
              </div>

              <CustomText>RM1,328.00</CustomText>
            </div>
          </div>

          <div className="col-span-6 flex items-start px-2 pt-3">
            <CustomImage src={Images.checkIcon} width={25} height={25} />
            <CustomText
              styles={{ color: "#939CA2" }}
              textClassName="pl-2 font-bold"
            >
              I understand and agree to give Roomz and CTOS the consent to
              process my personal data as per PDPA Act.
            </CustomText>
          </div>

          <CustomText textClassName="col-span-6 font-light font-size-xsmall pt-3">
            This site is protected by reCAPTCHA and the Google{" "}
            <span style={{ textDecoration: "underline" }}>Privacy Policy</span>{" "}
            and{" "}
            <span style={{ textDecoration: "underline" }}>
              Terms of Service
            </span>{" "}
            apply.
          </CustomText>
        </div>

        <AgentSection t={t} onClickBooking={onClickBooking} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
