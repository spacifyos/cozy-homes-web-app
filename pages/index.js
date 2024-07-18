import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/my-property");
    }, 1000);
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
        style={{ paddingTop: "35%" }}
      >
        <div>
          <CustomImage
            src={Images.blackLogoWithText}
            height={180}
            width={180}
          />
        </div>
      </div>
    </div>
  );
}

export default withTranslation("common")(Home);
