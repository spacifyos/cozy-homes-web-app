import CustomHeader from "@/components/CustomHeader";
import {useTranslation, withTranslation} from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Images from "@/src/utils/Image";


export {getServerSideProps};

const TenancyDetail= ({}) => {
    const {t} = useTranslation("common");
    const router = useRouter();

    const onClickGoBack = () => {
        router.back();

    };
    return (
        <CustomHeader pageTitle={t("pageTitle.myTenancy")} hideBgImage onClickGoBack={onClickGoBack}
                      rightButtonIcon={Images.saveIcon}
                      imageStyle={{ width: "20px", height: "20px" }}
        >

        </CustomHeader>
    );
};

export default withTranslation("common")(TenancyDetail);
