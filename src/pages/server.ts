import { database } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { GetServerSideProps, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(database, "comments");
  const postRef = collection(database, "tasks");

  const snapComments = await getDocs(commentRef);
  const snapPosts = await getDocs(postRef);

  return {
    props: {
      posts: snapPosts.size || 0,
      comments: snapComments.size || 0,
    },
    revalidate: 60
  };
};
