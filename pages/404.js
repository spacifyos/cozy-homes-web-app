import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";

export default function Custom404() {
  const router = useRouter();

  const onClickGoToBack = () => {
    router.replace("/");
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 px-10 h-screen bg-primary-background">
      <NextSeo title="Page Not Found - Spacify Asia" />
      <div className="flex gap-1">
        <CustomImage src={Images.pageNotFound} className="w-64" />
      </div>

      <CustomText
        textClassName="text-center font-bold pb-2"
        styles={{ fontSize: 32 }}
      >
        Page Not Found!
      </CustomText>

      <CustomText textClassName="text-center text-sm pb-6">
        Sorry, we could not find the page you are looking for.
      </CustomText>

      <CustomButton
        buttonText="Go Back"
        buttonClassName="btn-primary w-40"
        onClick={onClickGoToBack}
      />
    </div>
  );
}
