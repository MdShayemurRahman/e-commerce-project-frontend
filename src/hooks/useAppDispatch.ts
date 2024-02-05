import { useDispatch } from "react-redux";

import { AppDistpatch } from "../services/store";

export const useAppDispatch: () => AppDistpatch = useDispatch;
