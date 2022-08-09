import { IQuestion } from "../../@types";
import styles from "./QuestionBlock.module.css";
import classNames from "classnames/bind";

interface IQuestionBlockProps extends IQuestion {
  returnIndex: (v: number) => string | void;
}

const QuestionBlock = ({
  text,
  code,
  options,
  returnIndex,
}: IQuestionBlockProps) => {
  const cx = classNames.bind(styles);

  const clickHandler = (i: number) => {
    returnIndex(i);
  };

  const wordPrettier: (v: string, i: number) => JSX.Element | JSX.Element[] = (
    v: string,
    i: number
  ) => {
    let localClass: any;
    switch (v) {
      case "let" || "const" || "var":
        localClass = "blue";
        break;
      case "new":
        localClass = "blue";
        break;
    }

    let htmlValue = v
      .replaceAll(/([0-9])/gm, `<span class='letter'>$1</span>`)
      .replaceAll(/([[\](){}])/g, `<span class='bracket'>$1</span>`)
      .replaceAll(/this/g, `<span class='blue'>this</span>`)
      .replaceAll(/function/g, `<span class='blue'>function</span>`)
      .replaceAll(/(".+")/gu, `<span class='letter'>$1</span>`);

    return (
      <span
        key={i}
        className={localClass}
        dangerouslySetInnerHTML={{ __html: htmlValue }}
      ></span>
    );
  };

  return (
    <div className={"container"}>
      <div className={"wrap"}>
        <div className={styles.title}>{text}</div>
        {code ? (
          <div className={styles.code}>
            {code?.split("\n").map((v, i) => (
              <p key={i}>
                {v.split(" ").map((item, index) => (
                  <span>{wordPrettier(item, index)} </span>
                ))}
                <br />
              </p>
            ))}
          </div>
        ) : null}
        <div className={styles.options}>
          {options.map((item, index) => (
            <div
              onClick={() => clickHandler(index)}
              key={index}
              className={styles.option}
            >
              <div className={cx("checkbox")}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;
