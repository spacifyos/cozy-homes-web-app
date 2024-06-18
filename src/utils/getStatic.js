import _ from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async (context) => {
  const id = _.get(context, ["params", "slug"], "");

  return {
    props: {
      id: id,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};
