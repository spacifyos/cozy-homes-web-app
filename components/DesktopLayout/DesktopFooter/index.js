import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _, { get, map } from "lodash";

const DesktopFooter = () => {
  const socialMediaIconList = [
    { icon: Image.tiktokIcon, value: "https://www.tiktok.com/@belivecoliving" },
    {
      icon: Image.instagramIcon,
      value: "https://www.instagram.com/belivecoliving",
    },
    {
      icon: Image.facebookIcon,
      value: "https://www.facebook.com/BeLiveCoLiving",
    },
    { icon: Image.youtubeIcon, value: "https://m.youtube.com/@BeLiveColiving" },
    {
      icon: Image.linkinIcon,
      value: "https://www.linkedin.com/company/belive-co-living",
    },
    { icon: Image.twitterIcon, value: "https://x.com/BeLiveColiving" },
  ];

  return (
    <div className="primaryWhite-bg-color">
      <div className="bg-color py-10">
        <div className="container mx-auto grid grid-cols-3">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <CustomImage
                imageStyle={{ width: 150, height: 150 }}
                src={Image.logoImage}
              />
            </div>

            <CustomText textClassName="pb-4 font-size-large">
              No. 42-46, Ground Floor, Jalan SS 19/1d, SS 19, 47500 Subang Jaya,
              Selangor.
            </CustomText>

            <div className="flex items-center pb-2">
              <CustomImage
                src={Image.phoneIconActive}
                imageStyle={{ width: 20 }}
              />
              <CustomText textClassName="pl-2">+603 5878 9831</CustomText>
            </div>

            <div className="flex items-center">
              <CustomImage
                src={Image.emailIconActive}
                imageStyle={{ width: 20 }}
              />
              <CustomText textClassName="pl-2">info@belive.asia</CustomText>
            </div>
          </div>

          <div className="flex flex-col items-center pt-6">
            <div className="flex flex-col gap-2">
              <CustomText textClassName="primary-text font-bold font-size-xlarge">
                About
              </CustomText>

              <CustomText>About Us</CustomText>

              <CustomText>Services / What We Do</CustomText>

              <CustomText>Find Us / Contact Us</CustomText>

              <CustomText>Career</CustomText>

              <CustomText>FAQ</CustomText>
            </div>
          </div>

          <div className="flex flex-col items-center pt-6">
            <div>
              <CustomText textClassName="primary-text font-bold font-size-xlarge pb-2">
                Follow Us
              </CustomText>

              <div className="flex gap-3">
                {map(socialMediaIconList, (item) => {
                  const icon = get(item, ["icon"], "");
                  const value = get(item, ["value"], "");

                  return (
                    <a href={value} target="_blank">
                      <CustomImage
                        src={icon}
                        imageStyle={{ width: 30, height: 30 }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <CustomText>
          Copyright © 2024 BeLive Ventures Sdn Bhd. All rights reserved.
        </CustomText>
      </div>
    </div>
  );
};

export default DesktopFooter;
