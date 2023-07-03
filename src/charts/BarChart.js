import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { useSelector } from "react-redux";

const BarChart = () => {
  const orders = useSelector((state) => state.orders.filteredOrders);

  // Extracting the necessary data
  const productCounts = countProducts(orders);
  const ordersPerMonth = countOrdersPerMonth(orders);

  // Chart data for most ordered products
  const productData = {
    labels: Object.keys(productCounts),
    datasets: [
      {
        label: "# de commandes",
        data: Object.values(productCounts),
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

  // Chart data for orders per month
  const monthLabels = Object.keys(ordersPerMonth);
  const orderCounts = Object.values(ordersPerMonth);
  const monthData = {
    labels: monthLabels,
    datasets: [
      {
        label: "# de commandes",
        data: orderCounts,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
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

  // Get the current month and year
  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Filter orders for the current month
  const currentMonthOrders = orders.filter((order) => {
    const orderDate = new Date(order.order_Date);
    return (
      orderDate.getMonth() === currentDate.getMonth() &&
      orderDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Count the number of orders for each product in the current month
  const currentMonthProductCounts = countProducts(currentMonthOrders);

  // Chart data for orders in the current month
  const currentMonthData = {
    labels: Object.keys(currentMonthProductCounts),
    datasets: [
      {
        label: "# de commandes",
        data: Object.values(currentMonthProductCounts),
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

  return (
    <div className="gap-9">
      {/* <div>
        <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
          Produit le plus commandé du mois de <b>{currentMonthYear}</b>
        </h3>
        <Bar data={currentMonthData} options={options} />
      </div>
      <div className="">
        <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
          Produit le plus commandé
        </h3>
        <Bar data={productData} options={options} />
      </div>
      <div>
        <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
          Commandes par mois
        </h3>
        <Bar data={monthData} options={options} />
      </div> */}

      <div className="flex m-7 space-x-6">
        <div className="w-1/2 bg-white pt-4">
          <div>
            <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
              Commandes par mois
            </h3>
            <Bar data={monthData} options={options} />
          </div>
           <div>
            {" "}
            <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
              Produit le plus commandé
            </h3>
            <Bar data={productData} options={options} />
          </div>
        </div>
        <div className="w-1/2 bg-white p-4">  <div>
            <h3 className="uppercase my-3 font-bold text-sm text-gray-400">
              Produit le plus commandé du mois de <b>{currentMonthYear}</b>
            </h3>
            <Bar data={currentMonthData} options={options} />
          </div>
       
        </div>
      </div>
    </div>
  );
};

// Count the number de commandes for each product
const countProducts = (orders) => {
  const productCounts = {};

  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      const productName = item.product.product_label;

      if (productCounts[productName]) {
        productCounts[productName]++;
      } else {
        productCounts[productName] = 1;
      }
    });
  });

  return productCounts;
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

export default BarChart;
