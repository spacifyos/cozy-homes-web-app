import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _, { get, map } from "lodash";
import moment from "moment";

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
    <div className="primaryWhite-bg-color xl:pb-0 lg:pb-0 md:pb-0 sm:pb-20 pb-20">
      <div className="bg-color py-10">
        <div className="container mx-auto grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 xl:gap-10 lg:gap-10 md:gap-8 sm:gap-6 gap-6">
          <div className="flex flex-col col-span-1 md gap-2">
            <CustomText textClassName="text-justify">
              <span className="font-bold primary-text">
                Malaysia’s Leading CoLiving Platform for Students,
                Professionals, and Families
              </span>
              <br />
              Discover your ideal living space with our comprehensive platform,
              designed for room rentals and beyond. Whether you’re searching for{" "}
              <span className="font-bold primary-text">
                rooms, entire units, short-term stays, or carpark rentals
              </span>
              , our user-friendly platform caters to all your needs across
              Malaysia.
            </CustomText>

            {/*<div className="flex justify-center">*/}
            {/*  <CustomImage*/}
            {/*    imageStyle={{ width: 150, height: 150 }}*/}
            {/*    src={Image.logoImage}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>

          <div className="flex flex-col items-center col-span-1">
            <CustomText textClassName="text-justify">
              <span className="font-bold primary-text">
                Your Journey to the Perfect Space Starts Here
              </span>
              <br />
              From affordable co-living spaces to luxury units, our listings are
              tailored to suit diverse preferences and budgets. With detailed
              maps, high-quality images, and verified listings, finding the
              right property has never been easier.
            </CustomText>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center xl:grid lg:grid md:flex sm:flex flex grid-cols-8 gap-2">
                <CustomImage
                  src={Image.phoneIconActive}
                  className="col-span-1 w-5"
                />
                <CustomText textClassName="col-span-7">
                  +603 5878 9831
                </CustomText>
              </div>

              <div className="flex items-start xl:grid lg:grid md:flex sm:flex flex grid-cols-8 gap-2">
                <CustomImage
                  src={Image.emailIconActive}
                  className="col-span-1 w-5"
                />
                <CustomText textClassName="col-span-7">
                  info@belive.asia
                </CustomText>
              </div>

              <div className="flex items-start xl:grid lg:grid md:flex sm:flex flex grid-cols-8 gap-2">
                <div className="col-span-1">
                  <CustomImage
                    src={Image.locationOutlineActive}
                    className="w-5"
                  />
                </div>

                <CustomText textClassName="col-span-7 text-justify">
                  No. 42-46, Ground Floor, Jalan SS 19/1d, SS 19, 47500 Subang
                  Jaya, Selangor.
                </CustomText>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4">
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 xl:gap-10 lg:gap-10 md:gap-8 sm:gap-6 gap-6">
          <div className="flex flex-col xl:col-span-2 lg:col-span-2 md:col-span-1 sm:col-span-1 col-span-1 gap-2">
            <CustomText textClassName="font-bold">Why Choose Us?</CustomText>

            <ul className="list-disc pl-4">
              <li>
                <CustomText textClassName="text-justify">
                  <span className="font-bold primary-text">
                    Diverse Listings
                  </span>
                  : Explore options for{" "}
                  <span className="font-bold primary-text">
                    room rentals, whole-unit rentals
                  </span>
                  , <span className="font-bold primary-text">short stays</span>,
                  and even{" "}
                  <span className="font-bold primary-text">carpark spaces</span>
                  .
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify">
                  <span className="font-bold primary-text">
                    Optimized Convenience
                  </span>
                  : Access real-time availability, secure online bookings, and
                  transparent pricing.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify">
                  <span className="font-bold primary-text">
                    Expert Guidance
                  </span>
                  : Leverage our{" "}
                  <span className="font-bold primary-text">insider guides</span>
                  , market insights, and professional support to make informed
                  decisions.
                </CustomText>
              </li>
            </ul>

            <CustomText textClassName="font-bold">
              Explore Services Beyond Renting
            </CustomText>
            <CustomText textClassName="text-justify">
              We’re more than just a room rental platform. Our upcoming services
              include:
            </CustomText>

            <ul className="list-disc pl-4">
              <li>
                <CustomText textClassName="text-justify">
                  <span className="font-bold primary-text">
                    Short-Term Stays
                  </span>
                  : Perfect for business trips, vacations, or temporary
                  accommodations.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify">
                  <span className="font-bold primary-text">
                    Whole-Unit Rentals
                  </span>
                  : Ideal for families or groups seeking private and spacious
                  living spaces.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify">
                  <span className="font-bold primary-text">
                    Carpark Rentals
                  </span>
                  : Secure parking options in prime locations.
                </CustomText>
              </li>
            </ul>

            <CustomText textClassName="font-bold text-justify">
              Find the Perfect Space, Hassle-Free
            </CustomText>
            <CustomText textClassName="text-justify">
              Whether you’re a student, working professional, or family, our
              advanced search tools,{" "}
              <span className="font-bold primary-text">
                tenant-friendly policies
              </span>
              , and{" "}
              <span className="font-bold primary-text">
                landlord support services
              </span>{" "}
              ensure a seamless experience. Start your property journey with us
              today and join thousands of satisfied tenants.
            </CustomText>
            {/*<CustomText textClassName="font-bold">*/}
            {/*  Additional Features to Enhance Your Experience*/}
            {/*</CustomText>*/}

            {/*<ul className="list-disc">*/}
            {/*  <li>*/}
            {/*    <CustomText>*/}
            {/*      <span className="font-bold primary-text">*/}
            {/*        Interactive Maps*/}
            {/*      </span>*/}
            {/*      : Locate properties near universities, public transport, or*/}
            {/*      business hubs.*/}
            {/*    </CustomText>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <CustomText>*/}
            {/*      <span className="font-bold primary-text">*/}
            {/*        Smart Technology Integration*/}
            {/*      </span>*/}
            {/*      : Simplify rental processes with{" "}*/}
            {/*      <span className="font-bold primary-text">*/}
            {/*        smart contracts*/}
            {/*      </span>{" "}*/}
            {/*      and automated billing systems.*/}
            {/*    </CustomText>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <CustomText>*/}
            {/*      <span className="font-bold primary-text">*/}
            {/*        Dedicated Support*/}
            {/*      </span>*/}
            {/*      : Reach out to our team for personalized assistance anytime.*/}
            {/*    </CustomText>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </div>

          <div className="col-span-1 xl:gap-10 lg:gap-10 md:gap-8 sm:gap-6 gap-6 grid grid-cols-2 ">
            <div className="flex flex-col col-span-1 gap-2">
              <CustomText textClassName="primary-text font-bold font-size-xxlarge pb-2">
                Company
              </CustomText>

              <CustomText>About Us</CustomText>

              <CustomText>Career</CustomText>

              <CustomText>Contact Us</CustomText>
            </div>

            <div className="flex flex-col col-span-1 gap-2">
              <CustomText textClassName="primary-text font-bold font-size-xxlarge pb-2">
                Help Center
              </CustomText>

              <CustomText>FAQs</CustomText>

              <CustomText>Tenant Support</CustomText>

              <CustomText>Landlord Resources</CustomText>
            </div>

            <div className="flex flex-col col-span-1 gap-2">
              <CustomText textClassName="primary-text font-bold font-size-xxlarge pb-2">
                Discover
              </CustomText>

              <CustomText>Room Rentals</CustomText>

              <CustomText>Whole-Unit Rentals</CustomText>

              <CustomText>Short Stays</CustomText>

              <CustomText>Carpark Rentals</CustomText>
            </div>

            <div className="flex flex-col col-span-1 gap-2">
              <CustomText textClassName="primary-text font-bold font-size-xxlarge pb-2">
                Insights
              </CustomText>

              <CustomText>Market Trends</CustomText>

              <CustomText>Rental Tips</CustomText>

              <CustomText>Investment Insights</CustomText>

              <CustomText>Insider Guides</CustomText>
            </div>
          </div>
        </div>

        <div className="divider-line" style={{ margin: "16px 0" }}></div>

        <div className="flex flex-row-reverse xl:justify-between lg:justify-between md:justify-between sm:justify-center justify-center items-center flex-wrap gap-4">
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

          <CustomText>
            Copyright © {moment().year()} BeLive Ventures Sdn Bhd. All rights
            reserved.
          </CustomText>
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
