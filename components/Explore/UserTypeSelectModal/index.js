import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Constant from "@/src/utils/Constant";

const UserTypeSelectModal = () => {
  return (
    <DesktopModal id="user_type_modal">
      <div className="p-6">
        <form method="dialog" className={`flex justify-end`}>
          <button className="btn btn-sm btn-circle btn-ghost right-2">
            <CustomImage
              src={Images.cancelIcon}
              imageStyle={{ width: 20, height: 20 }}
            />
          </button>
        </form>

        <div className={`flex flex-col items-center primaryWhite-bg-color`}>
          <CustomText
            styles={{ fontSize: 30 }}
            textClassName="italic font-bold primary-text"
          >
            Welcome To
          </CustomText>

          <CustomImage
            src={Images.logoHorizontalColor}
            imageStyle={{ width: 140 }}
            className="mb-4"
          />

          <div className="global-box-shadow global-border-radius mb-6 w-full cursor-pointer">
            <CustomImage
              src={Images.tenantCard}
              imageStyle={{ width: "100%", borderRadius: 15 }}
            />
          </div>

          <div className="global-box-shadow global-border-radius w-full cursor-pointer">
            <CustomImage
              src={Images.ownerCard}
              imageStyle={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </DesktopModal>
  );
};

export default UserTypeSelectModal;
