import { map, size, get } from "lodash";
import moment from "moment";
import CustomText from "@/components/CustomText";

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

const RentTrackerComponent = () => {
  const generateYearArray = () => {
    const yearArray = [];
    for (let month = 0; month < 12; month++) {
      const date = moment().startOf("year").add(month, "months");
      yearArray.push(date.format("MMM YYYY"));
    }
    return yearArray;
  };

  const titleList = ["Room / Room Type", "Tenant", ...generateYearArray()];

  const totalRentalList = [
    "",
    "",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
    "3,500",
  ];

  const data = [
    {
      room: "Master Room",
      room_type: "Queen Room",
      tenant: [
        { tenant_name: "-", rental: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      ],
    },
    {
      room: "Master Room",
      room_type: "Queen Room",
      tenant: [
        {
          tenant_name: "John Doe",
          rental: [
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
          ],
        },
      ],
    },
    {
      room: "Master Room",
      room_type: "Queen Room",
      tenant: [
        {
          tenant_name: "John Doe",
          rental: [
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
          ],
        },
        {
          tenant_name: "Max Teoh",
          rental: [
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
          ],
        },
        {
          tenant_name: "Max Teoh",
          rental: [
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
            "900",
          ],
        },
      ],
    },
  ];

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
                <div className="flex justify-center items-center">
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
                <div className="flex justify-center">
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

        {map(data, (item, index) => {
          const room = get(item, ["room"], "");
          const roomType = get(item, ["room_type"], "");
          const tenants = get(item, ["tenant"], []);

          return (
            <div
              className={`p-4 primaryWhite-bg-color global-box-shadow global-border-radius flex flex-col ${size(data) === index + 1 ? "" : "mb-3"}`}
              style={{ width: 1293 }}
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
                        <div className="flex flex-col h-full">
                          <div className="flex justify-center items-center h-full">
                            <CustomText
                              textClassName="text-center"
                              styles={{ width: 100 }}
                              lineClamp={2}
                            >
                              {tenantName}
                            </CustomText>

                            <VerticalLine />

                            {map(rentals, (rental, rentalIndex) => {
                              return (
                                <div className="h-full flex items-center">
                                  <CustomText
                                    textClassName="font-size-small text-center"
                                    styles={{ width: 70 }}
                                  >
                                    {rental}
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

        {/*<table className="table">*/}
        {/*  <thead>*/}
        {/*    <tr>*/}
        {/*      <th>*/}
        {/*        <CustomText>Room/Room Type</CustomText>*/}
        {/*      </th>*/}
        {/*      <th>*/}
        {/*        <CustomText>Tenant</CustomText>*/}
        {/*      </th>*/}
        {/*      {map(generateYearArray(), (item) => {*/}
        {/*        return (*/}
        {/*          <th>*/}
        {/*            <CustomText>{item}</CustomText>*/}
        {/*          </th>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody>*/}
        {/*    <tr className="">*/}
        {/*      <td>*/}
        {/*        <CustomText></CustomText>*/}
        {/*      </td>*/}
        {/*      <td>*/}
        {/*        <CustomText></CustomText>*/}
        {/*      </td>*/}
        {/*      {map(Array(12), (item) => {*/}
        {/*        return (*/}
        {/*          <td>*/}
        {/*            <CustomText>3.500.00</CustomText>*/}
        {/*          </td>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </tr>*/}
        {/*    {map(data, (item) => {*/}
        {/*      return (*/}
        {/*        <tr>*/}
        {/*          <td>*/}
        {/*            <CustomText textClassName="primary-text font-bold">*/}
        {/*              Cy Ganderton*/}
        {/*            </CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*          <td>*/}
        {/*            <CustomText>a</CustomText>*/}
        {/*          </td>*/}
        {/*        </tr>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </tbody>*/}
        {/*</table>*/}
      </div>
    </div>
  );
};

export default RentTrackerComponent;
