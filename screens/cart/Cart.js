import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CartVendor from "../../components/CartVendor";

function Cart() {
  const { items } = useSelector((state) => state.cardSlice);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {items.map((item, i) => (
        <CartVendor data={item} key={i} title={item.vendor} />
      ))}
    </ScrollView>
  );
}

export default Cart;
