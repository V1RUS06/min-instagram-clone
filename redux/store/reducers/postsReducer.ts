import {PostsAction, PostsActionType, PostsState} from "../../../types/Posts";

const initialState: PostsState = {
  posts: [],
  error: null,
  loading: false,
  totalPages: null
}

export const postsReducer = (state = initialState, action: PostsAction): PostsState => {
  switch (action.type) {
    case PostsActionType.FETCH_POSTS:
      return {...state, loading: true }

    case PostsActionType.SET_POSTS:
      return {...state, posts: action.payload }

    case PostsActionType.FETCH_POSTS_SUCCESS:
      return {...state, posts: [...state.posts, ...action.payload], loading: false}

    case PostsActionType.FETCH_POSTS_ERROR:
      return {...state, error: action.payload, loading: false}

    case PostsActionType.SET_TOTAL_PAGES:
      return {...state, totalPages: action.payload}

    default:
      return state

  }

}
