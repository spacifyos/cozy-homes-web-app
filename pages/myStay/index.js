import CustomHeader from "@/components/CustomHeader";
import UserComponent from "@/components/MyStay/UserComponent";
import TenancyComponent from "@/components/MyStay/TenancyComponent";

const MyStay = () => {
  return (
    <CustomHeader pageTitle={"My Stay"}>
      <UserComponent />

      <TenancyComponent />
    </CustomHeader>
  );
};

export default MyStay;
