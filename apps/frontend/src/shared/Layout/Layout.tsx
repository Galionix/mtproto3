import { Footer } from "../../Footer";
import { Header } from "../../Header";

import s from "./Layout.module.scss";

export const Layout = ({
  children,
  loading = false,
  outside = <></>,
  className = "",
}: {
  children: React.ReactNode;
  loading?: boolean;
  outside?: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div className={s.layout}>
        <Header />
        <div
          className={`${s.content} ${loading ? s.loading : ""} ${
            className ? className : ""
          }`}
        >
          {children}
        </div>
        <Footer />
      </div>
      {outside}
    </>
  );
};
