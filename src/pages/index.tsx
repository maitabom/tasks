import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

import heroImage from "@/assets/hero.png";
import MetaHeader from "@/components/MetaHeader";

import { getStaticProps } from "./server";
import HomeProps from "./properties";

export { getStaticProps };

export default function Home({ posts, comments }: HomeProps) {
  return (
    <div className={styles.container}>
      <MetaHeader title="Tarefas" />
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Tarefas+"
            src={heroImage}
            priority
          />
          <h1 className={styles.title}>
            Sistema feito para você organizar suas tarefas
          </h1>
        </div>
        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}
