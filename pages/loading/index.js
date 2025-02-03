import LoadingOverlay from "@/components/LoadingOverlay";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useEffect, useState } from "react";
import AuthManager from "@/src/utils/AuthManager";
import { useRouter } from "next/router";
import { get, isEmpty, isEqual } from "lodash";

const Loading = () => {
  const router = useRouter();
  const routeQuery = get(router, ["query"], null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (!isEmpty(token) && !isEmpty(type)) {
        const tab = get(routeQuery, ["tab"], "");

        switch (tab) {
          case "my-property":
            if (isEqual(type, "tenant")) {
              return router.replace("/user/my-property");
            } else {
              return router.replace("/user/owner");
            }

          case "account":
            if (isEqual(type, "tenant")) {
              return router.replace("/user/account");
            } else {
              return router.replace("/user/owner/account");
            }

          case "chat":
            if (isEqual(type, "tenant")) {
              return router.replace("/user/chat");
            } else {
              return router.replace("/user/owner/chat");
            }

          default:
            if (isEqual(type, "tenant")) {
              return router.replace("/user/my-property");
            } else {
              return router.replace("/user/owner");
            }
        }
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className="flex-1 h-screen bg-white">
      <div className="flex justify-center items-center h-full">
        <CustomImage src={Images.logoImage} imageStyle={{ width: 150 }} />
      </div>

      <LoadingOverlay loading={true} />
    </div>
  );
};

export default Loading;
