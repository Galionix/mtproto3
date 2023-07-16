import { useQuery } from "@apollo/client";
import styles from "./index.module.scss";
import { getBotsQuery } from "./testquery";
import { Layout } from "../src/shared/Layout/Layout";

export function Index() {
  const { data } = useQuery(getBotsQuery);
  console.log(data);
  return (
    <Layout>
      <div className={styles.page}>
        <div className="flex">test nextjs</div>
      </div>
    </Layout>
  );
}

export default Index;
