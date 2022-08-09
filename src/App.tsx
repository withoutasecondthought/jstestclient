import React, {useEffect, useState} from 'react';
import logo from './static/logo.svg';
import "./index.css"
import instance from './helpers/instance';
import {IQuestion} from './@types';
import QuestionBlock from './components/QuestionBlock';
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
    const [list, setList] = useState<IQuestion[]>([])
    const [show, setShow] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])

    useEffect(() => {
        if (!list.length) {
            parseQuestions()
        }
    }, [])

    const parseQuestions = async () => {
        try {
            const {data}: { data: IQuestion[] } = await instance.get("/questions")
            setList(data)
            data.map(item =>
                console.log(item.correct))
        } catch (e) {
            console.log(e);
        }

    }

    const scoreCounter = () => {
        let result = 0
        for (let i = 0; i < list.length; i++) {
            if (list[i].correct === answers[i]) result++
        }
        return result
    }

    return (
        <div className="App">
            <Skeleton isLoaded={list.length}>
                {show <= list.length - 1 ? <QuestionBlock returnIndex={(v) => {
                        setShow(prevState => ++prevState)
                        setAnswers(prevState => [...prevState, v])
                        console.log(v)
                    }} {...list[show]}  /> :
                    <div className={'container'}>
                        <div className={'wrap'}>
                            {scoreCounter()}
                        </div>
                    </div>}

                <img src={logo} className="logo" alt="logo"/>
            </Skeleton>
        </div>
    );
}

export default App;
