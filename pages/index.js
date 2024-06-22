import Color from "@/src/utils/Color";
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
      router.replace("/explore");
    }, 1000);
  });

  return (
    <div
      className={"container flex-1 h-screen"}
      style={{ backgroundColor: Color.primaryWhiteColor }}
    >
      <div
        className="flex flex-col justify-start items-center h-screen"
        style={{ paddingTop: "35%" }}
      >
        <div>
          <CustomImage src={Images.logoImage} height={180} width={180} />
        </div>
      </div>
    </div>
  );
}

export default withTranslation("common")(Home);
