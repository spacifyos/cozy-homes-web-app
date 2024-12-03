import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthManager from "@/src/utils/AuthManager";
import { get, isEmpty, isEqual, replace } from "lodash";
import Toast from "@/src/utils/Toast";

function AgencyAuthWrapper(WrappedComponent) {
  const AgencyAuthWrapper = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = get(router, ["pathname"], "");

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = await AuthManager.retrieveToken();
        const type = await AuthManager.retrieveType();

        if (!isEmpty(token) && !isEmpty(type) && isEqual(type, "back-office")) {
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
        pathname: "/",
      });
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AgencyAuthWrapper;
}

export default AgencyAuthWrapper;
