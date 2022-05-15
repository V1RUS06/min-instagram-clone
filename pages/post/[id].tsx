import {useRouter} from "next/router";
import styles from '../../styles/Post.module.css'
import {GetServerSideProps} from "next";
import {PostProps, PostComments} from "../../types/Post";
import Link from "next/link";
import LeftArrow from "../../assents/svg/LeftArrow";
import React from "react";
import {CommentsList} from "../../components/CommentsList";

interface Props {
  comments: PostComments[]
  post: PostProps
}

export default function Post({comments, post}: Props) {
  const router = useRouter();
  const postId = router.query.id;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/"}><a><LeftArrow/></a></Link>
        <h1>Пост номер {postId}</h1>
      </div>
      <CommentsList comments={comments} post={post} />
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

