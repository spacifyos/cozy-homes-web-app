import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/Detail/RoomPicCarousel";
import DetailComponent from "@/components/Detail/DetailComponent";

export { getServerSideProps };
const onClickGoBack = () => {
    router.back();
};
const Detail = () => {
    const { t } = useTranslation("common");

    return (
        <CustomHeader pageTitle={t("pageTitle.detail")} hideBgImage onClickGoBack={onClickGoBack} padding>
            <div className="pb-23 px-4">
                <RoomPicCarousel t={t} />

                <DetailComponent t={t}/>


            </div>
        </CustomHeader>
    );
};

export default withTranslation("common")(Detail);
