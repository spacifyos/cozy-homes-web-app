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
import { useRef, useState } from "react";
import AgentSection from "@/components/PropertyOverview/AgentSection";
import UploadIcButton from "@/components/Booking/UploadIcButton";
import { value } from "lodash/seq";
import Toast from "@/src/utils/Toast";
import RentChargeModal from "@/components/Booking/RentChargeModal";
import moment from "moment";
import RentChargesSection from "@/components/Booking/RentChargesSection";
import BookingDateInput from "@/components/Booking/BookingDateInput";

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
  const formRef = useRef();

  const [openCharges, setOpenCharges] = useState(false);
  const [emergencyContactNumber, setEmergencyContactNumber] = useState([0]);
  const [icFrontBase64, setIcFrontBase64] = useState("");
  const [icBackBase64, setIcBackBase64] = useState("");
  const [isReadAgree, setIsReadAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");

  const onClickOpenCharges = () => {
    setOpenCharges(!openCharges);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBooking = (id) => {
    const currentForm = formRef && formRef.current;
    const newErrors = {};

    const requiredFields = [
      "booking_date_from",
      "tenure_period",
      "applicant_name",
      "applicant_id_type",
      "applicant_id_value",
      "applicant_race",
      "applicant_gender",
      "applicant_email",
      "applicant_area_code",
      "applicant_phone_number",
      "applicant_nationality",
      "applicant_line_1",
      "applicant_city",
      "applicant_postcode",
      "applicant_country",
      "applicant_state",
      "otp",
    ];

    _.forEach(requiredFields, (field) => {
      if (_.isEmpty(currentForm[field].value)) {
        newErrors[field] = `${currentForm[field].title} is required`;
      }
    });

    // Emergency contact validation
    _.forEach(emergencyContactNumber, (item, index) => {
      const emergencyFields = [
        `applicant_emergency_name${index + 1}`,
        `applicant_emergency_relationship${index + 1}`,
        `applicant_emergency_area_code${index + 1}`,
        `applicant_emergency_phone_number${index + 1}`,
        `applicant_emergency_email${index + 1}`,
      ];

      emergencyFields.forEach((field) => {
        if (_.isEmpty(currentForm[field].value)) {
          newErrors[field] = `${currentForm[field].title} is required`;
        }
      });
    });

    setErrorMessage(newErrors);

    if (!_.isEmpty(newErrors)) {
      return Toast.error("All fields are required.");
    }

    if (
      !_.includes(currentForm.applicant_email.value, "@") ||
      !_.includes(currentForm.applicant_emergency_email1.value, "@")
    ) {
      return Toast.error("Email must be include @.");
    }

    if (_.isEmpty(otpToken)) {
      return Toast.error("You must verify your phone number");
    }

    if (_.isEmpty(icFrontBase64) || _.isEmpty(icBackBase64)) {
      return Toast.error(
        "Please upload the supporting document.(IC or Passport)",
      );
    }

    if (_.isEmpty(currentForm.is_pay_partial.value)) {
      return Toast.error(
        "Please select total move-in cost is pay in full or partial",
      );
    }

    if (!isReadAgree) {
      return Toast.error("Please tick understand and agree policy.");
    }

    const postData = {
      listing_id: id,
      booking_date_from: currentForm.booking_date_from.value,
      booking_date_to: moment(currentForm.booking_date_from.value)
        .add(_.toInteger(currentForm.tenure_period.value), "months")
        .format("YYYY-MM-DD"),
      applicant_id_type: currentForm.applicant_id_type.value,
      applicant_id_value: currentForm.applicant_id_value.value,
      applicant_phone_number:
        currentForm.applicant_area_code.value +
        currentForm.applicant_phone_number.value,
      applicant_email: currentForm.applicant_email.value,
      applicant_name: currentForm.applicant_name.value,
      applicant_race: currentForm.applicant_race.value,
      applicant_gender: currentForm.applicant_gender.value,
      applicant_nationality: currentForm.applicant_nationality.value,
      applicant_country: currentForm.applicant_country.value,
      applicant_state: currentForm.applicant_state.value,
      applicant_city: currentForm.applicant_city.value,
      applicant_line_1: currentForm.applicant_line_1.value,
      applicant_postcode: currentForm.applicant_postcode.value,
      applicant_document_front: icFrontBase64,
      applicant_document_back: icBackBase64,
      applicant_emergency_contacts: JSON.stringify(
        _.map(emergencyContactNumber, (item, index) => {
          return {
            name: currentForm[`applicant_emergency_name${index + 1}`].value,
            relationship:
              currentForm[`applicant_emergency_relationship${index + 1}`].value,
            phone_number:
              currentForm[`applicant_emergency_area_code${index + 1}`].value +
              currentForm[`applicant_emergency_phone_number${index + 1}`].value,
            email: currentForm[`applicant_emergency_email${index + 1}`].value,
          };
        }),
      ),
      otp: currentForm.otp.value,
      otp_token: "",
      is_zero_deposit: false,
      is_pay_partial: currentForm.is_pay_partial.value,
      tenure_period: currentForm.tenure_period.value,
    };

    console.log(postData);
    // router.push(`/booking/${id}/overview`);
  };

  // console.log(errorMessage);

  const onClickToBookAppointment = (id) => {
    router.push(`/property-overview/${id}/book-appointment`);
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

  const onClickReadAgree = () => {
    setIsReadAgree(!isReadAgree);
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

        <form ref={formRef} className="grid grid-cols-6 gap-2">
          <CustomText textClassName="col-span-4 font-bold pt-3">
            Tenancy Period
          </CustomText>
          <BookingDateInput
            className="col-span-3"
            placeholder="2023-02-13"
            title="Check in date"
            name="booking_date_from"
            errorMessage={errorMessage.booking_date_from}
            required
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
            errorMessage={errorMessage.tenure_period}
            required
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Please Fill in The Form
          </CustomText>
          <BookingInput
            className="col-span-6"
            placeholder="Name"
            name="applicant_name"
            title="Name"
            errorMessage={errorMessage.applicant_name}
            required
          />

          <BookingSelect
            className="col-span-2"
            placeholder="Select ID type"
            title="ID Type"
            lists={[
              { name: "NRIC", value: "bric" },
              { name: "Passport", value: "passport" },
            ]}
            name="applicant_id_type"
            errorMessage={errorMessage.applicant_id_type}
            required
          />

          <BookingInput
            className="col-span-4"
            placeholder="ID Number"
            title="ID Number"
            name="applicant_id_value"
            errorMessage={errorMessage.applicant_id_value}
            required
          />

          <BookingSelect
            className="col-span-6"
            placeholder="Select Race"
            title="Race"
            name="applicant_race"
            lists={[
              { name: "Malay", value: "melay" },
              { name: "Chinese", value: "chinese" },
              { name: "Indian", value: "indian" },
            ]}
            errorMessage={errorMessage.applicant_race}
            required
          />

          <BookingSelect
            className="col-span-6"
            placeholder="Select Gender"
            title="Gender"
            lists={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
            name="applicant_gender"
            errorMessage={errorMessage.applicant_gender}
            required
          />

          <BookingInput
            className="col-span-6"
            placeholder="Email"
            title="Email"
            name="applicant_email"
            errorMessage={errorMessage.applicant_email}
            required
          />

          <BookingSelect
            className="col-span-2"
            placeholder="Select Area Code"
            title="Area Code"
            lists={[{ name: "+60", value: "+60" }]}
            name="applicant_area_code"
            errorMessage={errorMessage.applicant_area_code}
            required
          />

          <BookingInput
            className="col-span-4"
            type="number"
            placeholder="Phone Number"
            title="Phone Number"
            name="applicant_phone_number"
            errorMessage={errorMessage.applicant_phone_number}
            required
          />

          <BookingSelect
            className="col-span-6"
            placeholder="Select Nationality"
            title="Nationality"
            lists={[{ name: "Malaysian", value: "malaysian" }]}
            name="applicant_nationality"
            errorMessage={errorMessage.applicant_nationality}
            required
          />

          <CustomText textClassName="col-span-6 font-bold pt-3">
            Address Information
          </CustomText>

          <BookingInput
            className="col-span-6"
            placeholder="Your Address"
            title="Your Address"
            name="applicant_line_1"
            errorMessage={errorMessage.applicant_line_1}
            required
          />

          <BookingInput
            className="col-span-3"
            placeholder="City"
            title="City"
            name="applicant_city"
            errorMessage={errorMessage.applicant_city}
            required
          />

          <BookingInput
            className="col-span-3"
            placeholder="Postcode"
            title="PostCode"
            name="applicant_postcode"
            errorMessage={errorMessage.applicant_postcode}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Country"
            title="Country"
            lists={[{ name: "Malaysia", value: "malaysia" }]}
            name="applicant_country"
            errorMessage={errorMessage.applicant_country}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select State"
            title="State"
            lists={[{ name: "Johor", value: "johor" }]}
            name="applicant_state"
            errorMessage={errorMessage.applicant_state}
            required
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
                  name={`applicant_emergency_name${index + 1}`}
                  errorMessage={
                    errorMessage[`applicant_emergency_name${index + 1}`]
                  }
                  required
                />

                <BookingInput
                  className="col-span-6"
                  placeholder="Enter Relationship"
                  title="Enter Relationship"
                  name={`applicant_emergency_relationship${index + 1}`}
                  errorMessage={
                    errorMessage[`applicant_emergency_relationship${index + 1}`]
                  }
                  required
                />

                <BookingSelect
                  className="col-span-2"
                  placeholder="Select Area Code"
                  title="Area Code"
                  lists={[{ name: "+60", value: "+60" }]}
                  name={`applicant_emergency_area_code${index + 1}`}
                  errorMessage={
                    errorMessage[`applicant_emergency_area_code${index + 1}`]
                  }
                  required
                />

                <BookingInput
                  className="col-span-4"
                  type="number"
                  placeholder="Phone Number"
                  title="Phone Number"
                  name={`applicant_emergency_phone_number${index + 1}`}
                  errorMessage={
                    errorMessage[`applicant_emergency_phone_number${index + 1}`]
                  }
                  required
                />

                <BookingInput
                  className="col-span-6"
                  placeholder="Your Email"
                  title="Your Email"
                  name={`applicant_emergency_email${index + 1}`}
                  errorMessage={
                    errorMessage[`applicant_emergency_email${index + 1}`]
                  }
                  required
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
            type="number"
            title="Code"
            name="otp"
            errorMessage={errorMessage.otp}
            required
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
              imageStyle={{
                width: "100%",
                height: 155,
                objectFit: "contain",
              }}
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
              imageStyle={{
                width: "100%",
                height: 155,
                objectFit: "contain",
              }}
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

          <RentChargesSection
            openCharges={openCharges}
            onClickOpenCharges={onClickOpenCharges}
            lists={lists}
          />

          <div className="col-span-6 flex items-start px-2 pt-3">
            <CustomImage
              src={isReadAgree ? Images.checkGreenIcon : Images.uncheckIcon}
              width={23}
              height={23}
              onClick={onClickReadAgree}
              className="cursor-pointer"
            />
            <CustomText textClassName="pl-3 font-bold disable-text">
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
        </form>

        <AgentSection
          t={t}
          onClickBooking={onClickBooking}
          onClickToBookAppointment={onClickToBookAppointment}
        />
      </div>

      <RentChargeModal />
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
