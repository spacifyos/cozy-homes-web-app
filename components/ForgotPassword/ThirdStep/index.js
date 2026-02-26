import CustomButton from "@/components/CustomButton";
import { isEqual } from "lodash";
import Constant from "@/src/utils/Constant";
import { useState } from "react";

const ThirdStep = ({
  t,
  passwordValue,
  confirmPasswordValue,
  onChangePasswordValue,
  onChangeConfirmPasswordValue,
  onClickSubmitChangePassword,
  typeQuery,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={"Your Password"}
          className="input input-bordered w-full bg-white pr-10 user-input"
          value={passwordValue}
          onChange={onChangePasswordValue}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.01-2.86 2.92-5.1 5.24-6.52" />
              <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9.27 3.11 11 8a12.18 12.18 0 0 1-4.06 5.15" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder={"Confirm Your Password"}
          className="input input-bordered w-full bg-white pr-10 user-input"
          value={confirmPasswordValue}
          onChange={onChangeConfirmPasswordValue}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.01-2.86 2.92-5.1 5.24-6.52" />
              <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9.27 3.11 11 8a12.18 12.18 0 0 1-4.06 5.15" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-4">
        <CustomButton
          buttonText="Submit"
          buttonClassName={`${
            isEqual(typeQuery, Constant.TENANT)
              ? "btn-secondary"
              : "btn-primary"
          } col-start-2 col-span-2`}
          onClick={onClickSubmitChangePassword}
        />
      </div>
    </div>
  );
};

export default ThirdStep;
