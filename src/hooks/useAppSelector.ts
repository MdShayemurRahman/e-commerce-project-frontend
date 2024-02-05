import { TypedUseSelectorHook, useSelector } from "react-redux";

import { AppState } from "../services/store";

export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector
