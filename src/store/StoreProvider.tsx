import { ReactNode, useRef } from "react";
import { AppStore } from "./store.types";
import { makeStore } from "./store";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance on first time render
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
