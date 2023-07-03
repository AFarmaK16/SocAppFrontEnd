import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { useSelector } from "react-redux";

const LineChart = () => {
  const orders = useSelector((state) => state.orders.filteredOrders);
  const ordersPerMonth = countOrdersPerMonth(orders);
  const monthLabels = Object.keys(ordersPerMonth);
  const orderCounts = Object.values(ordersPerMonth);
  const monthData = {
    labels: monthLabels,
    datasets: [
      {
        label: "# de commandes",
        data: Object.values(orderCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>LINE CHART</h1>
      <Line data={monthData} options={options} />
    </div>
  );
};

// Count the number de commandes per month
const countOrdersPerMonth = (orders) => {
  const ordersPerMonth = {};

  orders.forEach((order) => {
    const orderDate = new Date(order.order_Date);
    const monthYear = `${orderDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}`;

    if (ordersPerMonth[monthYear]) {
      ordersPerMonth[monthYear]++;
    } else {
      ordersPerMonth[monthYear] = 1;
    }
  });

  return ordersPerMonth;
};

export default LineChart;
