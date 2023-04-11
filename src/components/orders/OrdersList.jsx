import React from 'react';
import OrderListView from "./OrderListView";
import OrderGridView from "./OrderGridView";
import { useSelector } from "react-redux";
import TheSpinner from "../../layout/TheSpinner";
import { Card } from 'reactstrap';

const OrdersList = () => {
     const orderGridView = useSelector((state) => state.ui.orderGridView);
    const orders= useSelector((state) => state.orders.filteredOrders);
    const loading = useSelector((state) => state.ui.ordersLoading);
    // console.log(state.orders)
    //     const gridView = useSelector((state) => state.ui.gridView);
    // const orders = useSelector((state) => state.products.filteredProducts);
    // const loading = useSelector((state) => state.ui.productsLoading);

    if (loading) {
      return <TheSpinner />;
    } else if (orders.length < 1) {
      return (
        <div className="w-full">
          <p className="mx-auto">Sorry, no orders matched your search.</p>
        </div>
      );
    }

    if (orderGridView) {
      return <OrderGridView orders={orders} />;
    }
    return (
      <Card>
        <OrderListView orders={orders} />
      </Card>
    );
};

export default OrdersList;