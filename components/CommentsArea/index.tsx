import styles from './CommentsArea.module.css'
import React, {FC, FormEvent, useState} from "react";

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const CommentsArea: FC<Props> = ({onSubmit}) => {
  const [value, setValue] = useState('')

  return (
      <form onSubmit={onSubmit} className={styles.container}>
        <textarea
          placeholder="Оставить комментарий..."
          maxLength={100}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'textarea'}
        />
        <button className={styles.btn}>Отправить</button>
      </form>
  );
};

