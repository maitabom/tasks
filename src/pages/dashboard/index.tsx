import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

import MetaHeader from "@/components/MetaHeader";
import Textarea from "@/components/Textarea";
import { database } from "@/services/firebase";
import Task from "@/models/task";

import { getServerSideProps } from "./server.side";
import DashboardProps from "./dashboard.props";

import styles from "./styles.module.css";

export { getServerSideProps };

export default function Dashboard({ user }: DashboardProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasksRef = collection(database, "tasks");
      const q = query(
        tasksRef,
        orderBy("created", "desc"),
        where("user", "==", user.email)
      );

      onSnapshot(q, (snapshot) => {
        let lista = [] as Task[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            task: doc.data().task,
            created: doc.data().created,
            username: doc.data().user,
            public: doc.data().public,
          });

          setTasks(lista);
        });
      });
    }

    loadTasks();
  }, [user.email]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") {
      alert("Digite uma tarefa");
      return;
    }

    try {
      await addDoc(collection(database, "tasks"), {
        task: input,
        public: publicTask,
        created: new Date(),
        user: user.email,
      });

      setInput("");
      setPublicTask(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShare(id: string) {
    let urlPublic = process.env.NEXT_PUBLIC_URL;
    await navigator.clipboard.writeText(`http://${urlPublic}/task/${id}`);
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(database, "tasks", id);
    await deleteDoc(docRef);
  }

  return (
    <div className={styles.container}>
      <MetaHeader title="Meu painel de tarefas" />
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual é a sua tarefa?</h1>
            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite aqui a descrição de sua tarefa."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  id="chkPublica"
                  checked={publicTask}
                  onChange={handleChangePublic}
                  className={styles.checkbox}
                />
                <label htmlFor="chkPublica">Deixar a tarefa pública</label>
              </div>
              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
          {tasks.map((task) => (
            <article key={task.id} className={styles.task}>
              {task.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PÚBLICO</label>
                  <button
                    title="Copiar a URL"
                    className={styles.shareButton}
                    onClick={() => handleShare(task.id)}
                  >
                    <FiCopy size={22} color="#3183FF" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>
                {task.public ? (
                  <Link href={`/task/${task.id}`}>
                    <p>{task.task}</p>
                  </Link>
                ) : (
                  <p>{task.task}</p>
                )}

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrash size={24} color="#EA3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
