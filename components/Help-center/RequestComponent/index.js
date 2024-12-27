import DividerSection from "@/components/Help-center/DividerSection";
import BookingTextArea from "@/components/BookingTextArea";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Helper from "@/src/utils/Helper";
import Constant from "@/src/utils/Constant";

const SpecificRequestComponent = ({
  selectNestedHelpCenterSection,
  onClickChangeUploadModalTitle,
  setPostData,
}) => {
  // const displayComponent = (value) => {
  //   const requestSelect = {
  //     t: t,
  //     placeholder: t(`newRequest.select${value}`),
  //     lists: [],
  //   };
  //
  //   switch (value) {
  //     case "Amenities":
  //       requestSelect.title = t("newRequest.selectAmenities");
  //       requestSelect.lists = [
  //         { label: t("newRequest.washer"), value: "washer" },
  //         { label: t("newRequest.dryer"), value: "dryer" },
  //         { label: t("newRequest.oven"), value: "oven" },
  //         { label: t("newRequest.airConditioner"), value: "airConditioner" },
  //         { label: t("newRequest.waterHeater"), value: "waterHeater" },
  //         { label: t("newRequest.cellingFan"), value: "cellingFan" },
  //       ];
  //       break;
  //     case "Electrical":
  //       requestSelect.title = t("newRequest.selectElectrical");
  //       requestSelect.lists = [
  //         { label: t("newRequest.lights"), value: "lights" },
  //         { label: t("newRequest.wellSocket"), value: "well socket" },
  //         { label: t("newRequest.wiring"), value: "wiring" },
  //         { label: t("newRequest.smartMeter"), value: "smart meter" },
  //       ];
  //       break;
  //     case "Plumbing":
  //       requestSelect.title = t("newRequest.selectPlumbing");
  //       requestSelect.lists = [
  //         { label: t("newRequest.leaking"), value: "leaking" },
  //         { label: t("newRequest.faucets"), value: "faucets" },
  //         { label: t("newRequest.pipes"), value: "pipes" },
  //         { label: t("newRequest.pumps"), value: "pumps" },
  //       ];
  //       break;
  //     case "Exterior&Interior":
  //       requestSelect.title = t("newRequest.selectExterior&Interior");
  //       requestSelect.lists = [
  //         { label: t("newRequest.doors"), value: "doors" },
  //         { label: t("newRequest.windows"), value: "windows" },
  //         { label: t("newRequest.flooring"), value: "flooring" },
  //         { label: t("newRequest.wall"), value: "wall" },
  //       ];
  //       break;
  //     case "Cleaning":
  //       requestSelect.title = t("newRequest.selectCleaning");
  //       requestSelect.lists = [
  //         { label: t("newRequest.bedroom"), value: "bedroom" },
  //         { label: t("newRequest.washroom"), value: "washroom" },
  //       ];
  //       break;
  //     default:
  //       return null;
  //   }
  //
  //   return (
  //     <BookingSelect
  //       {...requestSelect}
  //       className="pb-2"
  //       bgColor="primaryWhite-bg-color"
  //     />
  //   );
  // };

  return selectNestedHelpCenterSection ? (
    <div>
      <DividerSection
        title={"Please Specific The Request"}
        subtitle={"Choose to specific the issue."}
      />

      {/*<BookingSelect*/}
      {/*  bgColor="primaryWhite-bg-color"*/}
      {/*  className="pb-2"*/}
      {/*  title={t("newRequest.selectIssue")}*/}
      {/*  placeholder={t("newRequest.selectIssue")}*/}
      {/*  lists={[{ name: t("newRequest.notWorking"), value: "not working" }]}*/}
      {/*/>*/}

      <BookingSelect
        bgColor="primaryWhite-bg-color"
        className="pb-2"
        title={"Select Priority"}
        placeholder={"Select Priority"}
        disabled={false}
        lists={[
          { label: "Critical", value: Constant.CRITICAL },
          { label: "High", value: Constant.HIGH },
          { label: "Normal", value: Constant.NORMAL },
          { label: "Low", value: Constant.LOW },
        ]}
        onChange={(e) => {
          setPostData((prevState) => {
            return {
              ...prevState,
              priority: e.target.value,
            };
          });
        }}
      />

      <BookingTextArea
        bgColor="primaryWhite-bg-color"
        className="pb-2"
        title={"Describe The Issue"}
        placeholder={"Enter your message"}
        onChange={(e) => {
          setPostData((prevState) => {
            const { request_type } = prevState;

            return {
              ...prevState,
              ...{
                [`${request_type === 1 ? "description" : "issues_description"}`]:
                  e.target.value,
              },
            };
          });
        }}
      />

      <CustomText textClassName="pb-2 text-xs">
        {"Upload Photo (max file size: 2MB,up to 5 photo):"}
      </CustomText>

      <div className=" flex flex-row items-center gap-2 pb-3">
        <CustomImage
          src={Images.imageNotFound}
          imageStyle={{ width: 100, height: 100 }}
          className="global-border-radius border"
        />
        <div
          className="bg-color global-border-radius cursor-pointer flex items-center justify-center"
          style={{ width: 100, height: 100 }}
          onClick={() => {
            Helper.documentGetElementById(
              "help_center_upload_modal",
            ).showModal();
            onClickChangeUploadModalTitle(true);
          }}
        >
          <CustomImage
            src={Images.plusIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
        </div>
      </div>

      <CustomText textClassName="pb-2 text-xs">
        {"Upload Video (max file size: 2MB, up to 2 video):"}
      </CustomText>

      <div className=" flex flex-row items-center gap-2  pb-4">
        <CustomImage
          src={Images.imageNotFound}
          imageStyle={{ width: 100, height: 100 }}
          className="global-border-radius border"
        />

        <div
          className="bg-color global-border-radius cursor-pointer flex items-center justify-center"
          style={{ width: 100, height: 100 }}
          onClick={() => {
            Helper.documentGetElementById(
              "help_center_upload_modal",
            ).showModal();
            onClickChangeUploadModalTitle(false);
          }}
        >
          <CustomImage
            src={Images.plusIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
        </div>
      </div>
    </div>
  ) : (
    false
  );
};

export default SpecificRequestComponent;
