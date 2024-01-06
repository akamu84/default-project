import { orderDetailRoute } from '../routes/orderRoutes.ts';
import { Stack } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderQueryOptions } from '../queryOptions.ts';

const OrderDetailPage = () => {
  const orderId = orderDetailRoute.useParams({
    select: (params) => params.orderId,
  });

  const orderQuery = useSuspenseQuery(orderQueryOptions(orderId));

  const order = orderQuery.data;

  return (
    <Stack>
      <h1>Order Detail: {order.id}</h1>
      <h1>Total: {order.total}</h1>
    </Stack>
  );
};

export default OrderDetailPage;
