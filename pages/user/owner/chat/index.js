import { useEffect, useRef, useState } from "react";
import Helper from "@/src/utils/Helper";
import { get, isEmpty, toString, map } from "lodash";
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
import * as tenancySelector from "@/src/selectors/tenancy";
import BottomNavigate from "@/components/BottomNavigate";
import CustomText from "@/components/CustomText";
import DesktopLayout from "@/components/DesktopLayout";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

export { getServerSideProps };

const OwnerChat = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [userProfileData, setUserProfileData] = useState(false);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);
  const uuid = authSelector.getUuid(userProfileData);
  const propertyDetails = get(userProfileData, ["property_details"], []);

  const propertyDetailToString = JSON.stringify(propertyDetails);

  const secretKey = "f9de772e2cdbb19af4e7c7c6627c6e8d";
  const src = `https://chat.spacify.asia/js/widget/vza3qkxeepbyzkuu/embed.js?id=embed_owner_chatbot_container_id&ref=main_menu--${phoneNumber}--${propertyDetailToString}`;

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

      script.onload = () => {
        window.addEventListener("chatbot:ready", () => {
          if (
            window.$chatbot &&
            typeof window.$chatbot.setUser === "function"
          ) {
            window.$chatbot.setUser(uuid, {
              name: name,
              email: email,
              phone_number: phoneNumber,
              identifier_hash: encryptUserId,
            });
          } else {
            console.error("setUser is not a function or $chatbot is undefined");
          }
        });
      };
    }
  }, [userProfileData, window]);

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

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <DesktopLayout
        hideFooter
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <CustomText textClassName="text-base">Chat</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">Chat</CustomText>
            </div>
          </div>
        }
      >
        <div
          id="chat-container"
          className="border global-border-radius h-full w-full overflow-hidden flex justify-center items-center"
          style={{ height: "80vh" }}
        >
          <div id="embed_owner_chatbot_container_id"></div>

          {userProfileLoading ? (
            <span className="loading loading-dots loading-lg primary-text"></span>
          ) : (
            false
          )}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerChat));
