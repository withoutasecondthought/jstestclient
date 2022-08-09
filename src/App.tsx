import React, { useEffect, useState } from "react";
import logo from "./static/logo.svg";
import "./index.css";
import instance from "./helpers/instance";
import { IQuestion, ITopic } from "./@types";
import QuestionBlock from "./components/QuestionBlock";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
  const [list, setList] = useState<IQuestion[]>([]);
  const [show, setShow] = useState(0);
  const [answers, setAnswers] = useState<ITopic>({});

  useEffect(() => {
    if (!list.length) {
      parseQuestions();
    }
  }, []);

  const parseQuestions = async () => {
    try {
      const { data }: { data: any } = await instance.get("/questions");
      setList(data.questions);
      setAnswers(data.topics);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const answerHandler = (v: number) => {
      if (v === list[show-1].correct){
        setAnswers(prevState => {...prevState, list[show-1].topic = prevState.list[show-1].topic+1})
      }
  };

  return (
    <div className="App">
      <Skeleton isLoaded={list.length}>
        {show <= list.length - 1 ? (
          <QuestionBlock
            returnIndex={(v) => {
              setShow((prevState) => ++prevState);
              answerHandler(v)
              console.log(v);
            }}
            {...list[show]}
          />
        ) : (
          <div className={"container"}>
            <div className={"wrap"}>{scoreCounter()}</div>
          </div>
        )}

        <img src={logo} className="logo" alt="logo" />
      </Skeleton>
    </div>
  );
}

export default App;
