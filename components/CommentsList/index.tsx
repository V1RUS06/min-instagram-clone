import styles from "./CommentsList.module.css";
import {Comment, PostComments, PostProps, StorageComments} from "../../types/Post";
import CommentCard from "../Card/CommentCard";
import React, {FC, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {CommentsArea} from "../CommentsArea";
import {useRouter} from "next/router";

interface Props {
  comments: PostComments[]
  post: PostProps
}

export const CommentsList: FC<Props> = React.memo(({post, comments}) => {
  const router = useRouter();
  const postId = router.query.id;
  const [allComments, setAllComments] = useState<PostComments[]>(comments)
  const localStorageLoaded = useRef<boolean>(false)


  useEffect(() => {
      const storageComments = localStorage.getItem('comments');

      if (storageComments && postId && !localStorageLoaded.current) {
        const parseComments: StorageComments = JSON.parse(storageComments)
        const oldComments = parseComments[+postId] || [];

        localStorageLoaded.current = true

        setAllComments(prevState => [...prevState, ...oldComments])
      }
  }, [postId]);


  const onHandleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = (e.currentTarget.elements.namedItem('textarea') as HTMLTextAreaElement).value;
    const storageComments = localStorage.getItem('comments') ;

    if (postId) {
      const temps: Comment = {
        postId: +postId,
        body: comment,
        email: 'Anonymous',
        id: Math.floor(Math.random()* 10000),
      }

      if (storageComments) {
        const parseComments = JSON.parse(storageComments);
        const prevStorageComments = parseComments[+postId] || [];
        const nextComments = {...parseComments, [+postId]: [...prevStorageComments, temps ]}

        localStorage.setItem('comments', JSON.stringify(nextComments))
      } else {
        const nextComments = {[+postId]: [temps]}
        localStorage.setItem('comments', JSON.stringify(nextComments))
      }
      setAllComments(prevState => [...prevState, temps])
    }
  }, [ postId ])

  return (
    <div className={styles.comments_container}>
      <img className={styles.post_img} src={`${post.url}`} alt={`img${post.id}`}/>
      <div className={styles.comments_title}>Комментарии</div>
      <div className={styles.post_comments}>
        {allComments.map((elem: PostComments) => (
          <CommentCard email={elem.email} body={elem.body} key={elem.id}/>
        ))}
      </div>
      <CommentsArea onSubmit={onHandleSubmit}/>
    </div>
  );
});

