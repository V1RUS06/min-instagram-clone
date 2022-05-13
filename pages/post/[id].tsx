import {useRouter} from "next/router";
import styles from '../../styles/Post.module.css'
import {GetServerSideProps} from "next";
import {PostProps, PostComments} from "../../types/Post";
import Link from "next/link";
import CommentCard from "../../components/Card/CommentCard";
import LeftArrow from "../../assents/svg/LeftArrow";

interface Props {
  comments: PostComments[]
  post: PostProps
}

export default function Post({comments, post}: Props) {

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/"}><a><LeftArrow /></a></Link>
        <h1>Пост номер {router.query.id}</h1>
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

