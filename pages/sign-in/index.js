import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

const SignIn = () => {
  return (
    <CustomHeader hideGoBackButton>
      <div className="body-container">
        <CustomText
          textClassName="primary-text font-bold"
          styles={{ fontSize: 34 }}
        >
          Welcome
        </CustomText>
        <CustomText
          textClassName="primary-text font-bold"
          styles={{ fontSize: 34 }}
        >
          Back
        </CustomText>

        <div className="w-full">
          <div className="grid grid-cols-2">
            <CustomText
              textClassName="text-center p-4 primaryWhite-bg-color primary-text font-bold font-size-large"
              styles={{ borderRadius: "10px 10px 0 0" }}
            >
              Sign In
            </CustomText>

            <CustomText
              textClassName="text-center p-4 primary-text font-bold font-size-large"
              styles={{
                borderRadius: "10px 10px 0 0",
                backgroundColor: "#E8E8E8",
                color: "#C3C4C6",
              }}
            >
              Sign Up
            </CustomText>
          </div>
          <div
            className="p-3 global-box-shadow primaryWhite-bg-color py-10"
            style={{ borderRadius: "0 0 10px 10px" }}
          >
            <CustomText textClassName="pb-2 font-bold font-size-large">I'm ...</CustomText>

            <div className="grid grid-cols-3 gap-2 mb-8">
              <CustomButton buttonClassName="primary-btn" buttonText="Tenant" />
              <CustomButton
                buttonClassName="default-btn-outline"
                buttonText="Owner"
              />
              <CustomButton
                buttonClassName="default-btn-outline"
                buttonText="Agency"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full primaryWhite-bg-color mb-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full primaryWhite-bg-color mb-8"
            />

            <div className="flex justify-center">
              <CustomButton
                buttonClassName="primary-btn w-2/4 mb-2"
                buttonText="Sign In"
              />
            </div>

            <CustomText textClassName="text-center mb-5">
              Forgot Password?
            </CustomText>

            <CustomText textClassName="font-size-small mb-5">
              By using our services, you are deemed unconditionally agree,
              consent and be bound by our terms and conditions and privacy
              policy.
            </CustomText>

            <CustomText textClassName="font-size-xxsmall text-center disable-text">
              This site is protected by reCAPTCHA and the Google Privacy
              Policy and Terms of Service apply.
            </CustomText>
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default SignIn;
