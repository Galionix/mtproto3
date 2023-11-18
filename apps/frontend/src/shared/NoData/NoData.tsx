import s from "./NoData.module.scss";

type NoDataProps = {
  title: string;
  message?: string;
};
export const NoData = (props: NoDataProps) => {
  const { title, message = title ? "No Data for " + title : "No Data found." } =
    props;
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>{title || "No data"}</h1>
        <p className={s.message}>{message}</p>
      </div>
    </div>
  );
};
