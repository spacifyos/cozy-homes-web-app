import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, includes, isEmpty, isEqual, map } from "lodash";
import AuthManager from "@/src/utils/AuthManager";
import { useEffect, useState } from "react";
import Helper from "@/src/utils/Helper";
import { useRouter } from "next/router";

const BottomNavigate = ({ routeName, t, routeQuery }) => {
  const router = useRouter();
  const [lists, setLists] = useState([]);

  const tab = get(routeQuery, ["tab"], "");

  useEffect(() => {
    const checkUserType = async () => {
      const userType = await AuthManager.retrieveType();

      setLists([
        {
          name: t("root.explore"),
          value: "/",
          icon: Images.searchIcon,
          activeIcon: Images.searchIconActive,
        },
        {
          name: "My Property",
          value: isEqual(userType, "owner") ? "/owner" : "/my-property",
          icon: Images.homeIcon,
          activeIcon: Images.homeIconActive,
        },
        {
          name: "Chat",
          value: isEqual(userType, "owner") ? "/owner/chat" : "/chat",
          icon: Images.navigateChatIcon,
          activeIcon: Images.navigateChatIconActive,
        },
        // {
        //   name: "RenoXpert",
        //   value: isEqual(userType, "owner") ? "/reno-expert" : "/reno-expert",
        //   icon: Images.renoExpertIcon,
        //   activeIcon: Images.renoExpertIconActive,
        // },
        {
          name: t("root.account"),
          value: "/account",
          icon: Images.accountIcon,
          activeIcon: Images.accountIconActive,
        },
      ]);
    };

    checkUserType();
  }, []);

  const onClickToPage = async (route) => {
    const token = await AuthManager.retrieveToken();

    if (isEmpty(token) && !includes(route, "explore")) {
      Helper.documentGetElementById("sign_in_modal").showModal();
    } else {
      return router.push(route);
    }
  };

  return (
    <div
      id="bottom_navbar"
      className="bottom-0 w-full fixed xl:hidden lg:hidden md:hidden sm:fixed"
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto pb-2">
        <div className="primaryWhite-bg-color global-box-shadow flex justify-between items-center py-4 px-6 global-border-radius">
          {map(lists, (item, index) => {
            const name = get(item, ["name"], "");
            const value = get(item, ["value"], "");
            const icon = get(item, ["icon"], "");
            const activeIcon = get(item, ["activeIcon"], "");

            return (
              <div
                onClick={() => onClickToPage(value)}
                key={index}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <CustomImage
                  src={
                    isEqual(value, routeName)
                      ? // || (!isEmpty(tab) && isEqual(value, `/${tab}`))
                        // (isEqual(routeName, "/owner") && isEqual(value, "/my-stay"))
                        activeIcon
                      : icon
                  }
                  imageStyle={{ width: 20, height: 20 }}
                />
                <CustomText
                  textClassName={`${
                    isEqual(value, routeName)
                      ? // || (!isEmpty(tab) && isEqual(value, `/${tab}`))
                        // (isEqual(routeName, "/owner") && isEqual(value, "/my-stay"))
                        "primary-text"
                      : "disable-text"
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
