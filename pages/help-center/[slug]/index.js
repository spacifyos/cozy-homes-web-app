import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import RequestOverviewDetail from "@/components/Help-center/RequestOverviewDetail";
import MaintenanceScheduleInformationComponent from "@/components/Help-center/MaintenanceScheduleInformationComponent";
import CommentComponent from "@/components/Help-center/CommentComponent";

export { getServerSideProps };
const chatList = [
  {
    date: "10 Dec 23, 10.02am",
    img: Images.agentIcon,
    name: "Joan Lim",
    chat: "Hi, may I know when the technician can come?",
    icon: Images.ellipseGreenIcon,
    identity: "other",
  },
  {
    date: "10 Dec 23,  10.11am",
    img: Images.agentIcon,
    name: "Admin",
    chat: "Hi Joan, we're currently arranging a technician for you. We'll provide an update on the status soon.",
    identity: "agent",
  },
  {
    date: "10 Dec 23, 11.36am",
    img: Images.agentIcon,
    name: "Joan Lim",
    chat: "Thank you for the reply.",
    icon: Images.ellipseGreenIcon,
    identity: "other",
  },
];
const RequestOverview = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickToHelpCenter = () => {
    router.push("/help-center");
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.requestOverview")}
      hideBgImage
      rightButtonIcon={Images.downloadIcon}
      rightSecondButtonIcon={Images.chatIcon}
      onClickGoBack={onClickToHelpCenter}
    >
      <div className="body-container pb-4">
        <RequestOverviewDetail t={t} />

        <MaintenanceScheduleInformationComponent t={t} />

        <CommentComponent t={t} chatList={chatList} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(RequestOverview);
