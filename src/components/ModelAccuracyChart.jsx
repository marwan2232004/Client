import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ModelAccuracyChart = ({ accuracyData }) => {
  if (!accuracyData) {
    return null;
  }

  // Convert accuracyData to an array for Recharts
  const chartData = Object.entries(accuracyData).map(([model, { train, test }]) => ({
    model,
    train,
    test,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="model" />
        <YAxis />
        <Tooltip formatter={(value, name) => `${value}% (${name})`} />
        <Legend />
        <Bar dataKey="train" fill="#50C878" name="Train Accuracy" />
        <Bar dataKey="test" fill="#008000" name="Test Accuracy" />
      </BarChart>
    </ResponsiveContainer>
  );
};

ModelAccuracyChart.propTypes = {
  accuracyData: PropTypes.shape({
    "DNN": PropTypes.shape({
      train: PropTypes.number.isRequired,
      test: PropTypes.number.isRequired,
    }).isRequired,
    "Logistic Regression": PropTypes.shape({
      train: PropTypes.number.isRequired,
      test: PropTypes.number.isRequired,
    }).isRequired,
    "Naive Bayes": PropTypes.shape({
      train: PropTypes.number.isRequired,
      test: PropTypes.number.isRequired,
    }).isRequired,
    "SVM": PropTypes.shape({
      train: PropTypes.number.isRequired,
      test: PropTypes.number.isRequired,
    }).isRequired,
    "K-Nearest Neighbors": PropTypes.shape({
      train: PropTypes.number.isRequired,
      test: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ModelAccuracyChart;
