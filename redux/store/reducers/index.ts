import {combineReducers} from "redux";
import {postsReducer} from "./postsReducer";

export const rootReducer = combineReducers({
  posts: postsReducer
})

export type RootState = ReturnType<typeof rootReducer>
