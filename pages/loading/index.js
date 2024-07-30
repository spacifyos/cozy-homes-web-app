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
              return router.replace("/my-property");
            } else {
              return router.replace("/owner");
            }

          case "account":
            if (isEqual(type, "tenant")) {
              return router.replace("/account");
            } else {
              return router.replace("/owner/account");
            }

          case "chat":
            if (isEqual(type, "tenant")) {
              return router.replace("/chat");
            } else {
              return router.replace("/owner/chat");
            }

          default:
            if (isEqual(type, "tenant")) {
              return router.replace("/my-property");
            } else {
              return router.replace("/owner");
            }
        }
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className="flex-1 ">
      <div className="flex justify-center" style={{ paddingTop: "20vh" }}>
        <CustomImage src={Images.logoImage} width={120} height={120} />
      </div>

      <LoadingOverlay loading={true} />
    </div>
  );
};

export default Loading;
