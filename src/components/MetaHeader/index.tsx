import Head from "next/head";
import MetaProps from "./meta.props";

export default function MetaHeader(props: MetaProps) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Organize suas tarefas de forma fácil" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
