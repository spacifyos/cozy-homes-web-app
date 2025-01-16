import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import MessageTimeLine from "@/components/AppointmentDetail/MessageTimeLine";
import CustomButton from "@/components/CustomButton";
import BookingInput from "@/components/Booking/BookingInput";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const CommentComponent = ({
  chatList,
  onClickSendMessage,
  setMessageValue,
  messageValue,
  data,
  postCommentLoading,
  getCommentLoading,
}) => {
  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
      <CustomText textClassName="disable-text text-sm">Comment</CustomText>
      <div
        className="divider-line "
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      {getCommentLoading ? (
        <div className="flex justify-center items-center py-4 primary-text">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isEmpty(data) ? (
        <CustomEmptyBox emptyTitle="No comment found" />
      ) : (
        map(data, (item) => {
          return <MessageTimeLine item={item} />;
        })
      )}

      {isEmpty(data) ? (
        false
      ) : (
        <div className="flex justify-center items-center pt-2 gap-4">
          <BookingInput
            placeholder="Message"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <CustomButton
            buttonClassName="primary-btn max-w-20 w-20 min-h-10 h-10"
            buttonText="Send"
            onClick={onClickSendMessage}
            loading={postCommentLoading}
            disable={postCommentLoading}
          />
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
