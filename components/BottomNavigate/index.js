import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, includes, isEmpty, isEqual, map } from "lodash";

const BottomNavigate = ({ routeName, onClickChangeTab, t, routeQuery }) => {
  const tab = get(routeQuery, ["tab"], "");

  const lists = [
    {
      name: t("root.explore"),
      value: "/explore",
      icon: Images.searchIcon,
      activeIcon: Images.searchIconActive,
    },
    {
      name: t("root.myStay"),
      value: "/my-stay",
      icon: Images.homeIcon,
      activeIcon: Images.homeIconActive,
    },
    {
      name: "Chat",
      value: "/chat",
      icon: Images.navigateChatIcon,
      activeIcon: Images.navigateChatIconActive,
    },
    {
      name: t("root.account"),
      value: "/account",
      icon: Images.accountIcon,
      activeIcon: Images.accountIconActive,
    },
  ];
  return (
    <div
      id="bottom_navbar"
      className="fixed bottom-0 w-full z-10"
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
            <div
              onClick={() => onClickChangeTab(value)}
              key={index}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <CustomImage
                src={
                  isEqual(value, routeName) ||
                  (!isEmpty(tab) && includes(value, tab))
                    ? activeIcon
                    : icon
                }
                width={25}
                height={25}
              />
              <CustomText
                textClassName={`${
                  isEqual(value, routeName) ||
                  (!isEmpty(tab) && includes(value, tab))
                    ? "primary-text"
                    : "disable-text"
                } font-size-small pt-1`}
              >
                {name}
              </CustomText>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigate;
