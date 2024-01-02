import RouterAnchor from "../components/RouterAnchor.tsx";

const OrdersPage = () => {
  return (
    <>
      <h1>Orders</h1>
      <RouterAnchor to="/order/$orderId" params={{ orderId: 1234 }}>
        Order Detail
      </RouterAnchor>
    </>
  );
};

export default OrdersPage;
