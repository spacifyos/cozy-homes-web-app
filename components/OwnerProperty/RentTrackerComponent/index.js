import { map, size, get, isEmpty } from "lodash";
import CustomText from "@/components/CustomText";
import * as ownerSelector from "@/src/selectors/owner";
import BookingSelect from "@/components/Booking/BookingSelect";

const VerticalLine = () => {
  return (
    <div
      className="mx-2"
      style={{
        width: 1,
        height: "100%",
        backgroundColor: "#EFEFEF",
      }}
    ></div>
  );
};

const HorizontalLine = () => {
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#EFEFEF",
      }}
      className="my-2"
    ></div>
  );
};

const yearList = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
  { label: "2030", value: "2030" },
];

const RentTrackerComponent = ({ data, yearValue, setYearValue, colorList }) => {
  const monthlyTotal = ownerSelector.getMonthlyTotal(data);
  const monthlyTotalLabel = map(monthlyTotal, (label) =>
    ownerSelector.getLabel(label),
  );
  const monthlyTotalAmount = map(monthlyTotal, (amount) =>
    ownerSelector.getAmount(amount),
  );

  const titleList = ["Room / Room Type", "Tenant", ...monthlyTotalLabel];
  const totalRentalList = ["", "", ...monthlyTotalAmount];
  const roomList = ownerSelector.getRentDetail(data);

  return (
    <div className="">
      <div className="xl:flex-row md:flex-row lg:flex-row md:flex-row sm:flex-col flex-col flex justify-between xl:items-center lg:items-center md:items-center gap-2 pb-2">
        <div className="flex gap-4 pl-2">
          {map(colorList, (item, index) => {
            const label = get(item, ["label"], "");
            const bgColor = get(item, ["bgColor"], "");
            const textColor = get(item, ["textColor"], "");

            return (
              <div key={index} className="flex items-center ">
                <div
                  className={`${bgColor} rounded-3xl mr-1`}
                  style={{ width: 10, height: 10 }}
                ></div>
                <CustomText
                  textClassName={`${textColor} xl:text-base lg:text-base md:text-sm sm:text-sm text-sm`}
                >
                  {label}
                </CustomText>
              </div>
            );
          })}
        </div>

        <BookingSelect
          lists={yearList}
          value={yearValue}
          onChange={(e) => setYearValue(e.target.value)}
          className="xl:max-w-40 lg:max-w-40 md:max-w-40 sm:max-w-36 max-w-36 "
        />
      </div>

      <div className="overflow-x-auto hide-scroll-bar pb-4 px-1">
        <div
          className="p-4 primaryWhite-bg-color global-box-shadow global-border-radius flex flex-col mb-3"
          style={{ width: 1293 }}
        >
          <div className="flex">
            {map(titleList, (item, index) => {
              return (
                <div className="flex justify-center items-center" key={index}>
                  <CustomText
                    textClassName="text-sm text-center"
                    styles={{ width: index === 0 || index === 1 ? 100 : 70 }}
                  >
                    {item}
                  </CustomText>
                  {size(titleList) === index + 1 ? false : <VerticalLine />}
                </div>
              );
            })}
          </div>

          <HorizontalLine />

          <div className="flex">
            {map(totalRentalList, (item, index) => {
              return (
                <div className="flex justify-center" key={index}>
                  <CustomText
                    textClassName="text-sm text-center primary-text"
                    styles={{ width: index === 0 || index === 1 ? 100 : 70 }}
                  >
                    {item}
                  </CustomText>

                  {size(totalRentalList) === index + 1 ? (
                    false
                  ) : (
                    <VerticalLine />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {map(roomList, (item, index) => {
          const room = get(item, ["room"], "");
          const roomType = get(item, ["room_type"], "");
          const tenants = get(item, ["tenant"], []);

          return (
            <div
              className={`p-4 primaryWhite-bg-color global-box-shadow global-border-radius flex flex-col ${size(roomList) === index + 1 ? "" : "mb-3"}`}
              style={{ width: 1293 }}
              key={index}
            >
              <div className="flex">
                <div className="flex justify-center items-center">
                  <div style={{ width: 100 }}>
                    <CustomText textClassName="text-sm primary-text font-bold">
                      {room}
                    </CustomText>
                    <CustomText textClassName="text-xs">{roomType}</CustomText>
                  </div>

                  <VerticalLine />

                  <div className="flex flex-col h-full">
                    {map(tenants, (tenant, tenantIndex) => {
                      const tenantName = get(tenant, ["tenant_name"], "");
                      const rentals = get(tenant, ["rental"], []);

                      return (
                        <div className="flex flex-col h-full" key={tenantIndex}>
                          <div className="flex justify-center items-center h-full">
                            <CustomText
                              textClassName="text-center"
                              styles={{ width: 100 }}
                              lineClamp={2}
                            >
                              {isEmpty(tenantName) ? "-" : tenantName}
                            </CustomText>

                            <VerticalLine />

                            {map(rentals, (rental, rentalIndex) => {
                              const amount = ownerSelector.getRental(rental);

                              const renderTextColor = () => {
                                const status = ownerSelector.getStatus(rental);

                                switch (status) {
                                  case "full_paid":
                                    return "power-on-text";
                                  case "overdue":
                                    return "error-text";
                                  case "coming_due":
                                    return "pending-text";
                                  default:
                                    return "black-text";
                                }
                              };

                              return (
                                <div
                                  className="h-full flex items-center"
                                  key={rentalIndex}
                                >
                                  <CustomText
                                    textClassName={`text-sm text-center ${renderTextColor()}`}
                                    styles={{ width: 70 }}
                                  >
                                    {isEmpty(amount) ? "0" : amount}
                                  </CustomText>

                                  {size(rentals) === rentalIndex + 1 ? (
                                    false
                                  ) : (
                                    <VerticalLine />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {size(tenants) === tenantIndex + 1 ? (
                            false
                          ) : (
                            <HorizontalLine />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentTrackerComponent;
