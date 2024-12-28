import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const EventBanner = () => {
  return (
    <dialog id="event-modal" className="modal">
      <div
        className="modal-box"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn default-btn"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <CustomImage
                src={Images.closeIconWhite}
                className="w-4 h-4 cursor-pointer"
              />
            </button>
          </form>
        </div>
        <a href={`https://wa.me/+601137354267`} target="_blank">
          <CustomImage
            src={"/images/event-image/spacify-event-1.png"}
            className="h-full object-contain"
          />
        </a>
      </div>
    </dialog>
  );
};

export default EventBanner;
