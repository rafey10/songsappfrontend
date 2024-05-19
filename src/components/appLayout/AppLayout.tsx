import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div>hello before content</div>
      <div>{children}</div>
      <div>hello after content</div>
    </>
  );
};

export default AppLayout;
