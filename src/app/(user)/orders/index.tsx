import { View, Text, FlatList } from "react-native";
import React from "react";
import orders from "@/assets/data/orders";
import OrderListIem from "@/src/components/OrderListItem";

const Orders = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListIem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default Orders;
