import Head from "next/head";
import styles from "./styles.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
