import {Dispatch} from "redux";
import {PostsAction, PostsActionType} from "../../../types/Posts";

export const fetchPosts = (page: number ) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    try {
      dispatch({type: PostsActionType.FETCH_POSTS})
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=21&_page=${page}`)
      const posts = await response.json()
      const pages = response.headers.get('x-total-count');


      dispatch({type: PostsActionType.SET_TOTAL_PAGES, payload: pages})
      dispatch({type: PostsActionType.FETCH_POSTS_SUCCESS, payload: posts})
    } catch (e) {
      dispatch({type: PostsActionType.FETCH_POSTS_ERROR, payload: 'Постов больше нет'})
    }
  }
}
