import { orderDetailRoute } from '../routes/orderRoutes.ts';

const OrderDetailPage = () => {
  const { orderId } = orderDetailRoute.useParams();
  return <h1>Order Detail: {orderId}</h1>;
};

export default OrderDetailPage;
