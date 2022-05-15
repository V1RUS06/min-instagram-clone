import styles from './CommentsArea.module.css'
import React, {ChangeEvent, FC, MouseEventHandler} from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onClick: MouseEventHandler<HTMLButtonElement>
  value: string
}

export const CommentsArea: FC<Props> = ({onChange, onClick, value}) => {

  return (
      <div className={styles.container}>
        <textarea
          placeholder="Оставить комментарий..."
          maxLength={100}
          onChange={onChange}
          value={value}
        />
        <button className={styles.btn} onClick={onClick}>Отправить</button>
      </div>
  );
};

