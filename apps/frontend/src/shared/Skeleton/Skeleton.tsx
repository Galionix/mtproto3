// Skeleton is wrapper component that will dim the content and show a loading spinner

import { Spinner } from "./Spinner";
import s from "./skeleton.module.scss";

type TSkeletonProps = {
  children: React.ReactNode;
  enabled?: boolean;
};

export const Skeleton = ({ children, enabled }: TSkeletonProps) => {
  if (!enabled && typeof enabled !== undefined) return <>{children}</>;
  return (
    <div className={s.skeleton}>
      <Spinner />
      <>{children}</>
    </div>
  );
};
