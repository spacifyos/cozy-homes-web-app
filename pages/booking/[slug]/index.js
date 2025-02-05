import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CustomText from "@/components/CustomText";
import {
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
import { value } from "lodash/seq";
import Toast from "@/src/utils/Toast";
import RentChargeModal from "@/components/Booking/RentChargeModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as listingSelector from "@/src/selectors/listing";
import MoveInCostModal from "@/components/PropertyOverview/MoveInCostModal";
import * as commonAction from "@/src/actions/common";
import * as commonSelector from "@/src/selectors/common";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import axios from "axios";
import { NextSeo } from "next-seo";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import Helper from "@/src/utils/Helper";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopPriceSection from "@/components/Booking/DesktopPriceSection";
import DesktopFormSection from "@/components/Booking/DesktopFormSection";
import AuthManager from "@/src/utils/AuthManager";
import CustomImage from "@/components/CustomImage";

export async function getServerSideProps(context) {
  const id = get(context, ["params", "slug"], "");

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
    },
  };
}

const defaultOption = [{ label: "Not option provided", value: "" }];

const Booking = ({ id, listingPropertyDetailData }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const formRef = useRef();
  const dateFormRef = useRef();
  const dispatch = useDispatch();
  const initialTime = 60;

  const queryReferralCode = get(router, ["query", "referral_code"], "");

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
  const [openImageModal, setOpenImageModal] = useState(false);

  const [openFirstMonthCharges, setOpenFirstMonthCharges] = useState(false);
  const [openLastMonthCharges, setOpenLastMonthCharges] = useState(false);
  const [openModalFirstMonthCharges, setOpenFirstMonthModalCharges] =
    useState(false);
  const [openModalLastMonthCharges, setOpenModalLastMonthCharges] =
    useState(false);
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(
    Array(1),
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
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isZeroDeposit, setIsZeroDeposit] = useState("true");
  const [referralCodeValue, setReferralCodeValue] = useState("");

  const bedType = listingSelector.getBedType(listingPropertyDetailData);
  const bathroom = listingSelector.getBathroom(listingPropertyDetailData);
  const squareFeet = listingSelector.getSquareFeet(listingPropertyDetailData);
  const title = listingSelector.getTitle(listingPropertyDetailData);
  const rental = listingSelector.getRental(listingPropertyDetailData);
  const propertyName = listingSelector.getPropertyName(
    listingPropertyDetailData,
  );
  const unitRoomName = listingSelector.getUnitRoomName(
    listingPropertyDetailData,
  );
  const address = listingSelector.getAddress(listingPropertyDetailData);
  const moveInFees = listingSelector.getMoveInFees(listingPropertyDetailData);
  const tenureOption = listingSelector.getTenureOption(
    listingPropertyDetailData,
  );
  const feesList = listingSelector.getFees(listingPropertyDetailData);
  const isAllowedZeroDeposit = listingSelector.isAllowedZeroDeposit(
    listingPropertyDetailData,
  );
  const rentalWithSecurityDeposit =
    listingSelector.getRentalWithSecurityDeposit(listingPropertyDetailData);

  const normalItems = listingSelector.getItems(moveInFees);
  const zeroDepositItems = listingSelector.getItemsWithZeroDeposit(moveInFees);
  const securityDepositItems =
    listingSelector.getItemsWithSecurityDeposit(moveInFees);

  const countryOption = commonSelector.getCountry(selectOptionData);
  const genderOption = commonSelector.getGender(selectOptionData);
  const idTypeOption = commonSelector.getIdType(selectOptionData);
  const phonePrefix = commonSelector.getPhonePrefix(selectOptionData);
  const nationalityOption = commonSelector.getNationality(selectOptionData);
  const raceOption = commonSelector.getRace(selectOptionData);
  const stateOption = commonSelector.getState(selectOptionData);
  const occupationOption = commonSelector.getOccupation(selectOptionData);
  const picName = listingSelector.getPicName(listingPropertyDetailData);

  const imageUrl = listingSelector.getImagesUrl(listingPropertyDetailData);

  const [selectedImage, setSelectedImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [tenurePeriod, setTenurePeriod] = useState(
    get(tenureOption[0], ["value"], 0),
  );

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [targetItems, setTargetItems] = useState(normalItems);

  const targetRental = isEqual(isZeroDeposit, "true")
    ? rental
    : rentalWithSecurityDeposit;
  const totalMoveInCost = listingSelector.getTotalCostFull(targetItems);

  useEffect(() => {
    if (!isAllowedZeroDeposit) {
      setTargetItems(normalItems);
    } else {
      if (isEqual(isZeroDeposit, "true")) {
        setTargetItems(zeroDepositItems);
      } else {
        setTargetItems(securityDepositItems);
      }
    }
  }, [isZeroDeposit]);

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

  useEffect(() => {
    const checkLocationStorageReferralCode = async () => {
      const LocationStorageReferralCode =
        await AuthManager.retrieveReferralCode();

      if (!isEmpty(queryReferralCode)) {
        setReferralCodeValue(queryReferralCode);
        return;
      } else if (!isEmpty(LocationStorageReferralCode)) {
        setReferralCodeValue(LocationStorageReferralCode);
        return;
      }
    };

    checkLocationStorageReferralCode();
  }, [queryReferralCode]);

  // const fetchListingPropertyDetail = (id) => {
  //   getListingPropertyDetailRequest(id);
  // };

  const fetchSelectOption = () => {
    getSelectOptionRequest();
  };

  const onClickOpenFirstMonthCharges = () => {
    setOpenFirstMonthCharges(!openFirstMonthCharges);
  };

  const onClickOpenLastMonthCharges = () => {
    setOpenLastMonthCharges(!openLastMonthCharges);
  };

  const onClickOpenModalFirstMonthCharges = () => {
    setOpenFirstMonthModalCharges(!openModalFirstMonthCharges);
  };

  const onClickOpenModalLastMonthCharges = () => {
    setOpenModalLastMonthCharges(!openModalLastMonthCharges);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBooking = async () => {
    const currentForm = formRef && formRef.current;
    const dateForm = dateFormRef && dateFormRef.current;
    const newErrors = {};

    const requiredFields = [
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
      "occupation_type",
      "institution_name",
      "emergency_contacts_name_1",
      "emergency_contacts_relationship_1",
      "emergency_contacts_phone_prefix_1",
      "emergency_contacts_phone_suffix_1",
      "emergency_contacts_email_1",
    ];

    forEach(["booking_date_from", "tenure_period"], (field) => {
      if (isEmpty(dateForm[field].value)) {
        newErrors[field] = `${dateForm[field].title} is required`;
      }
    });

    forEach(requiredFields, (field) => {
      if (isEmpty(currentForm[field].value)) {
        newErrors[field] = `${currentForm[field].title} is required`;
      }
    });

    // const optionalFields = [
    //   "emergency_contacts_name_2",
    //   "emergency_contacts_relationship_2",
    //   "emergency_contacts_phone_suffix_2",
    //   "emergency_contacts_email_2",
    // ];
    //
    // const anyFieldNotEmpty = some(
    //   optionalFields,
    //   (optionalField) => !isEmpty(currentForm[optionalField].value),
    // );
    //
    // if (anyFieldNotEmpty) {
    //   forEach(optionalFields, (optionalField) => {
    //     if (isEmpty(currentForm[optionalField].value)) {
    //       newErrors[optionalField] =
    //         `${currentForm[optionalField].title} is required`;
    //     }
    //   });
    // }

    setErrorMessage(newErrors);

    if (!isEmpty(newErrors)) {
      return Toast.error("All fields are required.");
    }

    if (
      !includes(currentForm.applicant_email.value, "@") ||
      !includes(currentForm.emergency_contacts_email_1.value, "@")
      // (!isEmpty(currentForm.emergency_contacts_email_2.value) &&
      //   !includes(currentForm.emergency_contacts_email_2.value, "@"))
    ) {
      return Toast.error("Email must be include @.");
    }

    if (isEmpty(otpToken)) {
      return Toast.error("You must verify your phone number");
    }

    if (isEmpty(isZeroDeposit)) {
      return Toast.error("You must select zero deposit solution.");
    }

    if (isEmpty(frontIcData) || isEmpty(icBackBase64)) {
      return Toast.error(
        "Please upload the supporting document.(IC or Passport)",
      );
    }

    if (isEmpty(paymentAmount)) {
      return Toast.error(
        "Please select total move-in cost is pay in full or partial",
      );
    }

    if (!isReadAgree) {
      return Toast.error("Please read understand and agree.");
    }

    const postData = {
      listing_id: id,
      date_from: dateForm.booking_date_from.value,
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
      occupation_type: currentForm.occupation_type.value,
      institution_name: currentForm.institution_name.value,
      emergency_contacts_name_1: currentForm.emergency_contacts_name_1.value,
      emergency_contacts_relationship_1:
        currentForm.emergency_contacts_relationship_1.value,
      emergency_contacts_phone_prefix_1:
        currentForm.emergency_contacts_phone_prefix_1.value,
      emergency_contacts_phone_suffix_1:
        currentForm.emergency_contacts_phone_suffix_1.value,
      emergency_contacts_email_1: currentForm.emergency_contacts_email_1.value,
      // emergency_contacts_name_2: currentForm.emergency_contacts_name_2.value,
      // emergency_contacts_relationship_2:
      //   currentForm.emergency_contacts_relationship_2.value,
      // emergency_contacts_phone_prefix_2: isEmpty(
      //   currentForm.emergency_contacts_phone_suffix_2.value,
      // )
      //   ? ""
      //   : currentForm.emergency_contacts_phone_prefix_2.value,
      // emergency_contacts_phone_suffix_2:
      //   currentForm.emergency_contacts_phone_suffix_2.value,
      // emergency_contacts_email_2: currentForm.emergency_contacts_email_2.value,
      id_front: frontIcData,
      id_back: backIcData,
      otp: otpValue,
      otp_token: otpToken,
      is_pay_partial: isEqual(paymentAmount, "true") ? true : false,
      fee_items: feesList,
      ...(isAllowedZeroDeposit
        ? { is_zero_deposit: isEqual(isZeroDeposit, "true") ? true : false }
        : {}),
      referral_code: referralCodeValue,
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
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getGalleryLinkSuccess(url, image, type, path);
      })
      .catch((err) => Toast.error("Get gallery link failure."))
      .finally(() => setGetGalleryLinkLoading(false));
  };

  const getGalleryLinkSuccess = (url, image, type, path) => {
    if (isEqual(type, "front")) {
      setFrontIcUploading(true);
    } else {
      setBackIcUploading(true);
    }

    axios
      .put(url, image)
      .then((result) => {
        Toast.success("Image upload success.");
        convertToBase64(type, image, path);
      })
      .catch((err) => Toast.error("Image upload failure."))
      .finally(() => {
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

  const convertToBase64 = (type, image, path) => {
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
              path: path,
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
              path: path,
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
      return moment(checkInDate)
        .add(tenurePeriod, "months")
        .subtract(1, "days")
        .format(format);
    }

    return null;
  };

  const onClickPopupImage = (selectedImage) => {
    setSelectedImage(selectedImage);
    setOpenImageModal(true);
  };

  const onClickCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const onClickSelectPaymentAmount = (e) => {
    setPaymentAmount(e.target.value);
  };

  const onClickSelectIsZeroDeposit = (e) => {
    setIsZeroDeposit(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo
        title={`${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName} | Spacify.asia`}
        description={`${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName}. Learn more about this ${isEmpty(bathroom) ? "-" : bathroom} bathroom, ${isEmpty(bedType) ? "-" : bedType} bedroom, ${isEmpty(squareFeet) ? "-" : squareFeet} Sqft Room at ${process.env.DOMAIN}.`}
        canonical={`${process.env.DOMAIN}/booking/${id}`}
        openGraph={{
          url: `${process.env.DOMAIN}/booking/${id}`,
          title: `${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName} | Spacify.asia`,
          description: `${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName}. Learn more about this ${isEmpty(bathroom) ? "-" : bathroom} bathroom, ${isEmpty(bedType) ? "-" : bedType} bedroom, ${isEmpty(squareFeet) ? "-" : squareFeet} Sqft Room at ${process.env.DOMAIN}.`,
          images: isEmpty(imageUrl)
            ? [
                {
                  url: Images.logoImage,
                  width: 800,
                  height: 600,
                  alt: `${propertyName} Image`,
                },
              ]
            : map(imageUrl, (item, index) => {
                return {
                  url: item,
                  width: 800,
                  height: 600,
                  alt: `${propertyName} image ${index + 1}`,
                };
              }),
          siteName: `${process.env.DOMAIN}/booking/${id}`,
        }}
      />

      <DesktopLayout
        hideNav
        loading={
          selectOptionDataLoading ||
          getGalleryLinkLoading ||
          createBookingLoading
        }
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/"}>
                    <CustomText textClassName="text-base text-disable">
                      Explore
                    </CustomText>
                  </a>
                </li>
                <li>
                  <a href={"/search"}>
                    <CustomText textClassName="text-base text-disable">
                      Room Listing
                    </CustomText>
                  </a>
                </li>
                <li>
                  <a href={`/property-overview/${id}`}>
                    <CustomText textClassName="text-base text-disable">
                      {propertyName}
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base">Booking</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">Booking</CustomText>
            </div>
          </div>
        }
      >
        <div className="container mx-auto flex-1 pb-6">
          <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-4 gap-5">
            <DesktopPriceSection
              dateFormRef={dateFormRef}
              targetRental={targetRental}
              propertyName={propertyName}
              unitRoomName={unitRoomName}
              address={address}
              errorMessage={errorMessage}
              onChangeCheckInDate={onChangeCheckInDate}
              calculateCheckOutDate={calculateCheckOutDate}
              tenureOption={tenureOption}
              defaultOption={defaultOption}
              onChangeTenurePeriod={onChangeTenurePeriod}
              isAllowedZeroDeposit={isAllowedZeroDeposit}
              isZeroDeposit={isZeroDeposit}
              onClickSelectIsZeroDeposit={onClickSelectIsZeroDeposit}
              totalMoveInCost={totalMoveInCost}
              openFirstMonthCharges={openFirstMonthCharges}
              onClickOpenFirstMonthCharges={onClickOpenFirstMonthCharges}
              openLastMonthCharges={openLastMonthCharges}
              onClickOpenLastMonthCharges={onClickOpenLastMonthCharges}
              moveInFees={targetItems}
              title={title}
              onClickSelectPaymentAmount={onClickSelectPaymentAmount}
            />

            <DesktopFormSection
              emergencyContactNumber={emergencyContactNumber}
              errorMessage={errorMessage}
              idTypeOption={idTypeOption}
              defaultOption={defaultOption}
              onChangeIdType={onChangeIdType}
              idType={idType}
              raceOption={raceOption}
              genderOption={genderOption}
              phonePrefix={phonePrefix}
              nationalityOption={nationalityOption}
              occupationOption={occupationOption}
              countryOption={countryOption}
              stateOption={stateOption}
              otpValue={otpValue}
              onChangeOtpValue={onChangeOtpValue}
              isResendEnabled={isResendEnabled}
              timeLeft={timeLeft}
              onClickGenerateOtp={onClickGenerateOtp}
              otpRequestLoading={otpRequestLoading}
              frontIcUploading={frontIcUploading}
              icFrontBase64={icFrontBase64}
              onChangeFrontICImage={onChangeFrontICImage}
              backIcUploading={backIcUploading}
              icBackBase64={icBackBase64}
              onChangeBackICImage={onChangeBackICImage}
              isReadAgree={isReadAgree}
              onClickReadAgree={onClickReadAgree}
              onClickBooking={onClickBooking}
              setReferralCodeValue={setReferralCodeValue}
              referralCodeValue={referralCodeValue}
              formRef={formRef}
            />
          </div>
        </div>
      </DesktopLayout>

      <RentChargeModal />

      <MoveInCostModal
        openModalFirstMonthCharges={openModalFirstMonthCharges}
        openModalLastMonthCharges={openModalLastMonthCharges}
        onClickOpenModalFirstMonthCharges={onClickOpenModalFirstMonthCharges}
        onClickOpenModalLastMonthCharges={onClickOpenModalLastMonthCharges}
        lists={targetItems}
      />

      <ImageModal
        data={imageUrl}
        selectedImage={selectedImage}
        onClickCloseImageModal={onClickCloseImageModal}
        openImageModal={openImageModal}
      />
    </div>
  );
};

export default withTranslation("common")(Booking);
