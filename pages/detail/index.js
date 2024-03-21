import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/Detail/RoomPicCarousel";
import DetailComponent from "@/components/Detail/DetailComponent";
import DetailFeatureSection from "@/components/Detail/DetailFeatureSection";


export { getServerSideProps };
const onClickGoBack = () => {
    router.back();
};
const Detail = () => {
    const { t } = useTranslation("common");

    return (
        <CustomHeader pageTitle={t("pageTitle.detail")} hideBgImage onClickGoBack={onClickGoBack}>
            <div className="pb-23">

                <RoomPicCarousel t={t} />

                <DetailComponent t={t}/>

                <DetailFeatureSection t={t}/>


            </div>
        </CustomHeader>
    );
};

export default withTranslation("common")(Detail);
