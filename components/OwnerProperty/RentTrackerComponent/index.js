import { map } from "lodash";
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

  const data = [
    { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" },
    { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" },
    { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" },
    { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" },
  ];

  return (
    <div className="">
      <div className="overflow-x-auto hide-scroll-bar pb-3 px-4">
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
