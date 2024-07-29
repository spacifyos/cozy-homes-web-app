import { useEffect, useRef, useState } from "react";
import Helper from "@/src/utils/Helper";
import { isEmpty, toString } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import AuthWrapper from "@/components/AuthWrapper";

export { getServerSideProps };

const Chat = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const bottomNavigateHeight =
    Helper.documentGetElementById("bottom_navbar").offsetHeight;

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);
  const uuid = authSelector.getUuid(userProfileData);

  const secretKey = "9e768f0a4e66137d389cbe12c0060a28";
  const src =
    "https://app.proptechai.bot/js/widget/8fbmuzfis3duu3i4/embed.js?id=embed_chatbot_container_id";

  const encryptUserId = toString(CryptoJS.HmacSHA256(uuid, secretKey));

  useEffect(() => {
    const handleChatbotReady = () => {
      window.$chatbot.setUser(uuid, {
        name: name,
        email: email,
        phone_number: phoneNumber,
        identifier_hash: encryptUserId,
      });
    };

    window.addEventListener("chatbot:ready", handleChatbotReady);

    // return () => {
    //   window.removeEventListener("chatbot:ready", handleChatbotReady);
    // };
  }, [uuid]);

  useEffect(() => {
    const checkScript = Helper.documentGetElementById(src);
    const chatContainer = Helper.documentGetElementById("chat-container");
    const script = document.createElement("script");

    script.id = src;
    script.async = true;
    script.defer = true;
    script.src = src;

    if (checkScript) {
      return router.reload();
    }

    if (!isEmpty(phoneNumber)) {
      chatContainer.appendChild(script);
    }
  }, [phoneNumber]);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  return (
    <div id="chat-container">
      <div
        id="embed_chatbot_container_id"
        style={{
          height:
            visualViewport.height * visualViewport.scale - bottomNavigateHeight,
          width: "100%",
          maxWidth: 500,
          position: "fixed",
        }}
      ></div>

      <LoadingOverlay loading={userProfileLoading} />
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(Chat));
