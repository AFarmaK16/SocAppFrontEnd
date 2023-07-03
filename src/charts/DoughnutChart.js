import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const DoughnutChart = () => {
        const orders = useSelector((state) => state.orders.filteredOrders);

  const productOrders = orders.reduce((acc, order) => {
    order.orderItems.forEach((orderItem) => {
      const { product } = orderItem;
      const { product_label } = product;
      
      if (acc[product_label]) {
        acc[product_label] += 1;
      } else {
        acc[product_label] = 1;
      }
    });
    
    return acc;
  }, {});
  const totalOrders = Object.values(productOrders).reduce(
    (total, count) => total + count,
    0
  );
  const sortedProductOrders = Object.entries(productOrders).sort(
    (a, b) => b[1] - a[1]
  );

  const labels = sortedProductOrders.map((entry) => entry[0]);
  const data = sortedProductOrders.map((entry) =>
    ((entry[1] / totalOrders) * 100).toFixed(2)
  );

  const backgroundColors = labels.map((_, index) =>
    getRandomColor(index, labels.length)
  );

  const doughnutData = {
    labels: labels,
    datasets: [
      {
        label: '# de commandes',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
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
      <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
        {" "}
        Produit le plus commendé
      </h3>
      <span>% du Nb de fois qu'un produit a ete commandé</span>
      <Doughnut data={doughnutData} options={options} />
    </div>
  );
};

const getRandomColor = (index, total) => {
  const hue = (360 * index) / total;
  return `hsla(${hue}, 70%, 50%, 0.8)`;
};

export default DoughnutChart;
