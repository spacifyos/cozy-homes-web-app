import _ from "lodash";

export const getServerSideProps = async (context) => {
  const id = _.get(context, ["params", "id"], "");
  console.log("getServerSideProps")
  return {
    props: {
    },
  };
};
