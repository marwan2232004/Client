import PropTypes from "prop-types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ComparisonChart = ({ data }) => {
  if (!data) {
    return null;
  }

  // Create an object to store counts and model names for each crop
  const cropDetails = Object.entries(data).reduce((acc, [model, crop]) => {
    if (!acc[crop]) {
      acc[crop] = {
        count: 0,
        models: [],
      };
    }
    acc[crop].count += 1;
    acc[crop].models.push(model);
    return acc;
  }, {});

  // Convert cropDetails to an array for Recharts
  const chartData = Object.entries(cropDetails).map(([crop, details]) => ({
    crop,
    count: details.count,
    models: details.models.join(", "), // Concatenate model names into a string
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="crop" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => [
            `${value} (${props.payload.models})`, // Show count and model names in tooltip
            name,
          ]}
        />
        <Legend />
        <Bar dataKey="count" fill="#4CBB17" />
      </BarChart>
    </ResponsiveContainer>
  );
};

ComparisonChart.propTypes = {
  data: PropTypes.shape({
    DNN: PropTypes.string.isRequired,
    "Logistic Regression": PropTypes.string.isRequired,
    "Naive Bayes": PropTypes.string.isRequired,
    SVM: PropTypes.string.isRequired,
    "K-Nearest Neighbors": PropTypes.string.isRequired,
  }).isRequired,
};

export default ComparisonChart;
