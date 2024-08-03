import MetaHeader from "@/components/MetaHeader";
import styles from "./styles.module.css";

import { getServerSideProps } from "./server.side";
import TaskDetailsProps from "./task.props";
import Textarea from "@/components/Textarea";

export { getServerSideProps };

export default function TaskDetail({ task }: TaskDetailsProps) {
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
        <form>
          <Textarea placeholder="Digite aqui o seu comentário" />
          <button className={styles.button}>Enviar comentário</button>
        </form>
      </section>
    </div>
  );
}
