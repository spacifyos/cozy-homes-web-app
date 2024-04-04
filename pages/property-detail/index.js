import CustomHeader from "@/components/CustomHeader";
import {useTranslation, withTranslation} from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/Detail/RoomPicCarousel";
import DetailComponent from "@/components/Detail/DetailComponent";
import DetailFeatureSection from "@/components/Detail/DetailFeatureSection";
import Facilities from "@/components/Detail/Facilities";
import AgentSection from "@/components/Detail/AgentSection";
import RoomzMap from "@/components/Detail/RoomzMap";
import RecommendSection from "@/components/Detail/RecommendSection";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Images from "@/src/utils/Image";


export {getServerSideProps};

const Detail = ({}) => {
    const {t} = useTranslation("common");
    const router = useRouter();

    const onClickGoBack = () => {
        router.back();

    };
    const [isBookMarks, setIsBookMarks] = useState(true);

    const rightButton = () => {
        setIsBookMarks(!isBookMarks);
    };


    return (
        <CustomHeader pageTitle={t("pageTitle.propertyDetail")} hideBgImage onClickGoBack={onClickGoBack} rightButton={rightButton}
        rightButtonIcon={isBookMarks ? Images.bookMarksIcon : Images.bookMarksIconActive}
        >
            <div className="body-container" style={{paddingBottom: 0}}>

                <RoomPicCarousel t={t}
                />

                <DetailComponent t={t}/>

                <DetailFeatureSection t={t}/>

                <Facilities t={t}/>

                <RoomzMap t={t}/>

                <RecommendSection t={t}/>

                <AgentSection t={t}/>

            </div>
        </CustomHeader>
    );
};

export default withTranslation("common")(Detail);
