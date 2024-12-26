import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useEffect, useRef, useState } from "react";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import { isEmpty, get, map, size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CustomDropdown from "@/components/CustomDropdown";
import * as tenancySelector from "@/src/selectors/tenancy";
import TenancyComponent from "@/components/MyStay/TenancyComponent";

const AutoPayButton = ({ isChecked = false, onChangeAutoPay }) => {
  return (
    <div className="auto-pay-button">
      <CustomText
        textClassName={`${isChecked ? "primary-text" : "disable-text"} font-bold pr-3`}
      >
        AutoPay
      </CustomText>
      <input
        type="checkbox"
        className={`toggle default-toggle ${isChecked ? "toggle-primary-color" : "toggle-disable-color"} [--tglbg:#E8E8E8] cursor-pointer`}
        checked={isChecked}
        onChange={onChangeAutoPay}
      />
    </div>
  );
};

const TenancySection = ({ onChangeAutoPay, isChecked, data }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [tenancyViewMore, setTenancyViewMore] = useState(false);

  const onSlideChange = (value) => {
    const activeIndex = get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  return (
    <div className="pb-7 relative">
      <CustomText textClassName="section-title pb-2">My Tenancy</CustomText>

      {isEmpty(data) ? (
        <TenancyComponent />
      ) : (
        <Swiper
          className="mySwiper global-box-shadow global-border-radius cursor-grab primaryWhite-bg-color"
          onSlideChange={onSlideChange}
          style={{ width: "100%", maxHeight: 300 }}
        >
          {map(data, (item, index) => {
            return (
              <SwiperSlide key={index}>
                <TenancyComponent item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {size(data) > 1 ? (
        <div className="mt-5 flex justify-center items-center">
          {map(data, (item, index) => {
            return (
              <div
                key={index}
                className={
                  index === selectedSlide ? "banner-dot-active" : "banner-dot"
                }
              ></div>
            );
          })}
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default TenancySection;
