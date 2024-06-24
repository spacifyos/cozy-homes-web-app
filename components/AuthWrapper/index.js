import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthManager from "@/src/utils/AuthManager";
import _ from "lodash";
import Toast from "@/src/utils/Toast";

function AuthWrapper(WrappedComponent) {
  const AuthWrapper = (props) => {
    const router = useRouter();

    AuthManager.retrieveToken().then((value) => {
      if (_.isEmpty(value)) {
        Toast.error("You need sign in account.");

        return router.push({
          pathname: "/sign-in",
        });
      }

      return <WrappedComponent {...props} />;
    });
  };

  return AuthWrapper;
}

export default AuthWrapper;
