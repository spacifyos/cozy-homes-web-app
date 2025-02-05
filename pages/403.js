import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Custom403() {
  const router = useRouter();

  const onClickGoToBack = () => {
    router.replace("/");
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 px-10 h-screen bg-primary-background">
      <NextSeo title="User Forbidden - Spacify Asia" />
      <div className="flex gap-1">
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#f9a533" }}
        >
          4
        </CustomText>
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#f05a22" }}
        >
          0
        </CustomText>
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#d71440" }}
        >
          3
        </CustomText>
      </div>

      <CustomText textClassName="text-lg text-center font-bold pb-2">
        Oops! It looks like you are forbidden.
      </CustomText>

      <CustomText textClassName="text-center text-sm pb-6">
        User does not have the right permissions.
      </CustomText>

      <CustomButton
        buttonText="Go to home page"
        buttonClassName="btn-primary"
        onClick={onClickGoToBack}
      />
    </div>
  );
}
