import CustomHeader from "@/components/CustomHeader";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import { useState } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomText from "@/components/CustomText";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import MyInvoiceComponent from "@/components/MyInvoice/MyInvoiceComponent";

export { getServerSideProps };

const typeList = [
  {
    title: "Total Pay",
    value: "RM99,999.99",
    date: "Last updated: 15 Dec 2022",
  },
  {
    title: "Overdue",
    value: "RM99,999.99",
    date: "Last updated: 15 Dec 2022",
  },
  {
    title: "Due Soon",
    value: "RM99,999.99",
    date: "Last updated: 15 Dec 2022",
  },
];

const invoice = [
  {
    date: "Nov 2024",
    list: [
      { status: "Paid" },
      { status: "Paid" },
      { status: "Paid" },
      { status: "Paid" },
    ],
  },
  {
    date: "Oct 2024",
    list: [
      { status: "Overdue" },
      { status: "Overdue" },
      { status: "Due Soon" },
      { status: "Due Soon" },
    ],
  },
];

const MyInvoice = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [selectedCategory, setSelectedCategory] = useState("Unpaid");

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToOverView = () => {
    router.push("my-invoice/1");
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myInvoice")}
      rightButtonIcon={Images.filterProIcon}
      hideBgImage
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-1">
        <MyInvoiceComponent list={typeList} />

        <div className="flex items-center pb-3">
          <CustomButton
            buttonText="Unpaid"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Unpaid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Unpaid")}
          />
          <CustomButton
            buttonText="Paid"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Paid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Paid")}
          />
        </div>

        {_.map(invoice, (item) => {
          const date = _.get(item, ["date"], "");
          const lists = _.get(item, ["list"], []);

          return (
            <div>
              <CustomText textClassName="section-title">{date}</CustomText>

              {_.map(lists, (list) => (
                <InvoiceComponent
                  item={list}
                  t={t}
                  onClick={onClickToOverView}
                />
              ))}
            </div>
          );
        })}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyInvoice);
