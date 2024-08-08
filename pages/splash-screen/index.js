import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const SplashScreen = () => {
  return (
    <div
      className="flex justify-center items-start h-screen"
      style={{ paddingTop: "35%" }}
    >
      <div>
        <CustomImage src={Images.logoImage} imageStyle={{ width:180 }} />
      </div>
    </div>
  );
};

export default SplashScreen;
