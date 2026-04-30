import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Icons from "@/components/Icons";

const UserTypeSelectSection = ({ setSelectedUserType }) => {
  return (
    <div className="p-6">
      <form method="dialog" className={`flex justify-end`}>
        <button className="btn btn-sm btn-circle btn-ghost right-2">
          <CustomImage
            src={Icons.closeIconBlack}
            imageStyle={{ width: 20, height: 20 }}
          />
        </button>
      </form>

      <div className={`flex flex-col items-center bg-white`}>
        <CustomText
          styles={{ fontSize: 30 }}
          textClassName="italic font-bold text-primary"
        >
          Welcome To
        </CustomText>

        <CustomImage
          src={Images.logoHorizontalColor}
          imageStyle={{ width: 140 }}
          className="mb-4"
        />

        <div
          className="global-box-shadow global-border-radius mb-6 w-full cursor-pointer"
          onClick={() => setSelectedUserType("Tenant")}
        >
          <CustomImage
            src={Images.tenantCard}
            imageStyle={{ width: "100%", borderRadius: 15 }}
          />
        </div>

        <div
          className="global-box-shadow global-border-radius w-full cursor-pointer"
          onClick={() => setSelectedUserType("Owner")}
        >
          <CustomImage src={Images.ownerCard} imageStyle={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelectSection;
