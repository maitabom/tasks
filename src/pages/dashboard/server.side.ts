import User from "@/models/user";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user: User = {
    email: session.user.email as string,
    name: session.user.name as string,
  };

  return {
    props: {
      user: user,
    },
  };
};
