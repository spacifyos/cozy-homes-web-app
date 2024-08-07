import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import AuthManager from "@/src/utils/AuthManager";
import { get, isEmpty, isEqual } from "lodash";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (!isEmpty(token) && !isEmpty(type)) {
        if (isEqual(type, "tenant")) {
          return router.push("/my-property");
        } else {
          return router.push("/owner");
        }
      } else {
        return router.push("/sign-in");
      }
    };

    setTimeout(() => checkAuthentication(), 1000);
  }, []);

  return (
    <div
      className={"container flex-1 h-screen"}
      style={{
        background:
          "linear-gradient(125.08deg, #D71440 44.39%, #F9A533 96.79%)",
      }}
    >
      <div
        className="flex flex-col justify-start items-center h-screen"
        style={{ paddingTop: "50%" }}
      >
        <div>
          <CustomImage
            src={Images.blackLogoWithText}
            imageStyle={{ width: 180 }}
          />
        </div>
      </div>
    </div>
  );
}

export default withTranslation("common")(Home);
