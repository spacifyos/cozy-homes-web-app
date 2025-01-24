import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import MessageTimeLine from "@/components/AppointmentDetail/MessageTimeLine";
import CustomButton from "@/components/CustomButton";
import BookingInput from "@/components/Booking/BookingInput";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";

const CommentComponent = ({
  onClickSendMessage,
  setMessageValue,
  messageValue,
  data,
  pagination,
  postCommentLoading,
  getCommentLoading,
  onClickLoadMore,
}) => {
  const hasMorePage = maintenanceTicketSelector.getHasMorePages(pagination);
  const lastPage = maintenanceTicketSelector.getLastPage(pagination);
  const currentPage = maintenanceTicketSelector.getCurrentPage(pagination);

  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
      <CustomText textClassName="disable-text text-sm">Comment</CustomText>
      <div
        className="divider-line "
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      {getCommentLoading && isEmpty(data) ? (
        <div className="flex justify-center items-center py-4 primary-text">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isEmpty(data) ? (
        <div className="py-10">
          <CustomEmptyBox emptyTitle="No comment found" emptyDesc="" />
        </div>
      ) : (
        map(data, (item) => {
          return <MessageTimeLine item={item} />;
        })
      )}

      {hasMorePage && lastPage > currentPage && !isEmpty(data) ? (
        <div className="flex justify-center py-4">
          {getCommentLoading && !isEmpty(data) ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            <div
              onClick={() => onClickLoadMore(currentPage)}
              className="cursor-pointer"
            >
              <CustomText textClassName="disable-text xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
                Load more
              </CustomText>
            </div>
          )}
        </div>
      ) : (
        false
      )}

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
    </div>
  );
};

export default CommentComponent;
