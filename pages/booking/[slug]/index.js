import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import BookingInput from "@/components/Booking/BookingInput";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomButton from "@/components/CustomButton";
import _, {
  get,
  isEmpty,
  isEqual,
  map,
  some,
  forEach,
  split,
  includes,
  size,
} from "lodash";
import { useEffect, useRef, useState } from "react";
import AgentSection from "@/components/PropertyOverview/AgentSection";
import UploadIcButton from "@/components/Booking/UploadIcButton";
import { value } from "lodash/seq";
import Toast from "@/src/utils/Toast";
import RentChargeModal from "@/components/Booking/RentChargeModal";
import moment from "moment";
import RentChargesSection from "@/components/Booking/RentChargesSection";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import * as listingAction from "@/src/actions/listing";
import { useDispatch, useSelector } from "react-redux";
import * as listingSelector from "@/src/selectors/listing";
import LoadingOverlay from "@/components/LoadingOverlay";
import MoveInCostModal from "@/components/PropertyOverview/MoveInCostModal";
import * as commonAction from "@/src/actions/common";
import * as commonSelector from "@/src/selectors/common";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import axios from "axios";
import { NextSeo } from "next-seo";
import RoomPicCarousel from "@/components/PropertyOverview/RoomPicCarousel";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Helper from "@/src/utils/Helper";

