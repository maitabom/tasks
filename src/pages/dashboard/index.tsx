import Head from "next/head";
import styles from "./styles.module.css";
import MetaHeader from "@/components/MetaHeader";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <MetaHeader title="Meu painel de tarefas" />
    </div>
  );
}
