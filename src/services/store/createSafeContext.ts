import { createContext, useContext } from 'react';

export const createSafeContext = <T>() => {
  const context = createContext<T | undefined>(undefined);
  const useSafeContext = () => {
    const c = useContext(context);
    if (!c) {
      throw new Error(
        'useSafeContext must be used inside a Provider with a value',
      );
    }
    return c;
  };
  return [useSafeContext, context.Provider] as const;
};
