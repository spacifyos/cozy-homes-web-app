import { useEffect, useRef, useState } from "react";
import Helper from "@/src/utils/Helper";
import { get, isEmpty, toString } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import AuthWrapper from "@/components/AuthWrapper";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as tenancySelector from "@/src/selectors/tenancy";

export { getServerSideProps };

const Chat = () => {
  const router = useRouter();

  const [userProfileData, setUserProfileData] = useState(false);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  const [uChatIsReady, setUChatIsReady] = useState(false);

  // const bottomNavigateHeight =
  //   Helper.documentGetElementById("bottom_navbar").offsetHeight;

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);
  const uuid = authSelector.getUuid(userProfileData);
  const propertyDetails = get(userProfileData, ["property_details", 0], []);

  const tenancyCode = tenancySelector.getTenancyCode(propertyDetails[0]);
  const tenancyStatus = tenancySelector.getStatus(propertyDetails[0]);
  const propertyName = get(propertyDetails[0], ["property_name"], "");
  const unitName = get(propertyDetails[0], ["unit_name"], "");
  const roomName = get(propertyDetails[0], ["room_name"], "");
  const tenancyPeriod = tenancySelector.getTenancyPeriod(propertyDetails[0]);
  const totalDays = tenancySelector.getTotalDays(propertyDetails[0]);
  const tenancyRemaining = tenancySelector.getTenancyRemainingDay(
    propertyDetails[0],
  );
  const rental = tenancySelector.getInitialRentalFee(propertyDetails[0]);

  const secretKey = "9e768f0a4e66137d389cbe12c0060a28";
  const src = `https://app.proptechai.bot/js/widget/8fbmuzfis3duu3i4/full.js?ref=main_menu--${phoneNumber}--${tenancyCode}--${tenancyStatus}--${propertyName}--${unitName}--${roomName}--${tenancyPeriod}--${totalDays}--${tenancyRemaining}--${rental}`;

  const encryptUserId = toString(CryptoJS.HmacSHA256(uuid, secretKey));

  useEffect(() => {
    const checkScript = Helper.documentGetElementById(src);
    const chatContainer = document.body;
    const script = document.createElement("script");

    if (checkScript) {
      return router.reload();
    }

    script.id = src;
    script.async = true;
    script.defer = true;
    script.src = src;

    if (!isEmpty(userProfileData)) {
      chatContainer.appendChild(script);

      setTimeout(() => {
        setUChatIsReady(true);
      }, 1000);
    }
  }, [userProfileData, window]);

  useEffect(() => {
    if (uChatIsReady) {
      const handleChatbotReady = () => {
        window.$chatbot.setUser(uuid, {
          name: name,
          email: email,
          phone_number: phoneNumber,
          identifier_hash: encryptUserId,
        });
      };

      window.addEventListener("chatbot:ready", handleChatbotReady);
      setUChatIsReady(false);
    }
  }, [uChatIsReady]);

  // useEffect(() => {
  //   if (!isEmpty(propertyDetails)) {
  //     const handleSetAttribute = () => {
  //       window.$chatbot.setCustomAttributes({
  //         user_fields: {
  //           tenant_property_info: JSON.stringify(propertyDetails[0]),
  //         },
  //       });
  //     };
  //
  //     window.addEventListener("chatbot:ready", handleSetAttribute);
  //   }
  // }, [propertyDetails]);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = async () => {
    await apiRequest.getUChatUserRequest(
      setUserProfileLoading,
      getUserSuccessCallback,
    );
  };

  const getUserSuccessCallback = (res) => {
    setUserProfileData(res);
  };

  return (
    <div id="chat-container">
      {/*<div*/}
      {/*  id="embed_chatbot_container_id"*/}
      {/*  style={{*/}
      {/*    height:*/}
      {/*      visualViewport.height * visualViewport.scale - bottomNavigateHeight,*/}
      {/*    width: "100%",*/}
      {/*    maxWidth: 500,*/}
      {/*    position: "fixed",*/}
      {/*  }}*/}
      {/*></div>*/}

      <LoadingOverlay loading={userProfileLoading} />
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(Chat));
