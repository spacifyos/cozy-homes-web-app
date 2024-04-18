import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import { useRouter } from "next/router";

const BottomNavigate = ({ routeName, onClickChangeTab,t }) => {


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
      name: t("root.account"),
      value: "/account",
      icon: Images.accountIcon,
      activeIcon: Images.accountIconActive,
    },
  ];
  return (
    <div className="fixed bottom-0 w-full" style={{ maxWidth: 500 }}>
      <div
        className="primaryWhite-bg-color global-box-shadow flex justify-between items-center py-3 px-7 global-border-radius"
        style={{ margin: 10 }}
      >
        {_.map(lists, (item, index) => {
          const name = _.get(item, ["name"], "");
          const value = _.get(item, ["value"], "");
          const icon = _.get(item, ["icon"], "");
          const activeIcon = _.get(item, ["activeIcon"], "");

          return (
            <div
              onClick={() => onClickChangeTab(value)}
              key={index}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <CustomImage
                src={_.isEqual(value, routeName) ? activeIcon : icon}
                width={25}
                height={25}
              />
              <CustomText
                textClassName={`${_.isEqual(value, routeName) ? "primary-text" : "disable-text"} font-size-small pt-1`}
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
