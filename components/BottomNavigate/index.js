import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, includes, isEmpty, isEqual, map } from "lodash";
import AuthManager from "@/src/utils/AuthManager";
import { useEffect, useState } from "react";
import Helper from "@/src/utils/Helper";
import { useRouter } from "next/router";

const BottomNavigate = ({ routeName, routeQuery }) => {
  const router = useRouter();
  const [lists, setLists] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 10; // 10px threshold

      if (isAtBottom) {
        // At bottom of page
        setIsVisible(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const checkUserType = async () => {
      const userType = await AuthManager.retrieveType();

      setLists([
        {
          name: "Explore",
          value: "/",
          icon: Images.searchIconDisable,
          activeIcon: Images.searchIconFillActive,
        },
        {
          name: "My Property",
          value: isEqual(userType, "owner")
            ? "/user/owner"
            : "/user/my-property",
          icon: Images.homeIconDisable,
          activeIcon: Images.homeIconFillActive,
        },
        {
          name: "Chat",
          value: isEqual(userType, "owner") ? "/user/owner/chat" : "/user/chat",
          icon: Images.chatIconDisable,
          activeIcon: Images.chatIconActive,
        },
        {
          name: "Account",
          value: "/user/account",
          icon: Images.accountIconDisable,
          activeIcon: Images.accountIconFillActive,
        },
      ]);
    };

    checkUserType();
  }, []);

  const onClickToPage = async (e, route) => {
    e.preventDefault();
    const userToken = await AuthManager.retrieveToken();
    const userType = await AuthManager.retrieveType();

    if (isEmpty(userToken) || (isEmpty(userType) && !isEqual(route, "/"))) {
      return Helper.documentGetElementById("sign_in_modal").showModal();
    } else {
      return router.push(route);
    }
  };

  return (
    <div
      id="bottom_navbar"
      className="bottom-0 w-full fixed xl:hidden lg:hidden md:hidden sm:fixed"
      style={{
        zIndex: 9999,
        transition: "transform 0.3s ease-in-out",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="container mx-auto pb-2">
        <div className="bg-white global-box-shadow flex justify-between items-center py-4 px-6 global-border-radius">
          {map(lists, (item, index) => {
            const name = get(item, ["name"], "");
            const value = get(item, ["value"], "");
            const icon = get(item, ["icon"], "");
            const activeIcon = get(item, ["activeIcon"], "");

            return (
              <div
                onClick={(e) => onClickToPage(e, value)}
                key={index}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <CustomImage
                  src={isEqual(value, routeName) ? activeIcon : icon}
                  imageStyle={{ width: 20, height: 20 }}
                />
                <CustomText
                  textClassName={`${
                    isEqual(value, routeName) ? "text-primary" : "text-disable"
                  } text-xs pt-1`}
                >
                  {name}
                </CustomText>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigate;
