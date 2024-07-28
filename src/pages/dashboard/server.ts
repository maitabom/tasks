import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  console.log(session);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
