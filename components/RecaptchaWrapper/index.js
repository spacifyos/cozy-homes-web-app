import { ReCaptchaProvider } from "next-recaptcha-v3";
import React from "react";

const RecaptchaWrapper = (Component) => {
  const Recaptcha = ({ children }) => {
    return (
      <ReCaptchaProvider reCaptchaKey={process.env.GOOGLE_RECAPTCHA_V3}>
        {children}
      </ReCaptchaProvider>
    );
  };
  return class Higher extends React.Component {
    render() {
      return (
        <Recaptcha>
          <Component {...this.props} />
        </Recaptcha>
      );
    }
  };
};

export default RecaptchaWrapper;
