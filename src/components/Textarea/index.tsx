import TextareaProps from "./textarea.props";
import styles from "./styles.module.css";

export default function Textarea(props: TextareaProps) {
  return <textarea className={styles.textarea} {...props}></textarea>;
}
