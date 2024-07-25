import { useEffect, useRef, useState } from "react";
import Helper from "@/src/utils/Helper";
import _, { isEmpty, toString } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import CustomText from "@/components/CustomText";
import LoadingOverlay from "@/components/LoadingOverlay";
import CryptoJS from "crypto-js";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";

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

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);

  const secretKey = "9e768f0a4e66137d389cbe12c0060a28";
  const src =
    "https://app.proptechai.bot/js/widget/8fbmuzfis3duu3i4/embed.js?id=embed_chatbot_container_id";

  const encryptUserId = toString(CryptoJS.HmacSHA256(phoneNumber, secretKey));

  useEffect(() => {
    const handleChatbotReady = () => {
      window.$chatbot.setUser(phoneNumber, {
        name: name,
        email: email,
        id: phoneNumber,
        identifier_hash: encryptUserId,
      });
    };

    window.addEventListener("chatbot:ready", handleChatbotReady);

    return () => {
      window.removeEventListener("chatbot:ready", handleChatbotReady);
    };
  }, [phoneNumber]);

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

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="relative" id="chat-container">
      <div
        className={`flex items-center global-horizontal-padding pb-5 pt-5 overflow-hidden`}
      >
        <div onClick={onClickGoBack} className="cursor-pointer">
          <CustomImage
            className={"me-5 w-2.5 cursor-pointer"}
            src={Images.leftIcon}
          />
        </div>
        <div className="flex justify-center items-center">
          <CustomText textClassName={"font-bold"} styles={{ fontSize: 18 }}>
            Live Chat
          </CustomText>
        </div>
      </div>

      <div
        id="embed_chatbot_container_id"
        style={{ height: "calc(100vh - 67px)" }}
      ></div>

      <LoadingOverlay loading={userProfileLoading} />
    </div>
  );
};

export default Chat;
