import { useQuery } from "@apollo/client";
import styles from "./index.module.scss";
import TEST_QUERY, { TestQuery } from "./testquery";

export function Index() {
  const {data} = useQuery<TestQuery>(TEST_QUERY)
  console.log(data)
  return (
    <div className={styles.page}>
      <div className="flex">
      test nextjs
      </div>
    </div>
  );
}

export default Index;
