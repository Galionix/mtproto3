import s from "./spinner.module.scss";

export const Spinner = () => {
  return (
    <div className={s.spinner}>
      <div className={s.spinner__icon} />
    </div>
  );
};
