import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import type { RootState, AppDispatch } from "./index";

// Typed dispatch hook for sending actions.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector hook for reading Redux state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
