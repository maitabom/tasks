import Task from "@/models/task";
import Comment from "@/models/comment";
import { database } from "@/services/firebase";
import { GetServerSideProps } from "next";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(database, "tasks", id);
  const q = query(collection(database, "comments"), where("task", "==", id));
  const snapshot = await getDoc(docRef);
  const snapComments = await getDocs(q);

  let comments: Comment[] = [];

  snapComments.forEach((doc) => {
    comments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().task,
    });
  });

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task: Task = {
    id: id,
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    username: snapshot.data()?.user,
    date: new Date(miliseconds).toLocaleDateString(),
  };

  return {
    props: {
      task: task,
      comments: comments,
    },
  };
};
