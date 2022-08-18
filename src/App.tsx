import React, { useEffect, useState } from "react";
import logo from "./static/logo.svg";
import "./index.css";
import instance from "./helpers/instance";
import { IQuestion, IResults, IResultTopic, ITopic } from "./@types";
import QuestionBlock from "./components/QuestionBlock";
import Skeleton from "./components/Skeleton/Skeleton";
import Answers from "./components/Answers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [list, setList] = useState<IQuestion[]>([]);
  const [show, setShow] = useState(0);
  const [answers, setAnswers] = useState<ITopic>({});
  const [skeletonText, setSkeletonText] = useState("WAIT A SECOND");
  const [links, setLinks] = useState<IResultTopic[]>([]);
  const [percents, setPercents] = useState("");

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
      setSkeletonText("BACKEND FALL LIKE A GOOD GUY");
    }
  };

  const answerHandler = async (v: number) => {
    if (v === list[show - 1]?.correct) {
      // @ts-ignore
      const topic = list[show - 1].topic.toString();
      setAnswers((prevState) => ({
        ...prevState,
        [topic]: ++prevState[topic],
      }));
    }
    if (show === list.length - 1) {
      const { data }: { data: IResults } = await instance.post(
        "/estimate",
        answers
      );
      setLinks(data.topics);
      setPercents(data.result);
    }
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Skeleton isLoaded={list.length} title={skeletonText}>
        {show <= list.length - 1 ? (
          <QuestionBlock
            returnIndex={(v) => {
              setShow((prevState) => ++prevState);
              answerHandler(v);
            }}
            {...list[show]}
          />
        ) : (
          <Answers result={percents} topics={links} />
        )}
      </Skeleton>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default App;
