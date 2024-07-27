import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

import heroImage from "@/assets/hero.png"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas</title>
        <meta name="description" content="Organize suas tarefas de forma fácil" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image className={styles.hero} alt="Tarefas+" src={heroImage} priority />
          <h1 className={styles.title}>Sistema feito para você organizar suas tarefas</h1>
        </div>
        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>32 posts</span>
          </section>
          <section className={styles.box}>
            <span>96 comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}
