import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";

const LanguageSwitcher = ({ locale, onClickChangeLanguage }) => {
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
    <div className="global-horizontal-padding relative" style={{ height: 60 }}>
      <details
        className="collapse collapse-arrow primaryWhite-bg-color absolute right-5 global-box-shadow"
        style={{ width: 85 }}
      >
        <summary
          className="collapse-title items-center"
          style={{ display: "flex", paddingInlineEnd: 0 }}
        >
          <CustomImage
            src={
              _.isEmpty(currentLanguageIcon)
                ? Image.logoImage
                : currentLanguageIcon
            }
            height={25}
            width={25}
          />
        </summary>

        {_.map(LanguageList, (item) => {
          const image = _.get(item, ["image"], "");
          const name = _.get(item, ["name"], "");
          const value = _.get(item, ["value"], "");

          return (
            <div
              className="collapse-content flex items-center cursor-pointer"
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
      </details>
    </div>
  );
};

export default LanguageSwitcher;
