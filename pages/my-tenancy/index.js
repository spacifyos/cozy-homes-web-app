import CustomHeader from "@/components/CustomHeader";
import {useTranslation, withTranslation} from "next-i18next";
import {getServerSideProps} from "@/src/utils/getStatic";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Images from "@/src/utils/Image";
import TenancyUserSection from "@/components/MyTenancy/TenancyUserSection";
import TenancyDetail from "@/components/MyTenancy/TenancyDetail";

export {getServerSideProps};

const MyTenancy = ({}) => {
    const {t} = useTranslation("common");
    const router = useRouter();

    const onClickGoBack = () => {
        router.back();

    };
    return (
        <CustomHeader pageTitle={t("pageTitle.myTenancy")} hideBgImage onClickGoBack={onClickGoBack}
                      rightButtonIcon={Images.shareIcon}
                      rightSecondButtonIcon={Images.saveIcon}
                      imageStyle={{width: "25px", height: "25px"}}
        >
            <div className="body-container">
                <TenancyUserSection t={t}/>
                <TenancyDetail t={t}/>
            </div>
        </CustomHeader>
    );
};

export default withTranslation("common")(MyTenancy);
