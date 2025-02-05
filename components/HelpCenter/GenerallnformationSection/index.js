import CustomText from "@/components/CustomText";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLabelValue from "@/components/CustomLabelValue";
import BookingSelect from "@/components/Booking/BookingSelect";
const GeneralInformationSection = ({ tenancyOption, setPostData }) => {
  return (
    <div>
      <CustomText textClassName="second-section-title text-primary pb-2">
        General Information
      </CustomText>

      <CustomLabelValue label={"Requester"} value="Joan Lim" />

      <BookingSelect
        title={"Tenancy"}
        placeholder={"Select tenancy"}
        lists={tenancyOption}
        disabled={false}
        bgColor="bg-white"
        className="pb-2"
        onChange={(e) =>
          setPostData((prevState) => {
            return {
              ...prevState,
              ...JSON.parse(e.target.value),
            };
          })
        }
      />

      {/*<BookingSelect*/}
      {/*  title={"Link Equipment"}*/}
      {/*  placeholder={"Select Link Equipment"}*/}
      {/*  lists={[{ name: "None", value: "none" }]}*/}
      {/*  bgColor="bg-white"*/}
      {/*  className="pb-2"*/}
      {/*/>*/}
    </div>
  );
};

export default GeneralInformationSection;
