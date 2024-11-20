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
    <div className="primaryWhite-bg-color hidden xl:block lg:block md:block sm:hidden">
      <div className="bg-color py-10">
        <div className="container mx-auto grid grid-cols-4 gap-10">
          <div className="flex flex-col col-span-2 gap-4">
            <CustomText textClassName="text-justify">
              <span className="font-bold">
                Malaysia’s Leading CoLiving Platform for Students,
                Professionals, and Families
              </span>
              <br />
              Discover your ideal living space with our comprehensive platform,
              designed for room rentals and beyond. Whether you’re searching for
              <span className="font-bold">
                rooms, entire units, short-term stays, or carpark rentals
              </span>
              , our user-friendly platform caters to all your needs across
              Malaysia.
            </CustomText>

            <CustomText textClassName="text-justify">
              <span className="font-bold">
                Your Journey to the Perfect Space Starts Here
              </span>
              <br />
              From affordable co-living spaces to luxury units, our listings are
              tailored to suit diverse preferences and budgets. With detailed
              maps, high-quality images, and verified listings, finding the
              right property has never been easier.
            </CustomText>
            {/*<div className="flex justify-center">*/}
            {/*  <CustomImage*/}
            {/*    imageStyle={{ width: 150, height: 150 }}*/}
            {/*    src={Image.logoImage}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>

          <div className="flex flex-col items-center col-span-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center grid grid-cols-8 gap-2">
                <CustomImage
                  src={Image.phoneIconActive}
                  className="col-span-1"
                />
                <CustomText textClassName="col-span-7">
                  +603 5878 9831
                </CustomText>
              </div>

              <div className="flex items-start grid grid-cols-8 gap-2">
                <CustomImage
                  src={Image.emailIconActive}
                  className="col-span-1"
                />
                <CustomText textClassName="col-span-7">
                  info@belive.asia
                </CustomText>
              </div>

              <div className="flex items-start grid grid-cols-8 gap-2">
                <CustomImage
                  src={Image.locationOutlineActive}
                  className="col-span-1 "
                />
                <CustomText textClassName="col-span-7 text-justify">
                  No. 42-46, Ground Floor, Jalan SS 19/1d, SS 19, 47500 Subang
                  Jaya, Selangor.
                </CustomText>
              </div>
              {/*<CustomText textClassName="primary-text font-bold font-size-xlarge">*/}
              {/*  About*/}
              {/*</CustomText>*/}

              {/*<CustomText>About Us</CustomText>*/}

              {/*<CustomText>Services / What We Do</CustomText>*/}

              {/*<CustomText>Find Us / Contact Us</CustomText>*/}

              {/*<CustomText>Career</CustomText>*/}

              {/*<CustomText>FAQ</CustomText>*/}
            </div>
          </div>

          <div className="flex flex-col items-center pt-6 col-span-1">
            <div>
              <CustomText textClassName="primary-text font-bold font-size-xlarge pb-2">
                Follow Us
              </CustomText>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-3 flex justify-between items-center">
        <CustomText>
          Copyright © 2024 BeLive Ventures Sdn Bhd. All rights reserved.
        </CustomText>

        <div className="flex gap-3">
          {map(socialMediaIconList, (item) => {
            const icon = get(item, ["icon"], "");
            const value = get(item, ["value"], "");

            return (
              <a href={value} target="_blank">
                <CustomImage
                  src={icon}
                  imageStyle={{ width: 25, height: 25 }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
