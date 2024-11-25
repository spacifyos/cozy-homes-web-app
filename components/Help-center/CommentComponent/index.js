import CustomText from "@/components/CustomText";
import _ from "lodash";
import MessageTimeLine from "@/components/AppointmentDetail/MessageTimeLine";
import CustomButton from "@/components/CustomButton";
const CommentComponent = ({ t, chatList }) => {
  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
      <CustomText textClassName="disable-text text-sm">
        {t("requestOverview.comment")}
      </CustomText>
      <div
        className="divider-line "
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      {_.map(chatList, (item) => {
        return <MessageTimeLine item={item} />;
      })}

      <div className="flex flex-col justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn mb-2"
          buttonText={t("requestOverview.startComment")}
        />
      </div>
    </div>
  );
};

export default CommentComponent;
