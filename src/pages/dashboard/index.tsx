import { ChangeEvent, FormEvent, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import { addDoc, collection } from "firebase/firestore";

import MetaHeader from "@/components/MetaHeader";
import Textarea from "@/components/Textarea";
import { database } from "@/services/firebase";

import { getServerSideProps } from "./server.side";
import DashboardProps from "./dashboard.props";

import styles from "./styles.module.css";

export { getServerSideProps };

export default function Dashboard({ user }: DashboardProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

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
          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183FF" />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                eleifend gravida neque sit amet elementum.
              </p>
              <button className={styles.deleteButton}>
                <FaTrash size={24} color="#EA3140" />
              </button>
            </div>
          </article>
          <article className={styles.task}>
            <div className={styles.taskContent}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                eleifend gravida neque sit amet elementum.
              </p>
              <button className={styles.deleteButton}>
                <FaTrash size={24} color="#EA3140" />
              </button>
            </div>
          </article>
          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183FF" />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                eleifend gravida neque sit amet elementum.
              </p>
              <button className={styles.deleteButton}>
                <FaTrash size={24} color="#EA3140" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
