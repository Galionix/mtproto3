import { Footer } from "../../Footer";
import { Header } from "../../Header";

import s from "./Layout.module.scss";

export const Layout = ({
  children,
  loading = false,
  outside = <></>,
}: {
  children: React.ReactNode;
  loading?: boolean;
  outside?: React.ReactNode;
}) => {
  return (
    <>
      <div className={s.layout}>
        <Header />
        <div className={`${s.content} ${loading ? s.loading : ""}`}>
          {children}
        </div>
        <Footer />
      </div>
      {outside}
    </>
  );
};
