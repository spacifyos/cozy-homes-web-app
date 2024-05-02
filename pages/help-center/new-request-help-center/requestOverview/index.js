import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import CustomImage from "@/components/CustomImage";
import { useState } from "react";
import moment from "moment";
import CustomButton from "@/components/CustomButton";
import MessageTimeLine from "@/components/AppointmentDetail/MessageTimeLine";
import _ from "lodash";
import BookingSelect from "@/components/Booking/BookingSelect";

export { getServerSideProps };

const RequestOverview = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const chatList = [
    {
      date: "10 Dec 23, 10.02am",
      img: Images.filterDefaultImage,
      name: "Joan Lim",
      chat: "Hi, may I know when the technician can come?",
      icon: Images.ellipseGreenIcon,
      identity: "other",
    },
    {
      date: "10 Dec 23,  10.11am",
      img: Images.agentIcon,
      name: "Admin",
      chat: "Hi Joan, we're currently arranging a technician for you. We'll provide an update on the status soon.",
      identity: "agent",
    },
    {
      date: "10 Dec 23, 11.36am",
      img: Images.filterDefaultImage,
      name: "Joan Lim",
      chat: "Thank you for the reply.",
      icon: Images.ellipseGreenIcon,
      identity: "other",
    },
  ];
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const [timeValue, setTimeValue] = useState(
    moment(new Date()).format("hh:mm"),
  );
  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };
  const onChangeTime = (e) => {
    setTimeValue(e.target.value);
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.requestOverview")}
      hideBgImage
      rightButtonIcon={Images.downloadIcon}
      rightSecondButtonIcon={Images.chatIcon}
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-4">
        <div className=" global-border global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
          <div className="flex justify-between">
            <CustomLabelValue label={t("requestOverview.requestNumber")} value="RQ-230000007" />
            <CustomLabelValue label={t("requestOverview.status")} value={t("requestOverview.newRequest")} />
          </div>
          <div
            className="divider divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="flex justify-between items-center">
            <CustomText textClassName="disable-text font-size-xxsmall">
              {t("requestOverview.basicInformation")}
            </CustomText>
            <StatusLabelOutline status={t("requestOverview.critical")}/>
          </div>
          <div
            className="divider divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="flex justify-between">
            <div>
              <CustomText textClassName="disable-text font-size-xxsmall">
                {t("requestOverview.requester")}
              </CustomText>
              <CustomText textClassName="font-size-small font-bold pb-2">
                Joan Lim
              </CustomText>
            </div>
            <CustomLabelValue label={t("requestOverview.requestDate")} value="10 DEC 2023" />
          </div>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("requestOverview.property")}
          </CustomText>
          <CustomText textClassName="font-size-small font-bold pb-2">
            Icon City, A-01-01, Room 1
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("requestOverview.linkEquipment")}
          </CustomText>
          <CustomText textClassName="font-size-small font-bold pb-2">
            {t("requestOverview.none")}
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("requestOverview.none")}
          </CustomText>
          <CustomText textClassName="font-size-small font-bold pb-4">
            {t("requestOverview.maintenanceAmenitiesWasherNotWorking")}
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("requestOverview.requestDetails")}
          </CustomText>
          <CustomText textClassName="font-size-small font-bold pb-2">
            {t("requestOverview.notWorkingFor2Weeks")}
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall pb-1">
            {t("requestOverview.photosOrVideos")}
          </CustomText>
          <div className="flex items-start gap-2 pb-3">
            <CustomImage
              src={Images.washer}
              width={60}
              height={60}
              className="global-border-radius"
            />
            <CustomImage
              src={Images.washerVideoImages}
              width={60}
              height={60}
              className="global-border-radius"
            />
          </div>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("requestOverview.authorizedEntryWhenRequesterIsAbsent")}
          </CustomText>
          <CustomText textClassName="font-size-small font-bold pb-2">
            {t("requestOverview.yes")}
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("requestOverview.availability")}
          </CustomText>
          <CustomText textClassName="font-size-small font-bold pb-2 primary-text">
            12 Dec 2023, 8.30am -12.00pm
          </CustomText>
        </div>
        <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
          <div className="flex justify-between items-center">
            <CustomText textClassName="disable-text font-size-small">
              {t("requestOverview.maintenanceScheduleInformation")}
            </CustomText>
            <CustomImage
              src={Images.refreshIconActive}
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <div
            className="divider divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>
          <BookingSelect
            title={t("requestOverview.technician")}
            placeholder={t("requestOverview.selectTechnician")}
            lists={[{ name: "Daniel", value: "daniel" }]}
          />
          <CustomText textClassName="input-title">{t("requestOverview.date")}</CustomText>
          <div className="flex items-center global-border-radius p-2 relative mb-3 booking-input pb-1">
            <input
              className="bg-color flex-1 w-full resize-input-icon"
              type="date"
              value={dateValue}
              onChange={onChangeDate}
            />

            <CustomImage
              src={Images.calendarIcon}
              imageStyle={{ width: 20, height: 20, marginRight: 4 }}
            />
          </div>
          <BookingSelect
            title={t("requestOverview.time")}
            placeholder={t("requestOverview.selectTime")}
            lists={[{ name: "8:30am - 12.00pm", value: "8:30am - 12.00pm" }]}
          />
          <div className="flex flex-col justify-center items-center">
            <CustomButton
              buttonStyles={{ padding: "5px 30px" }}
              buttonClassName="disable-btn my-2"
              buttonText={t("requestOverview.assign")}
            />
            <CustomText textClassName="disable-text font-size-xxsmall">
              {t("requestOverview.maintenanceScheduleInformationWillBeUpdatedSoon")}
            </CustomText>
          </div>
        </div>
        <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
          <CustomText textClassName="disable-text font-size-small">
            {t("requestOverview.comment")}
          </CustomText>
          <div
            className="divider divider-line "
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>
          {_.map(chatList, (item) => {
            return <MessageTimeLine item={item} />;
          })}

          <div className="flex flex-col justify-center items-center pt-2">
            <CustomButton
              buttonStyles={{ padding: "5px 30px" }}
              buttonClassName="primary-btn mb-2"
              buttonText={t("requestOverview.startComment")}
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(RequestOverview);
