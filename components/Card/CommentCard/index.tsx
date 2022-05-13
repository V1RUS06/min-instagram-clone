import styles from './commentCard.module.css'
import {FC} from "react";

interface CardProps {
  email: string,
  body: string,
  key: number | string
}

const CommentCard: FC<CardProps> = ({email, body}) => {
  return (
    <div className={styles.comment_card}>
      <div className={styles.email}>{email}</div>
      <p className={styles.body}>{body}</p>
      <span>Ответить</span>
    </div>
  );
};

export default CommentCard;
