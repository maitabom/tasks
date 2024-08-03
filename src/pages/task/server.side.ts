import Task from "@/models/task";
import { database } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(database, "tasks", id);
  const snapshot = await getDoc(docRef);

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
    date: new Date(miliseconds).toLocaleDateString()
  };

  return {
    props: {
      task: task
    },
  };
};
