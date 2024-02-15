import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthManager from "@/src/utils/AuthManager";
import _ from "lodash";

function AuthWrapper(WrappedComponent) {
  const AuthWrapper = (props) => {
    const router = useRouter();
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
      AuthManager.retrieveTenantUserToken().then((value) => {
        if (_.isEmpty(value)) {
          router.push({
            pathname: "/login",
          });
        } else {
          return setAuthToken(value);
        }
      });
    }, [authToken]);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
}

export default AuthWrapper;
