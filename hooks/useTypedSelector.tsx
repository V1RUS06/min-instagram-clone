import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../redux/store/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
