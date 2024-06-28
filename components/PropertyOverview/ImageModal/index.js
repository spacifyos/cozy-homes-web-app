import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import Helper from "@/src/utils/Helper";

const ImageModal = ({ data }) => {
  return (
    <dialog id="image_modal" className="modal">
      {/*<Swiper*/}
      {/*  navigation={true}*/}
      {/*  modules={[Navigation]}*/}
      {/*  className="mySwiper"*/}
      {/*  style={{ width: "100%" }}*/}
      {/*>*/}
      {/*  {_.map(data, (item) => {*/}
      {/*    return (*/}
      {/*      <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>*/}
      <CustomImage
        src={data}
        imageStyle={{ width: "100%", height: "80vh", objectFit: "contain" }}
      />
      {/*      </SwiperSlide>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Swiper>*/}

      <div
        className="absolute top-1 right-1 z-10 w-10 h-10 flex items-center justify-center rounded cursor-pointer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={() => Helper.documentGetElementById("image_modal").close()}
      >
        <CustomText textClassName="font-size-xxlarge white-text">X</CustomText>
      </div>
    </dialog>
  );
};

export default ImageModal;
