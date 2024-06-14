import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useEffect, useRef, useState } from "react";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CustomDropdown from "@/components/CustomDropdown";
import * as tenancySelector from "@/src/selectors/tenancy";

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

const TenancySection = ({
  t,
  onClickGoToMyTenancy,
  onChangeAutoPay,
  isChecked,
  data,
}) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [tenancyViewMore, setTenancyViewMore] = useState(false);

  const onClickTenancyViewMore = () => {
    setTenancyViewMore(!tenancyViewMore);
  };

  const onSlideChange = (value) => {
    const activeIndex = _.get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  return (
    <div className="pb-7 relative">
      <CustomText textClassName="section-title">
        {t("myStay.myTenancy")}
      </CustomText>

      <Swiper
        className="mySwiper global-box-shadow global-border-radius cursor-grab primaryWhite-bg-color"
        onSlideChange={onSlideChange}
        style={{ width: "100%" }}
      >
        {_.map(data, (item, index) => {
          const tenancyId = tenancySelector.getId(item);
          const tenancyCode = tenancySelector.getTenancyCode(item);
          const propertyName = tenancySelector.getPropertyName(item);
          const unitName = tenancySelector.getUnitName(item);
          const roomName = tenancySelector.getRoomName(item);
          const tenancyPeriod = tenancySelector.getTenancyPeriod(item);
          const rental = tenancySelector.getInitialRentalFee(item);
          const tenancyRemaining = tenancySelector.getTenancyRemainingDay(item);
          const totalDays = tenancySelector.getTotalDays(item);

          return (
            <SwiperSlide key={index}>
              <div className="tenancy-container">
                {/*<CustomImage*/}
                {/*  src={Images.moreIcon}*/}
                {/*  width={25}*/}
                {/*  height={25}*/}
                {/*  className="absolute right-4 top-3 cursor-pointer"*/}
                {/*  onClick={onClickTenancyViewMore}*/}
                {/*/>*/}

                <div className="flex flex-col items-start pr-3">
                  <div className="primary-bg-color p-2 global-border-radius mb-1 cursor-pointer">
                    <CustomImage
                      src={Images.buildingIcon}
                      width={35}
                      height={35}
                      onClick={() => onClickGoToMyTenancy(tenancyId)}
                    />
                  </div>

                  <div className={"pb-2"}>
                    <CustomText textClassName="font-bold font-size-small primary-text">
                      {_.isEmpty(propertyName) ? "-" : propertyName}
                    </CustomText>
                    <CustomText textClassName="font-size-xsmall">
                      {_.isEmpty(unitName) ? "" : unitName}
                      {_.isEmpty(roomName) ? "" : ", " + roomName}
                    </CustomText>
                  </div>

                  <CustomLabelValue
                    label={t("myStay.tenancyCode")}
                    value={_.isEmpty(tenancyCode) ? "-" : tenancyCode}
                    highlight
                  />

                  <CustomLabelValue
                    label={t("myStay.tenancyPeriod")}
                    value={_.isEmpty(tenancyPeriod) ? "-" : tenancyPeriod}
                    highlight
                  />

                  <CustomLabelValue
                    label={t("myStay.rentalFee")}
                    value={`RM${_.isEmpty(rental) ? "0" : rental}`}
                    highlight
                  />

                  {/*<AutoPayButton*/}
                  {/*  onChangeAutoPay={onChangeAutoPay}*/}
                  {/*  isChecked={isChecked}*/}
                  {/*/>*/}
                </div>

                <div
                  className="flex-1 flex justify-center items-center"
                  ref={targetRef}
                >
                  <RadialProgressComponent
                    t={t}
                    dimensions={dimensions}
                    tenancyRemaining={tenancyRemaining}
                    totalDays={totalDays}
                  />
                </div>

                {/*{tenancyViewMore ? (*/}
                {/*  <CustomDropdown*/}
                {/*    items={[*/}
                {/*      { title: "Overview", function: onClickGoToMyTenancy },*/}
                {/*    ]}*/}
                {/*    top={40}*/}
                {/*  />*/}
                {/*) : (*/}
                {/*  false*/}
                {/*)}*/}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {_.size(data) > 1 ? (
        <div className="mt-5 flex justify-center items-center">
          {_.map(data, (item, index) => {
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
