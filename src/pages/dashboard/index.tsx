import styles from "./styles.module.css";
import MetaHeader from "@/components/MetaHeader";
import { getServerSideProps } from "./server";

export { getServerSideProps };

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <MetaHeader title="Meu painel de tarefas" />
    </div>
  );
}
