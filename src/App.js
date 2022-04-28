import { useState } from 'react'

const Heading = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.feedbackCategories.good} />
          <StatisticLine text="neutral" value={props.feedbackCategories.neutral} />
          <StatisticLine text="bad" value={props.feedbackCategories.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positivePercentage} endDelimiter='%' />
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({text, value, endDelimiter=''}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {endDelimiter}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const scores = {
    good: 1,
    neutral: 0,
    bad: -1
  }

  const totalFeedbackCount = () => good + neutral + bad

  const averageScore = () => {
    let score = ((good * scores.good) + (bad * scores.bad)) / totalFeedbackCount()
    return score.toFixed(1)
  }

  const positiveFeedbackPercentage = () => {
    let percentage = (good / totalFeedbackCount()) * 100
    return percentage.toFixed(1)
  }

  const setFeedback = (feedbackCategory, changeStateFunc) => (
    changeStateFunc(feedbackCategory + 1)
  )

  return (
    <div>
      <Heading title="give feedback" />
      <Button handleClick={() => setFeedback(good, setGood)} text='good' />
      <Button handleClick={() => setFeedback(neutral, setNeutral)} text='neutral' />
      <Button handleClick={() => setFeedback(bad, setBad)} text='bad' />
      <Heading title="statistics" />
      <Statistics
        feedbackCategories={{good, neutral, bad}}
        total={totalFeedbackCount()}
        average={averageScore()}
        positivePercentage={positiveFeedbackPercentage()}
      />
    </div>
  )
}

export default App