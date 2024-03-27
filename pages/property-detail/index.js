import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/Detail/RoomPicCarousel";
import DetailComponent from "@/components/Detail/DetailComponent";
import DetailFeatureSection from "@/components/Detail/DetailFeatureSection";
import Facilities from "@/components/Detail/Facilities";
import AgentSection from "@/components/Detail/AgentSection";
import RoomzMap from "@/components/Detail/RoomzMap";
import RecommendSection from "@/components/Detail/RecommendSection";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";

export { getServerSideProps };

const Detail = () => {
    const router = useRouter();
    const [listingLoading, setListingLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setListingLoading(false);
        }, 1000);
    }, []);
    const onClickGoBack = () => {
        router.push("/explore");
    };
    const { t } = useTranslation("common");

    return (
        <CustomHeader pageTitle={t("pageTitle.property-detail")} hideBgImage onClickGoBack={onClickGoBack}>
            <div className="body-container"  style={{ paddingBottom: 0 }}>

                <RoomPicCarousel t={t}
                />

                <DetailComponent t={t}/>

                <DetailFeatureSection t={t}/>

                <Facilities t={t}/>

                <RoomzMap t={t}/>

                <RecommendSection t={t} listingLoading={listingLoading}/>

                <AgentSection t={t} />

            </div>
        </CustomHeader>
    );
};

export default withTranslation("common")(Detail);
