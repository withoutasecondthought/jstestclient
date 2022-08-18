import React, { ReactNode } from "react";
import styles from "./Skeleton.module.css";

interface IProps {
  children: ReactNode;
  isLoaded: any;
  title: string;
}

const Skeleton = ({ children, isLoaded, title }: IProps) => {
  return (
    <div className={"App"}>
      {isLoaded ? (
        children
      ) : (
        <div className={"container"}>
          <div className={"wrap"}>
            <h1 className={styles.header}>{title}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skeleton;