export async function getServerSideProps(context) {
  const id = _.get(context, ["params", "slug"], "");

  let listingPropertyDetailData = null;

  try {
    const response = await axios.get(
      `${process.env.API_DOMAIN}/listing/property-details/${id}`,
      { headers: { "Content-Type": "application/json" } },
    );

    listingPropertyDetailData = get(response, ["data", "data"], null);
  } catch (error) {
    console.error("Error fetching listing details:", error);
  }

  return {
    props: {
      id: id,
      listingPropertyDetailData: listingPropertyDetailData,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}

const defaultOption = [{ label: "Not option provided", value: "" }];

const ImageUploading = ({ loading }) => {
  return loading ? (
    <div
      className="flex justify-center items-center absolute"
      style={{
        height: 155,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <span className="loading loading-spinner loading-lg primary-text"></span>
    </div>
  ) : (
    false
  );
};

const Booking = ({ id, listingPropertyDetailData }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const formRef = useRef();
  const dispatch = useDispatch();
  const initialTime = 60;

  // const getListingPropertyDetailRequest = (id) =>
  //   dispatch(listingAction.getListingPropertyDetailRequest(id));
  // const listingPropertyDetailData = useSelector((state) =>
  //   listingSelector.getListingPropertyDetailData(state, id),
  // );
  // const listingPropertyDetailDataLoading = useSelector((state) =>
  //   listingSelector.getListingPropertyDetailDataLoading(state),
  // );

  const getSelectOptionRequest = () =>
    dispatch(commonAction.getSelectOptionRequest());
  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const selectOptionDataLoading = useSelector((state) =>
    commonSelector.getSelectOptionDateLoading(state),
  );

  const [getGalleryLinkLoading, setGetGalleryLinkLoading] = useState(false);
  const [frontIcUploading, setFrontIcUploading] = useState(false);
  const [backIcUploading, setBackIcUploading] = useState(false);
  const [createBookingLoading, setCreateBookingLoading] = useState(false);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);

  const [openCharges, setOpenCharges] = useState(false);
  const [openModalCharges, setOpenModalCharges] = useState(false);
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(
    Array(2),
  );
  const [icFrontBase64, setIcFrontBase64] = useState("");
  const [frontIcData, setFrontIcData] = useState([]);
  const [icBackBase64, setIcBackBase64] = useState("");
  const [backIcData, setBackIcData] = useState([]);
  const [isReadAgree, setIsReadAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [idType, setIdType] = useState("nric");

  const title = listingSelector.getTitle(listingPropertyDetailData);
  const rental = listingSelector.getRental(listingPropertyDetailData);
  const propertyName = listingSelector.getPropertyName(
    listingPropertyDetailData,
  );
  const unitRoomName = listingSelector.getUnitRoomName(
    listingPropertyDetailData,
  );
  const address = listingSelector.getAddress(listingPropertyDetailData);
  const totalMoveInCost = listingSelector.getFeesTotalCostFull(
    listingPropertyDetailData,
  );
  const moveInFees = listingSelector.getMoveInFees(listingPropertyDetailData);
  const tenureOption = listingSelector.getTenureOption(
    listingPropertyDetailData,
  );
  const feesList = listingSelector.getFees(listingPropertyDetailData);

  const countryOption = commonSelector.getCountry(selectOptionData);
  const genderOption = commonSelector.getGender(selectOptionData);
  const idTypeOption = commonSelector.getIdType(selectOptionData);
  const phonePrefix = commonSelector.getPhonePrefix(selectOptionData);
  const nationalityOption = commonSelector.getNationality(selectOptionData);
  const raceOption = commonSelector.getRace(selectOptionData);
  const stateOption = commonSelector.getState(selectOptionData);
  const imageUrl = listingSelector.getImagesUrl(listingPropertyDetailData);

  const [selectedImage, setSelectedImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [tenurePeriod, setTenurePeriod] = useState(
    get(tenureOption[0], ["value"], 0),
  );

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);

  useEffect(() => {
    if (timeLeft > 0 && !isResendEnabled) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setTimeLeft(60);
      setIsResendEnabled(true);
    }
  }, [timeLeft, isResendEnabled]);

  useEffect(() => {
    if (isEmpty(selectOptionData)) {
      fetchSelectOption();
    }
  }, []);

  // useEffect(() => {
  //   fetchListingPropertyDetail(id);
  // }, [id]);

  // const fetchListingPropertyDetail = (id) => {
  //   getListingPropertyDetailRequest(id);
  // };

  const fetchSelectOption = () => {
    getSelectOptionRequest();
  };

  const onClickOpenCharges = () => {
    setOpenCharges(!openCharges);
  };

  const onClickOpenModalCharges = () => {
    setOpenModalCharges(!openModalCharges);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBooking = async () => {
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
      "line",
      "city",
      "postcode",
      "country_code",
      "state_code",
      "emergency_contacts_name_1",
      "emergency_contacts_relationship_1",
      "emergency_contacts_phone_prefix_1",
      "emergency_contacts_phone_suffix_1",
      "emergency_contacts_email_1",
    ];

    forEach(requiredFields, (field) => {
      if (isEmpty(currentForm[field].value)) {
        newErrors[field] = `${currentForm[field].title} is required`;
      }
    });

    const optionalFields = [
      "emergency_contacts_name_2",
      "emergency_contacts_relationship_2",
      "emergency_contacts_phone_suffix_2",
      "emergency_contacts_email_2",
    ];

    const anyFieldNotEmpty = some(
      optionalFields,
      (optionalField) => !isEmpty(currentForm[optionalField].value),
    );

    if (anyFieldNotEmpty) {
      forEach(optionalFields, (optionalField) => {
        if (isEmpty(currentForm[optionalField].value)) {
          newErrors[optionalField] =
            `${currentForm[optionalField].title} is required`;
        }
      });
    }

    setErrorMessage(newErrors);

    if (!isEmpty(newErrors)) {
      return Toast.error("All fields are required.");
    }

    if (
      !includes(currentForm.applicant_email.value, "@") ||
      !includes(currentForm.emergency_contacts_email_1.value, "@") ||
      (!isEmpty(currentForm.emergency_contacts_email_2.value) &&
        !includes(currentForm.emergency_contacts_email_2.value, "@"))
    ) {
      return Toast.error("Email must be include @.");
    }

    if (isEmpty(otpToken)) {
      return Toast.error("You must verify your phone number");
    }

    if (isEmpty(frontIcData) || isEmpty(icBackBase64)) {
      return Toast.error(
        "Please upload the supporting document.(IC or Passport)",
      );
    }

    // if (isEmpty(currentForm.is_pay_partial.value)) {
    //   return Toast.error(
    //     "Please select total move-in cost is pay in full or partial",
    //   );
    // }

    if (!isReadAgree) {
      return Toast.error("Please read understand and agree.");
    }

    const postData = {
      listing_id: id,
      date_from: currentForm.booking_date_from.value,
      date_to: calculateCheckOutDate("YYYY-MM-DD"),
      applicant_id_type: currentForm.applicant_id_type.value,
      applicant_id_value: currentForm.applicant_id_value.value,
      applicant_phone_prefix: currentForm.applicant_area_code.value,
      applicant_phone_suffix: currentForm.applicant_phone_number.value,
      applicant_email: currentForm.applicant_email.value,
      applicant_name: currentForm.applicant_name.value,
      applicant_race: currentForm.applicant_race.value,
      applicant_gender: currentForm.applicant_gender.value,
      applicant_nationality: currentForm.applicant_nationality.value,
      line: currentForm.line.value,
      city: currentForm.city.value,
      postcode: currentForm.postcode.value,
      country_code: currentForm.country_code.value,
      state_code: currentForm.state_code.value,
      emergency_contacts_name_1: currentForm.emergency_contacts_name_1.value,
      emergency_contacts_relationship_1:
        currentForm.emergency_contacts_relationship_1.value,
      emergency_contacts_phone_prefix_1:
        currentForm.emergency_contacts_phone_prefix_1.value,
      emergency_contacts_phone_suffix_1:
        currentForm.emergency_contacts_phone_suffix_1.value,
      emergency_contacts_email_1: currentForm.emergency_contacts_email_1.value,
      emergency_contacts_name_2: currentForm.emergency_contacts_name_2.value,
      emergency_contacts_relationship_2:
        currentForm.emergency_contacts_relationship_2.value,
      emergency_contacts_phone_prefix_2: isEmpty(
        currentForm.emergency_contacts_phone_suffix_2.value,
      )
        ? ""
        : currentForm.emergency_contacts_phone_prefix_2.value,
      emergency_contacts_phone_suffix_2:
        currentForm.emergency_contacts_phone_suffix_2.value,
      emergency_contacts_email_2: currentForm.emergency_contacts_email_2.value,
      id_front: frontIcData,
      id_back: backIcData,
      otp: otpValue,
      otp_token: otpToken,
      is_pay_partial: false,
      fee_items: feesList,
    };

    await apiRequest.postBookingCreateRequest(
      postData,
      setCreateBookingLoading,
      createBookingSuccess,
    );
  };

  const createBookingSuccess = (res) => {
    const url = get(res, ["url"], "");

    if (!isEmpty(url)) {
      window.open(url, "_self");
    }
  };

  const onClickToBookAppointment = (id) => {
    router.push(`/property-overview/${id}/book-appointment`);
  };

  // const onClickAddEmergencyContact = () => {
  //   setEmergencyContactNumber((prevState) =>
  //     concat(prevState, size(emergencyContactNumber)),
  //   );
  // };

  // const onClickRemoveContact = (number) => {
  //   if (size(emergencyContactNumber) !== 1) {
  //     const newArray = pull(
  //       emergencyContactNumber,
  //       size(emergencyContactNumber) - 1,
  //     );
  //     setEmergencyContactNumber((prevState) => union(prevState, newArray));
  //   }
  // };

  const fetchGalleryLink = (image, type) => {
    setGetGalleryLinkLoading(true);

    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");

        Toast.success("Get gallery link success.");
        getGalleryLinkSuccess(url, image, type);
      })
      .catch((err) => Toast.error("Get gallery link failure."))
      .finally(() => setGetGalleryLinkLoading(false));
  };

  const getGalleryLinkSuccess = (url, image, type) => {
    if (isEqual(type, "front")) {
      setFrontIcUploading(true);
    } else {
      setBackIcUploading(true);
    }

    axios
      .put(url, image)
      .then((result) => {
        Toast.success("Image upload success.");
        convertToBase64(type, image, url);
      })
      .catch((err) => Toast.error("Image upload failure."))
      .then(() => {
        if (isEqual(type, "front")) {
          setFrontIcUploading(false);
        } else {
          setBackIcUploading(false);
        }
      });
  };

  const checkImageSize = (image, target) => {
    const isLt2M = image && image.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.error("Image must smaller than 2MB");
      return;
    }

    if (image && image.size > 1) {
      fetchGalleryLink(image, target);
    }
  };

  const onChangeFrontICImage = (value) => {
    const image = value.target.files[0];

    checkImageSize(image, "front");
  };

  const onChangeBackICImage = (value) => {
    const image = value.target.files[0];

    checkImageSize(image, "back");
  };

  const convertToBase64 = (type, image, url) => {
    const name = get(image, ["name"], "");
    const extension = split(name, ".");
    const mimeType = get(image, ["type"], "");

    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEqual(type, "front")) {
          setIcFrontBase64(get(e, ["target", "result"], ""));
          setFrontIcData([
            {
              type: 2,
              name: name,
              extension: extension[1],
              mime_type: mimeType,
              path: url,
            },
          ]);
        } else {
          setIcBackBase64(get(e, ["target", "result"], ""));
          setBackIcData([
            {
              type: 3,
              name: name,
              extension: extension[1],
              mime_type: mimeType,
              path: url,
            },
          ]);
        }
      };
      reader.readAsDataURL(image);
    } else {
      if (isEqual(type, "front")) {
        setIcFrontBase64("");
      } else {
        setIcBackBase64("");
      }
    }
  };

  const onClickReadAgree = () => {
    setIsReadAgree(!isReadAgree);
  };

  const onClickOpenWhatsApp = (contactNumber) => {
    window.open(
      isEmpty(contactNumber)
        ? `https://api.whatsapp.com/send/?text=Hi, I need some help.`
        : `https://api.whatsapp.com/send/?phone=${contactNumber}&text=Hi, I need some help.`,
      "_blank",
    );
  };

  const onClickOpenMoveInCostModal = () => {
    Helper.documentGetElementById("move_in_cost_modal").showModal();
  };

  const onClickGenerateOtp = async () => {
    if (isEmpty(formRef.current.applicant_phone_number.value)) {
      return Toast.error("Phone number is required.");
    }

    const postData = {
      case: "booking_otp_verification",
      destination:
        formRef.current.applicant_area_code.value +
        formRef.current.applicant_phone_number.value,
      type: "tenant",
    };

    await apiRequest.postOtpRequest(
      postData,
      setOtpRequestLoading,
      otpRequestSuccess,
    );
  };

  const otpRequestSuccess = (res) => {
    setIsResendEnabled(false);
    setOtpToken(get(res, ["token"], ""));
  };

  const onChangeOtpValue = (e) => {
    if (size(e.target.value) <= 6) {
      setOtpValue(e.target.value);
    }
  };

  const onChangeIdType = (e) => {
    setIdType(e.target.value);
  };

  const onChangeCheckInDate = (e) => {
    setCheckInDate(e.target.value);
  };

  const onChangeTenurePeriod = (e) => {
    setTenurePeriod(e.target.value);
  };

  const calculateCheckOutDate = (format) => {
    if (!isEmpty(checkInDate)) {
      return moment(checkInDate).add(tenurePeriod, "months").format(format);
    }

    return null;
  };

  const onClickPopupImage = (selectedImage) => {
    setSelectedImage(selectedImage);
    Helper.documentGetElementById("image_modal").showModal();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.booking")}
      hideBgImage
      hideRightButton
      onClickGoBack={onClickGoBack}
    >
      <NextSeo
        title="Booking Form - Spacify Asia"
        openGraph={{
          url: `${process.env.DOMAIN}/booking/${id}`,
          title: isEmpty(title) ? "Spacify Booking" : title,
          description: isEmpty(propertyName) ? "" : propertyName,
          images: isEmpty(imageUrl)
            ? [Images.logoImage]
            : map(imageUrl, (item, index) => {
                return {
                  url: item,
                  width: 800,
                  height: 600,
                  alt: `image ${index + 1}`,
                };
              }),
          siteName: process.env.DOMAIN,
        }}
      />

      <div className="pb-36">
        <div className="global-horizontal-padding pb-3">
          <RoomPicCarousel
            imageUrl={imageUrl}
            onClickPopupImage={onClickPopupImage}
          />

          <CustomText textClassName="primary-text font-bold">
            {isEmpty(title) ? "-" : title}
          </CustomText>

          <CustomText textClassName="font-bold pb-3">
            RM{isEmpty(rental) ? "-" : rental} / Monthly
          </CustomText>

          <CustomText textClassName="font-bold">
            {isEmpty(propertyName) ? "-" : propertyName}
          </CustomText>

          <CustomText textClassName="primary-text font-size-small">
            {isEmpty(unitRoomName) ? "-" : unitRoomName}
          </CustomText>

          <CustomText textClassName="disable-text font-size-xxsmall">
            {isEmpty(address) ? "-" : address}
          </CustomText>
        </div>

        <form ref={formRef} className="grid grid-cols-21">
          <div className="global-horizontal-padding py-3 grid grid-cols-6 gap-2 primaryWhite-bg-color">
            <CustomText textClassName="col-span-4 font-bold">
              Tenancy Period
            </CustomText>
            <BookingDateInput
              bgColor="primaryWhite-bg-color"
              className="col-span-3"
              placeholder="12/02/2023"
              title="Check in date"
              name="booking_date_from"
              errorMessage={errorMessage.booking_date_from}
              onChange={onChangeCheckInDate}
              required
            />

            <BookingInput
              required
              disabled
              bgColor="primaryWhite-bg-color"
              className="col-span-3"
              title="Check out date"
              value={
                isEmpty(calculateCheckOutDate("DD/MM/YYYY"))
                  ? "Please select check in date"
                  : calculateCheckOutDate("DD/MM/YYYY")
              }
            />

            <BookingSelect
              className="col-span-6"
              bgColor="primaryWhite-bg-color"
              placeholder="Tenure Period"
              title="Tenure Period"
              lists={isEmpty(tenureOption) ? defaultOption : tenureOption}
              name="tenure_period"
              errorMessage={errorMessage.tenure_period}
              required
              onChange={onChangeTenurePeriod}
            />
          </div>

          <div className="global-horizontal-padding py-3 grid grid-cols-6 gap-2">
            <CustomText textClassName="col-span-6 font-bold">
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
              lists={isEmpty(idTypeOption) ? defaultOption : idTypeOption}
              name="applicant_id_type"
              errorMessage={errorMessage.applicant_id_type}
              onChange={onChangeIdType}
              required
            />

            <BookingInput
              className="col-span-4"
              type={"text"}
              placeholder={
                isEqual(idType, "nric")
                  ? "XXXXXXXXXXXX"
                  : isEqual(idType, "passport")
                    ? "AXXXXXXXX"
                    : "ID Number"
              }
              title={"ID Number"}
              name="applicant_id_value"
              errorMessage={errorMessage.applicant_id_value}
              maxLength={
                isEqual(idType, "nric")
                  ? 12
                  : isEqual(idType, "passport")
                    ? 14
                    : 20
              }
              required
            />

            <BookingSelect
              className="col-span-6"
              placeholder="Select Race"
              title="Race"
              name="applicant_race"
              lists={isEmpty(raceOption) ? defaultOption : raceOption}
              errorMessage={errorMessage.applicant_race}
              required
            />

            <BookingSelect
              className="col-span-6"
              placeholder="Select Gender"
              title="Gender"
              lists={isEmpty(genderOption) ? defaultOption : genderOption}
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
              lists={isEmpty(phonePrefix) ? defaultOption : phonePrefix}
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
              lists={
                isEmpty(nationalityOption) ? defaultOption : nationalityOption
              }
              name="applicant_nationality"
              errorMessage={errorMessage.applicant_nationality}
              required
            />

            {/*<BookingSelect*/}
            {/*    className="col-span-6"*/}
            {/*    placeholder="Select Occupation"*/}
            {/*    title="Occupation"*/}
            {/*    lists={*/}
            {/*      isEmpty([]) ? defaultOption : []*/}
            {/*    }*/}
            {/*    name=""*/}
            {/*    errorMessage={errorMessage.applicant_occupation}*/}
            {/*    required*/}
            {/*/>*/}

            {/*<BookingInput*/}
            {/*    className="col-span-6"*/}
            {/*    placeholder="Company Name / College Name"*/}
            {/*    title="Company Name / College Name"*/}
            {/*    name=""*/}
            {/*    // errorMessage={errorMessage.applicant_phone_number}*/}
            {/*    required*/}
            {/*/>*/}
          </div>

          <div className="global-horizontal-padding py-3 grid grid-cols-6 gap-2 primaryWhite-bg-color">
            <CustomText textClassName="col-span-6 font-bold">
              Address Information
            </CustomText>

            <BookingInput
              bgColor="primaryWhite-bg-color"
              className="col-span-6"
              placeholder="Your Address"
              title="Your Address"
              name="line"
              errorMessage={errorMessage.line}
              required
            />

            <BookingInput
              bgColor="primaryWhite-bg-color"
              className="col-span-3"
              placeholder="City"
              title="City"
              name="city"
              errorMessage={errorMessage.city}
              required
            />

            <BookingInput
              bgColor="primaryWhite-bg-color"
              className="col-span-3"
              placeholder="Postcode"
              title="PostCode"
              name="postcode"
              errorMessage={errorMessage.postcode}
              required
            />

            <BookingSelect
              bgColor="primaryWhite-bg-color"
              className="col-span-3"
              placeholder="Select Country"
              title="Country"
              lists={isEmpty(countryOption) ? defaultOption : countryOption}
              name="country_code"
              errorMessage={errorMessage.country_code}
              required
            />

            <BookingSelect
              bgColor="primaryWhite-bg-color"
              className="col-span-3"
              placeholder="Select State"
              title="State"
              lists={isEmpty(stateOption) ? defaultOption : stateOption}
              name="state_code"
              errorMessage={errorMessage.state_code}
              required
            />
          </div>

          <div className="global-horizontal-padding py-3 grid grid-cols-6 gap-2">
            <CustomText textClassName="col-span-6 font-bold">
              Emergency Contact Information
            </CustomText>

            {map(emergencyContactNumber, (item, index) => {
              return (
                <div
                  className="col-span-6 grid grid-cols-6 gap-2 pt-2"
                  key={index}
                >
                  <CustomText textClassName="font-bold col-span-3">
                    {`Contact ${index + 1} ${index + 1 == 2 ? "(Optional)" : ""}`}
                  </CustomText>

                  {/*{index === 0 && size(emergencyContactNumber) !== 1 ? (*/}
                  {/*  <div*/}
                  {/*    className="col-span-3 cursor-pointer flex justify-end"*/}
                  {/*    onClick={() => onClickRemoveContact(index)}*/}
                  {/*  >*/}
                  {/*    <CustomText textClassName="error-text">Remove</CustomText>*/}
                  {/*  </div>*/}
                  {/*) : (*/}
                  {/*  false*/}
                  {/*)}*/}

                  <BookingInput
                    className="col-span-6"
                    placeholder="your Name"
                    title="Your Name"
                    name={`emergency_contacts_name_${index + 1}`}
                    errorMessage={
                      errorMessage[`emergency_contacts_name_${index + 1}`]
                    }
                    required={index === 0}
                  />

                  <BookingInput
                    className="col-span-6"
                    placeholder="Enter Relationship"
                    title="Enter Relationship"
                    name={`emergency_contacts_relationship_${index + 1}`}
                    errorMessage={
                      errorMessage[
                        `emergency_contacts_relationship_${index + 1}`
                      ]
                    }
                    required={index === 0}
                  />

                  <BookingSelect
                    className="col-span-2"
                    placeholder="Select Area Code"
                    title="Area Code"
                    lists={isEmpty(phonePrefix) ? defaultOption : phonePrefix}
                    name={`emergency_contacts_phone_prefix_${index + 1}`}
                    errorMessage={
                      errorMessage[
                        `emergency_contacts_phone_prefix_${index + 1}`
                      ]
                    }
                    required={index === 0}
                  />

                  <BookingInput
                    className="col-span-4"
                    type="number"
                    placeholder="Phone Number"
                    title="Phone Number"
                    name={`emergency_contacts_phone_suffix_${index + 1}`}
                    errorMessage={
                      errorMessage[
                        `emergency_contacts_phone_suffix_${index + 1}`
                      ]
                    }
                    required={index === 0}
                  />

                  <BookingInput
                    className="col-span-6"
                    placeholder="Your Email"
                    title="Your Email"
                    name={`emergency_contacts_email_${index + 1}`}
                    errorMessage={
                      errorMessage[`emergency_contacts_email_${index + 1}`]
                    }
                    required={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </form>
        {/*<CustomButton*/}
        {/*  buttonText={"+ Add Contact"}*/}
        {/*  buttonClassName="col-span-6 primary-btn"*/}
        {/*  onClick={onClickAddEmergencyContact}*/}
        {/*/>*/}

        <div className="grid">
          <div className="global-horizontal-padding pt-3 pb-4 grid grid-cols-6 gap-2 primaryWhite-bg-color">
            <CustomText textClassName="col-span-6 font-bold">
              Verification
            </CustomText>

            <BookingInput
              bgColor="primaryWhite-bg-color"
              className="col-span-6"
              value={otpValue}
              placeholder="000000"
              onChange={onChangeOtpValue}
              type="number"
              title="Code"
              name="otp"
              errorMessage={errorMessage.otp}
              required
            />

            <CustomButton
              buttonText={
                isResendEnabled
                  ? "Send Code"
                  : `Resend OTP in ${timeLeft} seconds`
              }
              buttonClassName={`${isResendEnabled ? "primary-btn" : "disable-btn"} col-span-6`}
              onClick={onClickGenerateOtp}
              loading={otpRequestLoading}
              disable={otpRequestLoading || !isResendEnabled}
            />
          </div>

          <div className="global-horizontal-padding py-3 grid grid-cols-6 gap-2">
            <CustomText textClassName="col-span-6 font-bold">
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
              <div className="relative">
                <ImageUploading loading={frontIcUploading} />

                <CustomImage
                  src={isEmpty(icFrontBase64) ? Images.icFront : icFrontBase64}
                  imageStyle={{
                    width: "100%",
                    height: 155,
                    objectFit: "contain",
                  }}
                />
              </div>

              <UploadIcButton
                name="front_image"
                icon={Images.uploadIcon}
                buttonText="Front Image"
                buttonClassName="primary-btn flex-row-reverse mt-1 w-full"
                onChangeImage={onChangeFrontICImage}
                onClickSelectImage={() =>
                  Helper.documentGetElementById("front_image").click()
                }
              />
            </div>
            <div className="col-span-3 flex flex-col items-center">
              <div className="relative">
                <ImageUploading loading={backIcUploading} />

                <CustomImage
                  src={isEmpty(icBackBase64) ? Images.icBack : icBackBase64}
                  imageStyle={{
                    width: "100%",
                    height: 155,
                    objectFit: "contain",
                  }}
                />
              </div>

              <UploadIcButton
                name="back_image"
                icon={Images.uploadIcon}
                buttonText="Back Image"
                buttonClassName="primary-btn flex-row-reverse mt-1 w-full"
                onChangeImage={onChangeBackICImage}
                onClickSelectImage={() =>
                  Helper.documentGetElementById("back_image").click()
                }
              />
            </div>
          </div>

          <div className="global-horizontal-padding py-3 grid grid-cols-6 gap-2">
            <RentChargesSection
              openCharges={openCharges}
              onClickOpenCharges={onClickOpenCharges}
              moveInFees={moveInFees}
              title={title}
            />
          </div>

          <div className="global-horizontal-padding pt-3 grid grid-cols-6 gap-2">
            <div className="col-span-6 flex items-start px-2">
              <CustomImage
                src={isReadAgree ? Images.checkGreenIcon : Images.uncheckIcon}
                width={23}
                height={23}
                onClick={onClickReadAgree}
                className="cursor-pointer"
              />
              <CustomText textClassName="pl-3 font-bold disable-text">
                I understand and agree to give Spacify and CTOS the consent to
                process my personal data as per PDPA Act.
              </CustomText>
            </div>
          </div>

          <div className="global-horizontal-padding pt-3 grid grid-cols-6 gap-2">
            <CustomText textClassName="col-span-6 font-light font-size-xsmall">
              This site is protected by reCAPTCHA and the Google{" "}
              <span style={{ textDecoration: "underline" }}>
                Privacy Policy
              </span>{" "}
              and{" "}
              <span style={{ textDecoration: "underline" }}>
                Terms of Service
              </span>{" "}
              apply.
            </CustomText>
          </div>
        </div>

        <AgentSection
          t={t}
          data={listingPropertyDetailData}
          onClickBooking={onClickBooking}
          onClickToBookAppointment={onClickToBookAppointment}
          totalMoveInCost={totalMoveInCost}
          onClickOpenWhatsApp={onClickOpenWhatsApp}
          onClickOpenMoveInCostModal={onClickOpenMoveInCostModal}
        />

        <RentChargeModal />

        <MoveInCostModal
          openCharges={openModalCharges}
          onClickOpenModalCharges={onClickOpenModalCharges}
          lists={moveInFees}
        />

        <ImageModal data={selectedImage} />

        <LoadingOverlay
          loading={selectOptionDataLoading || getGalleryLinkLoading}
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
