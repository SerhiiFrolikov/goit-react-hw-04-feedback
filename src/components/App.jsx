import { useState } from 'react';
import Statistics from './statistics/Statistics';
import Section from './section/Section';
import FeedbackOptions from './feedbackoptions/FeedbackOptions';
import Notification from './notification/Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const StatisticsIncrement = event => {
    const { id } = event.target;

    if (id === 'good') setGood(good => good + 1);
    if (id === 'neutral') setNeutral(neutral => neutral + 1);
    if (id === 'bad') setBad(bad => bad + 1);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / countTotalFeedback());
  };

  const options = Object.keys({ good, neutral, bad });
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={StatisticsIncrement}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};

export default App;
