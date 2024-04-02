import { ReactNode } from "react";
import { SWRConfig } from "swr";

import fetcher from "../services/fetcher";

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  //const [allPosts, setAllPosts] = useState<Post[]>([]);

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
