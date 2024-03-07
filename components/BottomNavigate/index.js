import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import { useRouter } from "next/router";

const lists = [
  {
    name: "Explore",
    value: "/explore",
    icon: Images.searchIcon,
    activeIcon: Images.searchIconActive,
  },
  {
    name: "My Stay",
    value: "/myStay",
    icon: Images.homeIcon,
    activeIcon: Images.homeIconActive,
  },
  {
    name: "Account",
    value: "/account",
    icon: Images.accountIcon,
    activeIcon: Images.accountIconActive,
  },
];

const BottomNavigate = ({ routeName, onClickChangeTab }) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 global-box-shadow primaryWhite-bg-color flex justify-between items-center py-3 px-7 global-border-radius"
      style={{ margin: "0 10px 10px 10px" }}
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
            className="flex flex-col justify-center items-center"
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
  );
};

export default BottomNavigate;
