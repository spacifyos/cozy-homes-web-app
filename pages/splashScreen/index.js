import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const SplashScreen = () => {
  return (
    <div
      className="primary-bg-color flex justify-center items-center"
      style={{ height: "100%" }}
    >
      <div>
        <CustomImage src={Images.logoImage} height={180} width={180} />
      </div>
    </div>
  );
};

export default SplashScreen;
