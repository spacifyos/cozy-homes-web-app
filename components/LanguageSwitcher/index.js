import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";

const LanguageSwitcher = () => {
  const LanguageList = [
    { image: Image.logoImage, name: "EN", value: "en" },
    { image: Image.logoImage, name: "BM", value: "bm" },
    { image: Image.logoImage, name: "ZH", value: "zh" },
  ];

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
          <CustomImage src={Image.logoImage} height={25} width={25} />
        </summary>

        {_.map(LanguageList, (item) => {
          return (
            <div className="collapse-content flex items-center">
              <CustomImage
                src={_.get(item, ["image"], "")}
                height={20}
                width={20} className="mr-3"
              />
              <CustomText>{_.get(item, ["name"], "")}</CustomText>
            </div>
          );
        })}
      </details>
    </div>
  );
};

export default LanguageSwitcher;
