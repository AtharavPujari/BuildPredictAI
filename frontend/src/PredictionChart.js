import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const PredictionChart = ({ data }) => {
  const barData = [
    { name: "Cost (₹)", value: data.predicted_cost },
    { name: "Time (days)", value: data.predicted_time_days }
  ];

  const pieData = [
    { name: data.safety_risk, value: 1 }
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Prediction Visualization</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h4 style={{ marginTop: "2rem" }}>Safety Risk</h4>
      <ResponsiveContainer width="50%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            <Cell fill={data.safety_risk === "High" ? "#ff4d4d" : data.safety_risk === "Medium" ? "#ffa500" : "#00c853"} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
