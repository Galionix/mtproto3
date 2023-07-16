import { Footer } from "../../Footer";
import { Header } from "../../Header";

import s from "./Layout.module.scss";

export const Layout = ({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <div className={s.layout}>
      <Header />
      <div className={`${s.content} ${loading ? s.loading : ""}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
