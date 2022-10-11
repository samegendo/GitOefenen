import * as React from 'react';
import styles from './App.module.scss';
import { useEffect, useState } from 'react';

const App = () => {

  const [mongo, setMongo] = useState<any>();

  const mongoDB = async () => {

    let promise1 = await fetch('http://localhost:3000/');
    let promise2 = await promise1.json();
    setMongo(promise2);
  }

  useEffect(() => {
    mongoDB();
  }, []);


  return (
    <div className={styles.container}>
      <header className={styles.header}><h1>Welkom in onze quiz</h1></header>
      {mongo &&
        <div>
          <div className={styles.smallContainer}>
            <h1 className={styles.headers}>Quiz</h1>
            <div>{mongo.quizzes.map(item => <p className={styles.context}>{item.quizName}</p>)}
            </div>
          </div>

          <div className={styles.smallContainer}>
            <h1 className={styles.headers}>Questions</h1>
            <div>{mongo.questions.map(item => <p className={styles.context}>{item.question}</p>)}</div>
          </div>

          <div className={styles.smallContainer}>
            <h1 className={styles.headers}>Answers</h1>
            <div>{mongo.answers.map(item => <p className={styles.context}>{item.answer}</p>)}</div>
          </div>
        </div>
      }




    </div>
  );
}

export default App;
