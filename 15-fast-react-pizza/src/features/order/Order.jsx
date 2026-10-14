// Test ID: IIDSAT
import OrderItem from "./OrderItem"
import { useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";


function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="flex items-center flex-wrap gap-2 sm:flex-none">
          {priority && <span className="text-red-100 bg-red-500 px-4 py-2 rounded-full font-semibold uppercase tracking-wide">Priority</span>}{" "}
          <span className="text-green-100 bg-green-500 px-4 py-2 rounded-full font-semibold uppercase tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-stone-200 divide-y border-b border-t">
        {cart.map(item => <OrderItem item={item} key={item.id} />)}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm text-stone-600 font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm text-stone-600 font-medium">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({params}) {
  const data = await getOrder(params.orderId);
  return data;
}

export default Order;
