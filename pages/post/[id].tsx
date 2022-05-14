import {useRouter} from "next/router";
import styles from '../../styles/Post.module.css'
import {GetServerSideProps} from "next";
import {PostProps, PostComments, storageComments, Comment} from "../../types/Post";
import Link from "next/link";
import CommentCard from "../../components/Card/CommentCard";
import LeftArrow from "../../assents/svg/LeftArrow";
import {CommentsArea} from "../../components/CommentsArea";
import React, {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {type} from "os";


interface Props {
  comments: PostComments[]
  post: PostProps
}

export default function Post({comments, post}: Props) {
  const router = useRouter();
  const postId = router.query.id;
  const [newComment, setNewComment] = useState<string>('');
  const [save, setSave] = useState(true);
  const [firstSave, setFirstSave] = useState(true);

  useEffect(() => {
    if (postId) {
      if (firstSave) {
        console.log('Первый блок')
        const temps: storageComments = {
          [+postId]: [
            {
              postId: +postId,
              body: newComment,
              email: 'Anonymous',
            }
          ]
        }
        if (newComment.length !== 0) {
          localStorage.setItem('comments', JSON.stringify(temps))
          setSave(true)
          setFirstSave(false)
        }
      } else {
        console.log('Второй блок')
        const getComments = localStorage.getItem('comments')
        if (getComments) {
          const newPost: Comment = {
            postId: +postId,
            body: newComment,
            email: 'Anonymous',
          }
          const commentsArray = JSON.parse(getComments);

          if (commentsArray.hasOwnProperty(+postId)) {
            const old = commentsArray[+postId]
            old.push(newPost)
            localStorage.setItem('comments', JSON.stringify(old))
            setSave(true)
          }
        }
      }
    }

  }, [newComment])
  console.log('Save!>>', save)

  const onHandleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = (e.currentTarget.elements.namedItem('textarea') as HTMLTextAreaElement).value
    setNewComment(comment);
    setSave(false)
    console.log('Надо сохранить', save)

  }, [])

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
          {comments.map((elem: PostComments) => (
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

