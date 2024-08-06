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
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

export { getServerSideProps };

const OwnerChat = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userProfileData, setUserProfileData] = useState(false);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  const [uChatIsReady, setUChatIsReady] = useState(false);

  const bottomNavigateHeight =
    Helper.documentGetElementById("bottom_navbar").offsetHeight;

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);
  const uuid = authSelector.getUuid(userProfileData);
  const propertyDetails = get(userProfileData, ["property_details"], []);

  const secretKey = "f9de772e2cdbb19af4e7c7c6627c6e8d";
  const src = "https://app.proptechai.bot/js/widget/vza3qkxeepbyzkuu/full.js";
  const checkScript = Helper.documentGetElementById(src);

  const encryptUserId = toString(CryptoJS.HmacSHA256(uuid, secretKey));

  useEffect(() => {
    if (checkScript) {
      return router.reload();
    }
  }, []);

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

  useEffect(() => {
    if (!isEmpty(propertyDetails)) {
      const handleSetAttribute = () => {
        window.$chatbot.setCustomAttributes({
          user_fields: {
            tenant_property_info: JSON.stringify(propertyDetails[0]),
          },
        });
      };

      window.addEventListener("chatbot:ready", handleSetAttribute);
    }
  }, [propertyDetails]);

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
    handleGenerateUChat();
  };

  const handleGenerateUChat = () => {
    const chatContainer = document.body;
    const script = document.createElement("script");

    script.id = src;
    script.async = true;
    script.defer = true;
    script.src = src;

    chatContainer.appendChild(script);

    setTimeout(() => {
      setUChatIsReady(true);
    }, 1000);
  };

  return (
    <div id="chat-container">
      {/*<div*/}
      {/*  id="embed_owner_chatbot_container_id"*/}
      {/*  style={{*/}
      {/*    height:*/}
      {/*      visualViewport.height * visualViewport.scale - bottomNavigateHeight,*/}
      {/*    width: "100%",*/}
      {/*    maxWidth: 500,*/}
      {/*    position: "fixed",*/}
      {/*  }}*/}
      {/*></div>*/}

      <LoadingOverlay loading={userProfileLoading || !uChatIsReady} />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerChat));
