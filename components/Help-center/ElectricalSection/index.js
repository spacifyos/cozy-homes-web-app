import CustomButton from "@/components/CustomButton";
import AmenitiesComponent from "@/components/Help-center/AmenitiesComponent";
import RequestComponent from "@/components/Help-center/RequestComponent";
const ElectricalSection = ({
  t,
  onClickDisplayAmenitiesComponent,
  displayAmenitiesComponent,
  onChangeDate,
  dateValue,
  onChangeTime,
  timeValue,
  onClickToRequestOverview,
}) => {
  return (
    <div>
      <RequestComponent
        t={t}
        title={t("newRequest.selectElectrical")}
        lists={[
          { name: t("newRequest.lights"), value: "lights" },
          { name: t("newRequest.wellSocket"), value: "well socket" },
          { name: t("newRequest.wiring"), value: "wiring" },
          { name: t("newRequest.smartMeter"), value: "smart meter" },
        ]}
      />
      {displayAmenitiesComponent==="ElectricalSection" ? (
        <div>
          <AmenitiesComponent
            t={t}
            onChangeDate={onChangeDate}
            dateValue={dateValue}
            onChangeTime={onChangeTime}
            timeValue={timeValue}
            onClickToRequestOverview={onClickToRequestOverview}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <CustomButton
            buttonStyles={{ padding: "5px 30px" }}
            buttonClassName="primary-btn"
            buttonText={t("newRequest.continue")}
            onClick={()=>onClickDisplayAmenitiesComponent("ElectricalSection")}
          />
        </div>
      )}
    </div>
  );
};

export default ElectricalSection;
