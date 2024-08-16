import { map, size, get } from "lodash";
import moment from "moment";
import CustomText from "@/components/CustomText";

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
      room: { room: "Master Room", room_type: "Queen Room" },
      tenant: [],
    },
    {
      room: { room: "Master Room", room_type: "Queen Room" },
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
      room: { room: "Master Room", room_type: "Queen Room" },
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
                  {size(titleList) === index + 1 ? (
                    false
                  ) : (
                    <div
                      className="mx-2"
                      style={{
                        width: 1,
                        height: "100%",
                        backgroundColor: "#EFEFEF",
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            style={{ height: 1, width: "100%", backgroundColor: "#EFEFEF" }}
            className="my-2"
          ></div>

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
                    <div
                      className="mx-2"
                      style={{
                        width: 1,
                        height: "100%",
                        backgroundColor: "#EFEFEF",
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {map(data, (item) => {
          const room = get(item, ["room", "room"], "");
          const roomType = get(item, ["room", "room_type"], "");
          const tenants = get(item, ["tenant"], []);

          return (
            <div
              className="p-4 primaryWhite-bg-color global-box-shadow global-border-radius flex flex-col mb-3"
              style={{ width: 1293 }}
            >
              <div className="flex">
                {map(titleList, (item, index) => {
                  return (
                    <div className="flex justify-center items-center">
                      {index === 0 ? (
                        <div
                          style={{
                            width: index === 0 || index === 1 ? 100 : 70,
                          }}
                        >
                          <CustomText textClassName="font-size-small primary-text font-bold">
                            {room}
                          </CustomText>
                          <CustomText textClassName="font-size-xxsmall">
                            {roomType}
                          </CustomText>
                        </div>
                      ) : (
                        map(tenants, (tenant, tenantIndex) => {
                          const tenantName = get(tenant, ["tenant_name"], "");
                          const rental = get(tenant, ["rental"], []);

                          return (
                            <CustomText textClassName="font-size-small primary-text font-bold">
                              {tenantName}
                            </CustomText>
                          );
                        })
                      )}

                      {size(titleList) === index + 1 ? (
                        false
                      ) : (
                        <div
                          className="mx-2"
                          style={{
                            width: 1,
                            height: "100%",
                            backgroundColor: "#EFEFEF",
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}
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
