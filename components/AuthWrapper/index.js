import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthManager from "@/src/utils/AuthManager";
import { isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";

function AuthWrapper(WrappedComponent) {
  const AuthWrapper = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = await AuthManager.retrieveToken();
        if (!isEmpty(token)) {
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
      });
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
}

export default AuthWrapper;
