import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

import MetaHeader from "@/components/MetaHeader";
import { database } from "@/services/firebase";
import Textarea from "@/components/Textarea";
import Comment from "@/models/comment";

import { getServerSideProps } from "./server.side";
import TaskDetailsProps from "./task.props";

import styles from "./styles.module.css";
import { FaTrash } from "react-icons/fa";

export { getServerSideProps };

export default function TaskDetail({ task, comments }: TaskDetailsProps) {
  const { data: session } = useSession();

  const [input, setInput] = useState("");
  const [localComments, setComments] = useState<Comment[]>(comments || []);

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "" || !session?.user?.email || !session.user.name) return;

    try {
      const docRef = await addDoc(collection(database, "comments"), {
        comment: input,
        created: new Date(),
        user: session.user.email,
        name: session.user.name,
        task: task.id,
      });

      const newData: Comment = {
        id: docRef.id,
        comment: input,
        user: session.user.email,
        name: session.user.name,
        task: task,
        taskId: task.id,
      };

      setComments((olders) => [...olders, newData]);

      setInput("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(database, "comments", id);
      await deleteDoc(docRef);

      const anotherElse = localComments.filter((comment) => comment.id !== id);
      setComments(anotherElse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <MetaHeader title="Detalhes da Tarefa " />
      <main className={styles.main}>
        <h1>Detalhes da Tarefa</h1>
        <article className={styles.task}>
          <p>{task?.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixe seu comentário</h2>
        <form onSubmit={handleComment}>
          <Textarea
            placeholder="Digite aqui o seu comentário"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button disabled={!session?.user} className={styles.button}>
            Enviar comentário
          </button>
        </form>
      </section>
      <section className={styles.commentsContainer}>
        <h2>Comentário sobre a tarefa</h2>
        {localComments.length === 0 && (
          <span>Nenhum comentário foi encontrado</span>
        )}

        {localComments.map((comment) => (
          <article key={comment.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.authorLabel}>{comment.name}</label>
              {comment.user === session?.user?.email && (
                <button
                  className={styles.buttonDelete}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <FaTrash size={18} color="#EA3140" />
                </button>
              )}
            </div>
            <p>{comment.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
