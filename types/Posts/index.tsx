export interface CardData {
  albumId: number | string,
  id: number,
  title: string,
  url: string,
}

export interface PostsState {
  posts: CardData[]
  error: string | null
  loading: boolean
  totalPages: string | null
}

export enum PostsActionType {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
  SET_TOTAL_PAGES = 'SET_TOTAL_PAGES',
}

interface FetchPostsAction {
  type:PostsActionType.FETCH_POSTS

}

interface FetchPostsSuccessAction {
  type: PostsActionType.FETCH_POSTS_SUCCESS
  payload: any[]

}

interface FetchPostsErrorAction {
  type: PostsActionType.FETCH_POSTS_ERROR
  payload: string
}

interface SetTotalPagesAction {
  type: PostsActionType.SET_TOTAL_PAGES
  payload:  string
}

export type PostsAction =
  FetchPostsAction |
  FetchPostsSuccessAction |
  FetchPostsErrorAction |
  SetTotalPagesAction
