export interface PostComments {
  postId: number,
  id: number,
  name: string,
  email: string,
  body : string
}

export interface PostProps {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}
