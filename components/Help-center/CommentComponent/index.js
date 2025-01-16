import CustomText from "@/components/CustomText";
import {map} from "lodash";
import MessageTimeLine from "@/components/AppointmentDetail/MessageTimeLine";
import CustomButton from "@/components/CustomButton";

const CommentComponent = ({ chatList }) => {
  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
      <CustomText textClassName="disable-text text-sm">Comment</CustomText>
      <div
        className="divider-line "
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      {map(chatList, (item) => {
        return <MessageTimeLine item={item} />;
      })}

      <div className="flex flex-col justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn mb-2"
          buttonText="Send"
        />
      </div>
    </div>
  );
};

export default CommentComponent;
