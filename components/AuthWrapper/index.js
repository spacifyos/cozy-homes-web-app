import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthManager from "@/src/utils/AuthManager";
import { get, isEmpty, isEqual, replace } from "lodash";
import Toast from "@/src/utils/Toast";

function AuthWrapper(WrappedComponent) {
  const AuthWrapper = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = get(router, ["pathname"], "");

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = await AuthManager.retrieveToken();
        const type = await AuthManager.retrieveType();

        if (!isEmpty(token) && !isEmpty(type) && isEqual(type, "tenant")) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };

      checkAuthentication();
    }, [router]);

    if (isLoading) {
      return (
        <div className={"flex justify-center items-center h-screen w-full"}>
          <span className="loading loading-dots loading-lg text-neutral primary-text"></span>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Toast.error("You need to sign in to your account.");

      router.push({
        pathname: "/sign-in",
        query: { tab: replace(pathname, "/", "") },
      });
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
}

export default AuthWrapper;
