import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";

const LanguageSwitcher = ({
  locale,
  onClickChangeLanguage,
  openSwitcher,
  onClickOpenSwitcher,
}) => {
  const LanguageList = [
    { image: Image.enIcon, name: "EN", value: "en" },
    { image: Image.bnIcon, name: "BM", value: "bm" },
    { image: Image.zhIcon, name: "ZH", value: "zh" },
  ];

  const currentLocale = _.find(LanguageList, (item) =>
    _.isEqual(_.get(item, ["value"], "en"), locale),
  );
  const currentLanguageIcon = _.get(currentLocale, ["image"], "");

  return (
    <div className="global-horizontal-padding relative" style={{ height: 50 }}>
      <div
        onClick={onClickOpenSwitcher}
        className={`collapse collapse-arrow primaryWhite-bg-color absolute right-7 global-box-shadow  ${openSwitcher ? "collapse-open" : ""}`}
        style={{ width: 90 }}
      >
        <div
          className="collapse-title flex items-center"
          style={{ paddingInlineEnd: 0, padding: "0 0 0 1rem", minHeight: 50 }}
        >
          <CustomImage
            src={
              _.isEmpty(currentLanguageIcon)
                ? Image.logoImage
                : currentLanguageIcon
            }
            imageStyle={{ height: 30, width: 30 }}
          />
        </div>
        <div className="collapse-content">
          {_.map(LanguageList, (item, index) => {
            const image = _.get(item, ["image"], "");
            const name = _.get(item, ["name"], "");
            const value = _.get(item, ["value"], "");

            return (
              <div
                className={`flex items-center cursor-pointer ${index == 2 ? "" : "pb-2"}`}
                onClick={() => onClickChangeLanguage(value)}
              >
                <CustomImage
                  src={image}
                  height={20}
                  width={20}
                  className="mr-3"
                />
                <CustomText>{name}</CustomText>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
