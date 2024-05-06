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
import { useState } from "react";
import AgentSection from "@/components/PropertyOverview/AgentSection";
import CustomModal from "@/components/CustomModal";
import UploadIcButton from "@/components/Booking/UploadIcButton";
import { value } from "lodash/seq";
import Toast from "@/src/utils/Toast";

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
  const [emergencyContactNumber, setEmergencyContactNumber] = useState([0]);
  const [icFrontBase64, setIcFrontBase64] = useState("");
  const [icBackBase64, setIcBackBase64] = useState("");

  const onClickOpenCharges = () => {
    setOpenCharges(!openCharges);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBooking = () => {
    router.push(`/booking/1/overview`);
  };

  const onClickToBookAppointment = () => {
    router.push("/book-appointment/1");
  };
  const onClickAddEmergencyContact = () => {
    setEmergencyContactNumber((prevState) =>
      _.concat(prevState, _.size(emergencyContactNumber)),
    );
  };

  const onClickRemoveContact = (number) => {
    if (_.size(emergencyContactNumber) !== 1) {
      const newArray = _.pull(
        emergencyContactNumber,
        _.size(emergencyContactNumber) - 1,
      );
      setEmergencyContactNumber((prevState) => _.union(prevState, newArray));
    }
  };

  const onChangeFrontICImage = (value) => {
    convertToBase64("front", value.target.files[0]);
  };

  const onChangeBackICImage = (value) => {
    convertToBase64("back", value.target.files[0]);
  };

  const convertToBase64 = (type, file) => {
    const isLt2M = file && file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.error("Image must smaller than 2MB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (_.isEqual(type, "front")) {
          setIcFrontBase64(_.get(e, ["target", "result"], ""));
        } else {
          setIcBackBase64(_.get(e, ["target", "result"], ""));
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (_.isEqual(type, "front")) {
        setIcFrontBase64("");
      } else {
        setIcBackBase64("");
      }
    }
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
            className="col-span-3"
            placeholder="2023-02-13"
            title="Check in date"
            name="check_in"
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Tenure Period"
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
            className="col-span-6"
            placeholder="Name"
            title="Name"
          />

          <BookingSelect
            className="col-span-2"
            placeholder="Select ID type"
            title="ID Type"
            lists={[
              { name: "NRIC", value: "bric" },
              { name: "Passport", value: "passport" },
            ]}
            name="type"
          />

          <BookingInput
            className="col-span-4"
            placeholder="ID Number"
            title="ID Number"
            name="id_number"
          />

          <BookingSelect
            className="col-span-6"
            placeholder="Select Race"
            title="Race"
            name="race"
            lists={[
              { name: "Malay", value: "melay" },
              { name: "Chinese", value: "chinese" },
              { name: "Indian", value: "indian" },
            ]}
          />

          <BookingSelect
            className="col-span-6"
            placeholder="Select Gender"
            title="Gender"
            lists={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
            name="gender"
          />

          <BookingInput
            className="col-span-6"
            placeholder="Email"
            title="Email"
            name="name"
          />

          <BookingSelect
            className="col-span-2"
            placeholder="Select Area Code"
            title="Area Code"
            lists={[{ name: "+60", value: "+60" }]}
            name="area_code"
          />

          <BookingInput
            className="col-span-4"
            placeholder="Phone Number"
            title="Phone Number"
            name="phone_number"
          />

          <BookingSelect
            className="col-span-6"
            placeholder="Select Nationality"
            title="Nationality"
            lists={[{ name: "Malaysian", value: "malaysian" }]}
            name="nationality"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Address Information
          </CustomText>

          <BookingInput
            className="col-span-6"
            placeholder="Your Address"
            title="Your Address"
            name="address"
          />

          <BookingInput
            className="col-span-3"
            placeholder="City"
            title="City"
            name="city"
          />

          <BookingInput
            className="col-span-3"
            placeholder="Postcode"
            title="PostCode"
            name="postcode"
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Country"
            title="Country"
            lists={[{ name: "Malaysia", value: "malaysia" }]}
            name="country"
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select State"
            title="State"
            lists={[{ name: "Johor", value: "johor" }]}
            name="state"
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Emergency Contact Information
          </CustomText>

          {_.map(emergencyContactNumber, (item, index) => {
            return (
              <div
                className="col-span-6 grid grid-cols-6 gap-2 pt-2"
                key={index}
              >
                <CustomText textClassName="font-bold col-span-3">
                  {`Contact ${index + 1}`}
                </CustomText>

                {index === 0 && _.size(emergencyContactNumber) !== 1 ? (
                  <div
                    className="col-span-3 cursor-pointer flex justify-end"
                    onClick={() => onClickRemoveContact(index)}
                  >
                    <CustomText textClassName="error-text">Remove</CustomText>
                  </div>
                ) : (
                  false
                )}

                <BookingInput
                  className="col-span-6"
                  placeholder="your Name"
                  title="Your Name"
                  name="name"
                />

                <BookingInput
                  className="col-span-6"
                  placeholder="Enter Relationship"
                  title="Enter Relationship"
                  name="relationship"
                />

                <BookingSelect
                  className="col-span-2"
                  placeholder="Select Area Code"
                  title="Area Code"
                  lists={[{ name: "+60", value: "+60" }]}
                  name="area code"
                />

                <BookingInput
                  className="col-span-4"
                  placeholder="Phone Number"
                  title="Phone Number"
                  name="phone_number"
                />

                <BookingInput
                  className="col-span-6"
                  placeholder="Your Email"
                  title="Your Email"
                  name="email"
                />
              </div>
            );
          })}

          <CustomButton
            buttonText={"+ Add Contact"}
            buttonClassName="col-span-6 primary-btn"
            onClick={onClickAddEmergencyContact}
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Verification
          </CustomText>

          <BookingInput
            className="col-span-6"
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
            <CustomImage
              src={_.isEmpty(icFrontBase64) ? Images.icFront : icFrontBase64}
              imageStyle={{ width: "100%", height: 155, objectFit: "contain" }}
            />
            <UploadIcButton
              name="front_image"
              icon={Images.uploadIcon}
              buttonText="Front Image"
              buttonClassName="primary-btn flex-row-reverse mt-1 w-full"
              onChangeImage={onChangeFrontICImage}
              onClickSelectImage={() =>
                document.getElementById("front_image").click()
              }
            />
          </div>

          <div className="col-span-3 flex flex-col items-center">
            <CustomImage
              src={_.isEmpty(icBackBase64) ? Images.icBack : icBackBase64}
              imageStyle={{ width: "100%", height: 155, objectFit: "contain" }}
            />

            <UploadIcButton
              name="back_image"
              icon={Images.uploadIcon}
              buttonText="Back Image"
              buttonClassName="primary-btn flex-row-reverse mt-1 w-full"
              onChangeImage={onChangeBackICImage}
              onClickSelectImage={() =>
                document.getElementById("back_image").click()
              }
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
                  <CustomImage
                    src={Images.infoIcon}
                    height={20}
                    width={20}
                    onClick={() =>
                      document
                        .getElementById("rent_charges_details")
                        .showModal()
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
            <CustomText textClassName="pl-2 font-bold disable-text">
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

        <AgentSection
          t={t}
          onClickBooking={onClickBooking}
          onClickToBookAppointment={onClickToBookAppointment}
        />
      </div>

      <CustomModal id="rent_charges_details">
        <CustomText textClassName="font-size-large font-bold pb-2">
          Rent Charges Details
        </CustomText>
        <CustomText textClassName="disable-text font-size-xsmall text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim,
          dui placerat dignissim vestibulum, dolor dui tempus ex, sit amet
          pulvinar lectus sapien at dui. Proin et lacus sed velit iaculis dictum
          porttitor quis nisi. Phasellus sodales tincidunt lacus, nec dignissim
          nulla blandit in. Donec vel turpis id augue dignissim hendrerit vitae
          eu nulla.  Should you have any inquiries, please contact the owner or
          agent before proceeding with your payment.
        </CustomText>
      </CustomModal>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
