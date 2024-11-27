import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Custom500() {
    const router = useRouter();

    const onClickGoToBack = () => {
        router.replace("/");
    };

    return (
        <div className="flex flex-col justify-center items-center flex-1 px-10 h-screen bg-color">
            <NextSeo title="User Forbidden - Spacify Asia" />
            <div className="flex gap-1">
                <CustomText
                    textClassName="font-bold"
                    styles={{ fontSize: 70, color: "#f9a533" }}
                >
                    5
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
                    0
                </CustomText>
            </div>

            <CustomText textClassName="text-lg text-center font-bold pb-2">
                Oops! Internet Server Error.
            </CustomText>

            <CustomText textClassName="text-center text-sm pb-6">
                User can try again later.
            </CustomText>

            <CustomButton
                buttonText="Go to home page"
                buttonClassName="primary-btn"
                onClick={onClickGoToBack}
            />
        </div>
    );
}
