import {useRouter} from "next/router";
import styles from '../../styles/Post.module.css'
import {GetServerSideProps} from "next";
import {PostProps, PostComments, StorageComments, Comment} from "../../types/Post";
import Link from "next/link";
import CommentCard from "../../components/Card/CommentCard";
import LeftArrow from "../../assents/svg/LeftArrow";
import {CommentsArea} from "../../components/CommentsArea";
import React, {FormEvent, useCallback, useEffect, useState} from "react";


interface Props {
  comments: PostComments[]
  post: PostProps
}

export default function Post({comments, post}: Props) {
  const router = useRouter();
  const postId = router.query.id;
  const [allComments, setAllComments] = useState<PostComments[]>(comments)

  useEffect(() => {
    const storageComments = localStorage.getItem('comments');

    if (storageComments && postId) {
      const parseComments: StorageComments = JSON.parse(storageComments)
      const oldComments = parseComments[+postId] || [];

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
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/"}><a><LeftArrow/></a></Link>
        <h1>Пост номер {postId}</h1>
      </div>
      <div className={styles.comments_container}>
        <img className={styles.post_img} src={`${post.url}`} alt={`img${post.id}`}/>
        <div className={styles.comments_title}>Комментарии</div>
        <div className={styles.post_comments}>
          {allComments.map((elem: PostComments) => (
            <CommentCard email={elem.email} body={elem.body} key={elem.id}/>
          ))}
        </div>
      </div>
      <CommentsArea onSubmit={onHandleSubmit}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${params?.id}`)
  const comments = await response.json();

  const data = await fetch(`https://jsonplaceholder.typicode.com/photos/${params?.id}`)
  const post = await data.json();

  return {
    props: {
      comments,
      post,
    },
  }
}

