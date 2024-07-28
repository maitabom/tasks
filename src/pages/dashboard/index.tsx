import styles from "./styles.module.css";
import MetaHeader from "@/components/MetaHeader";
import { getServerSideProps } from "./server.side";
import Textarea from "@/components/Textarea";

export { getServerSideProps };

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <MetaHeader title="Meu painel de tarefas" />
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual é a sua tarefa?</h1>
            <form>
              <Textarea placeholder="Digite aqui a descrição de sua tarefa."/>
              <div className={styles.checkboxArea}>
                <input type="checkbox" id="chkPublica" className={styles.checkbox} />
                <label htmlFor="chkPublica">Deixar a tarefa pública</label>
              </div>
              <button className={styles.button} type="submit">Registrar</button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
        </section>
      </main>
    </div>
  );
}
