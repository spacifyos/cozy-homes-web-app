import Color from "@/src/utils/Color";
import Toast from "@/src/utils/Toast";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import CustomInput from "@/components/CustomInput";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomFlatList from "@/components/CustomFlatList";
import _ from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");

  const [loading, setLoading] = useState(false);

  const people = [
    { firstName: "Elson", lastName: "Correia", info: { age: 24 } },
    { firstName: "John", lastName: "Doe", info: { age: 18 } },
    { firstName: "Jane", lastName: "Doe", info: { age: 34 } },
    { firstName: "Maria", lastName: "Carvalho", info: { age: 22 } },
    { firstName: "Kelly", lastName: "Correia", info: { age: 23 } },
    { firstName: "Don", lastName: "Quichote", info: { age: 39 } },
    { firstName: "Marcus", lastName: "Correia", info: { age: 0 } },
    { firstName: "Bruno", lastName: "Gonzales", info: { age: 25 } },
    { firstName: "Alonzo", lastName: "Correia", info: { age: 44 } },
  ];

  const notify = () => Toast.error("Wow so easy!");

  const onClickButton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const renderItem = (item, index) => {
    return <CustomText>{_.get(item, ["firstName"], "")}</CustomText>;
  };

  return (
    <div
      className={"container flex-1"}
      style={{ backgroundColor: Color.primaryWhiteColor }}
    >
      <CustomEmptyBox/>
      <CustomFlatList itemList={people} renderItem={renderItem} />
      <LoadingOverlay loading={loading} />
      <CustomInput />
      <CustomButton
        buttonText="Test Button"
        buttonStyles={{}}
        onClick={onClickButton}
        loading={loading}
      />
      <CustomText>
        This page shares my best articles to read on topics like health,
        happiness, creativity, productivity and more. The central question that
        drives my work is, “How can we live better?” To answer that question, I
        like to write about science-based ways to solve practical problems.
      </CustomText>
    </div>
  );
}

export default withTranslation("common")(Home);
