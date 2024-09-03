import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, isEmpty, isEqual, map } from "lodash";
import AuthManager from "@/src/utils/AuthManager";
import { useEffect, useState } from "react";

const BottomNavigate = ({ routeName, t, routeQuery }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const checkUserType = async () => {
      const userType = await AuthManager.retrieveType();

      setLists([
        {
          name: t("root.explore"),
          value: "/explore",
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
        {
          name: t("root.account"),
          value: isEqual(userType, "owner") ? "/owner/account" : "/account",
          icon: Images.accountIcon,
          activeIcon: Images.accountIconActive,
        },
      ]);
    };

    checkUserType();
  }, []);

  const tab = get(routeQuery, ["tab"], "");

  return (
    <div
      id="bottom_navbar"
      className="fixed bottom-0 w-full z-10 bg-color"
      style={{ maxWidth: 500, zIndex: 9999 }}
    >
      <div
        className="primaryWhite-bg-color global-box-shadow flex justify-between items-center py-3 px-7 global-border-radius"
        style={{ margin: 10 }}
      >
        {map(lists, (item, index) => {
          const name = get(item, ["name"], "");
          const value = get(item, ["value"], "");
          const icon = get(item, ["icon"], "");
          const activeIcon = get(item, ["activeIcon"], "");

          return (
            <a
              href={`${value}`}
              key={index}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <CustomImage
                src={
                  isEqual(value, routeName) ||
                  (!isEmpty(tab) && isEqual(value, `/${tab}`))
                    ? // (isEqual(routeName, "/owner") && isEqual(value, "/my-stay"))
                      activeIcon
                    : icon
                }
                imageStyle={{ width: 25, height: 25 }}
              />
              <CustomText
                textClassName={`${
                  isEqual(value, routeName) ||
                  (!isEmpty(tab) && isEqual(value, `/${tab}`))
                    ? // (isEqual(routeName, "/owner") && isEqual(value, "/my-stay"))
                      "primary-text"
                    : "disable-text"
                } font-size-small pt-1`}
              >
                {name}
              </CustomText>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigate;
