import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthManager from "@/src/utils/AuthManager";
import { get, isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";

function AuthWrapper(WrappedComponent) {
  const AuthWrapper = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = get(router, ["pathname"], "");

    // Define public routes (accessible when not authenticated)
    const isPublicRoute =
      !pathname.includes("/user") || !pathname.includes("/agency");

    // Check if the route is protected (includes "/user" or "/agency")
    const isProtectedRoute =
      pathname.includes("/user") || pathname.includes("/agency");

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = await AuthManager.retrieveToken();
        const type = await AuthManager.retrieveType();

        if (!isEmpty(token) && !isEmpty(type)) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      };

      checkAuthentication();
    }, [router]);

    if (isLoading) {
      return (
        <div className={"flex justify-center items-center h-screen w-full"}>
          <span className="loading loading-dots loading-lg text-neutral text-primary"></span>
        </div>
      );
    }

    // If authenticated and on a public route, redirect to /my-property
    if (isAuthenticated && isPublicRoute) {
      router.push("/user/my-property");
      return null;
    }

    // If authenticated and on a protected route, allow access
    if (isAuthenticated && isProtectedRoute) {
      return <WrappedComponent {...props} />;
    }

    // If not authenticated and on a protected route, redirect to sign-in
    if (!isAuthenticated && isProtectedRoute) {
      Toast.error("You need to sign in to access this page.");
      router.push({
        pathname: "/sign-in",
        query: { returnUrl: pathname }, // Optional: redirect back after sign-in
      });
      return null;
    }

    // If not authenticated and on a public route, allow access
    if (!isAuthenticated && isPublicRoute) {
      return <WrappedComponent {...props} />;
    }

    // Default case: redirect authenticated users to /my-property if not on a defined route
    if (isAuthenticated) {
      router.push("/user/my-property");
      return null;
    }

    // Fallback: redirect to sign-in if no other conditions match
    router.push("/sign-in");
    return null;
  };

  return AuthWrapper;
}

export default AuthWrapper;
