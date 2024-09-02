import { map, size, get, isEmpty } from "lodash";
import CustomText from "@/components/CustomText";
import * as ownerSelector from "@/src/selectors/owner";

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

const RentTrackerComponent = ({ data }) => {
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
      <div className="overflow-x-auto hide-scroll-bar pb-4 px-4">
        <div
          className="p-4 primaryWhite-bg-color global-box-shadow global-border-radius flex flex-col mb-3"
          style={{ width: 1293 }}
        >
          <div className="flex">
            {map(titleList, (item, index) => {
              return (
                <div className="flex justify-center items-center" key={index}>
                  <CustomText
                    textClassName="font-size-small text-center"
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
                    textClassName="font-size-small text-center primary-text"
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
                    <CustomText textClassName="font-size-small primary-text font-bold">
                      {room}
                    </CustomText>
                    <CustomText textClassName="font-size-xxsmall">
                      {roomType}
                    </CustomText>
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
                                  case "full_paid":
                                    return "black-text";
                                }
                              };

                              return (
                                <div
                                  className="h-full flex items-center"
                                  key={rentalIndex}
                                >
                                  <CustomText
                                    textClassName={`font-size-small text-center ${renderTextColor()}`}
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
