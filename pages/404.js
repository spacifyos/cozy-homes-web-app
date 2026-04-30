import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { NotFoundIllustration, ChevronLeftIcon } from "@/components/Icons";

export default function Custom404() {
  const router = useRouter();

  const onClickGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/sign-in");
    }
  };

  const onClickGoHome = () => {
    router.replace("/sign-in");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NextSeo title="Page Not Found - CozyHomes" />

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg flex flex-col items-center text-center">
          <div
            className="flex items-center justify-center rounded-full bg-primary-background mb-8"
            style={{ width: 220, height: 220 }}
          >
            <NotFoundIllustration size={160} className="text-primary" />
          </div>

          <CustomText
            textClassName="text-xs font-bold uppercase tracking-widest text-primary pb-2"
          >
            Error 404
          </CustomText>

          <CustomText
            textClassName="font-bold text-black pb-3"
            styles={{ fontSize: 32 }}
          >
            We can't find that page
          </CustomText>

          <CustomText textClassName="text-sm text-muted leading-relaxed max-w-md pb-8">
            The page you're looking for might have been moved, renamed, or no
            longer exists. Let's get you back on track.
          </CustomText>

          <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-row gap-3 w-full max-w-sm">
            <button
              onClick={onClickGoBack}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary global-border-radius py-3 px-5 hover:bg-primary-background transition cursor-pointer"
            >
              <ChevronLeftIcon size={14} className="text-primary" />
              <CustomText textClassName="text-sm font-bold text-primary">
                Go back
              </CustomText>
            </button>

            <CustomButton
              buttonText="Take me home"
              buttonClassName="btn-primary flex-1"
              onClick={onClickGoHome}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
