import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";


const PolicyDetail = ({t}) => {

    return (
        <div className="pb-5 pt-2">
            <CustomText textClassName="font-size-xxlarge font-bold pb-2">

                {t("propertyDetail.cancellationPolicy")}
            </CustomText>
            <CustomText textClassName="font-size-small disable-text text-justify break-all tracking-tight">
                <ul className="list-disc pl-6">
                    <li>
                        If, as a Guest, you wish to cancel a booking, either prior to or after arriving at the
                        accommodation, the Company’s Cancellation & Refund Rules which is available in
                        <a href=" https://www.belive.asia/short_term_rentals/guide"
                           className="underline"> https://www.belive.asia/short_term_rentals/guide</a> shall be
                        applicable.
                    </li>
                    <li>
                        If a Host cancels a booking, (i) the Company will refund the Total Fees for such booking to the
                        Guest within seven (7) working days from the time of cancellation; and (ii) the Guest will
                        receive an email confirming the cancellation and recommendation of other similar Listings and
                        other related information. If a Host cancels a confirmed booking and you, as a Guest, have not
                        received an email or other communication from the Company, please contact the Company at<a
                        href="tel:+603-33453877"
                        className="underline"> +603-33453877 </a>
                        or email info <a href="mailto:@belive.asia" className="underline">@belive.asia.</a>
                    </li>
                    <li>
                        In certain circumstances, the Company may decide, in its sole discretion, that it is necessary
                        or desirable to cancel a booking made via the Sites and Services. The Company will refund to the
                        Guest all of the amounts charged to the Guest. You agree that the Company and the relevant Guest
                        or Host will not have any liability for such cancellations or refunds
                    </li>
                    <li>
                        If, as a Host, your Guest cancels a booking, and the Company issues a refund to the Guest in
                        accordance with the Company’s Cancellation & Refund Rules <a
                        href=" https://www.belive.asia/short_term_rentals/guide"
                        className="underline">https://www.belive.asia/short_term_rentals/guide</a>
                        , you agree that in the event you have already
                        been paid the Company shall be entitled to recover the amount of any such Guest refund from you,
                        including by subtracting such refund amount out from any future Accommodation Fees due to you.
                    </li>
                </ul>
            </CustomText>
        </div>
    );
};

export default PolicyDetail;