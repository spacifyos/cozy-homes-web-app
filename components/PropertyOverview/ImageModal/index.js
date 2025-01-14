import CustomText from "@/components/CustomText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { get, map, size } from "lodash";
import Image from "next/image";

const ImageModal = ({
  data,
  selectedImage,
  onClickCloseImageModal,
  openImageModal,
}) => {
  return openImageModal ? (
    <div
      className="h-full fixed inset-0 z-10 flex-1 h-screen overflow-hidden flex flex-col justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper image-modal-swiper"
        style={{ width: "100%", height: "100%" }}
        initialSlide={selectedImage}
      >
        {map(data, (item, index) => {
          const image = get(item, ["image"], "");

          return (
            <SwiperSlide
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="relative"
                style={{
                  width: "100%",
                  height: "80%",
                }}
              >
                <Image
                  loader={() => image}
                  alt={image}
                  src={image}
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                  fill
                />
              </div>
              <CustomText textClassName="text-white pt-2">{`${index + 1}/${size(data)}`}</CustomText>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div></div>

      <div
        className="absolute top-1 right-1 z-10 w-10 h-10 flex items-center justify-center rounded cursor-pointer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={onClickCloseImageModal}
      >
        <CustomText textClassName="text-lg text-white">X</CustomText>
      </div>
    </div>
  ) : (
    false
  );
};

export default ImageModal;
