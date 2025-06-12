import { useContext } from "react";
import { TokenCollectionContext } from "../context/token-collection";

export const useTokenCollection = () => {
  const context = useContext(TokenCollectionContext);

  if (!context) {
    throw "Invalid context";
  }

  return context;
};
