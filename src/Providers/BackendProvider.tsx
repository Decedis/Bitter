import { ReactNode } from "react";
import { SWRConfig } from "swr";

import fetcher from "../services/fetcher";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        // refreshInterval: 3000,
        // revalidateIfStale: false,
        // revalidateOnFocus: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};
