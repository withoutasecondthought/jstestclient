import React, { useRef } from "react";
import { IResults } from "../../@types";
import styles from "./Answers.module.css";
import instance from "../../helpers/instance";
import { toast } from "react-toastify";

const Answers = ({ result, topics }: IResults) => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const clickHandler = async () => {
    const themes: string[] = [];
    topics.forEach((item) => themes.push(item.title));
    try {
      const req = await instance.post("/email", {
        name: name?.current?.value,
        email: email?.current?.value,
        results: themes,
      });
      toast.success("Заявка принята");
    } catch (e: any) {
      toast.error("Проверьте правильность заполнения полей");
    }
  };

  return (
    <div className={"container"}>
      <div className={"wrap"}>
        <div className={styles.result}>{result}</div>
        <div className={styles.header}>
          Похоже вам стоит подучить следующие темы:
        </div>
        {topics.map((item) => (
          <div>
            <div className={styles.menuPoint}>{item.title}:</div>
            {item.links.map((item) => (
              <a target={"_blank"} href={item} className={styles.link}>
                {item}
              </a>
            ))}
          </div>
        ))}
        <div>
          <div className={styles.header}>
            получите личную консультацию с профи
          </div>
          <input ref={name} placeholder={"Name"} />
          <input ref={email} placeholder={"Email"} />
          <button onClick={clickHandler}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default Answers;
