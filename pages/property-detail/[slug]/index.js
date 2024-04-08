import CustomHeader from "@/components/CustomHeader";
import {useTranslation, withTranslation} from "next-i18next";
import {getServerSideProps} from "@/src/utils/getStatic";
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
import PolicyDetail from "@/components/Detail/PolicyDetail";
import _ from "lodash";

export {getServerSideProps};

const Detail = ({}) => {
    const {t} = useTranslation("common");
    const router = useRouter();
    const [selectDetail, setSelectedDetail] = useState("Tenancy");
    const [showPolicy, setShowPolicy] = useState(true);
    const onClickGoBack = () => {
        router.back();
    };
    const [isBookMarks, setIsBookMarks] = useState(true);
    const rightButton = () => {
        setIsBookMarks(!isBookMarks);
    };
    const onClickSelectDetail = (select) => {
        setSelectedDetail(select);
    };
    useEffect(() => {
        setShowPolicy(selectDetail === "Tenancy");
    }, [selectDetail]);

    return (<CustomHeader pageTitle={t("pageTitle.propertyDetail")} hideBgImage onClickGoBack={onClickGoBack}
                          rightButton={rightButton}
                          HeaderImageStyle={{width: "30px", height: "30px"}}
                          rightButtonIcon={isBookMarks ? Images.bookMarksIcon : Images.bookMarksIconActive}
    >
        <div className="body-container" style={{paddingBottom: 136}}>
            <RoomPicCarousel t={t}/>
            <DetailComponent
                t={t}
                onClickSelectDetail={onClickSelectDetail}
                selectDetail={selectDetail}
            />
            {_.isEqual(showPolicy, true) ? (<>
                <DetailFeatureSection t={t}/>
                <Facilities t={t}/>
                <RoomzMap t={t}/>
                <RecommendSection t={t}/>
            </>) : (<>
                <PolicyDetail t={t}/>
            </>)}
            <AgentSection t={t}/>
        </div>
    </CustomHeader>);
};

export default withTranslation("common")(Detail);
