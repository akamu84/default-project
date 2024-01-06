import RouterAnchor from '../components/RouterAnchor.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ordersQueryOptions } from '../queryOptions.ts';
import { Stack } from '@mantine/core';

const OrdersPage = () => {
  const ordersQuery = useSuspenseQuery(ordersQueryOptions());

  const orders = ordersQuery.data;

  return (
    <>
      <h1>Orders</h1>
      <Stack>
        {orders.map((order) => (
          <RouterAnchor
            key={order.id}
            to="/orders/$orderId"
            params={{ orderId: order.id }}
          >
            Order {order.id}
          </RouterAnchor>
        ))}
      </Stack>
    </>
  );
};

export default OrdersPage;
