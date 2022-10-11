import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import InfoBookCard from "../../shared/components/InfoBookCard";
import { getISBNResult, sortVendorsBuy } from "../../utils/services";
import { ActivityIndicator } from "react-native-paper";
import SellerCard from "../../shared/components/SellerCard";
import { ScrollView } from "react-native-gesture-handler";

function ISBNResult({ route, navigation }) {
  const [data, setData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isbn, type } = route.params;

  useEffect(() => {
    setIsLoaded(false);
    getISBNResult(isbn, type)
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <View className="flex-1">
      {isLoaded ? (
        <>
          <InfoBookCard bookData={data.bookData} />
          <>
            <ScrollView style={{ marginHorizontal: 10 }}>
              {sortVendorsBuy(data.Vendors).map((vendor, i) => (
                <SellerCard
                  type={type}
                  vendor={vendor}
                  key={vendor.vendorName + "" + i}
                />
              ))}
            </ScrollView>
          </>
        </>
      ) : (
        <View className="flex-1 align-middle ">
          <ActivityIndicator animating={true} className="flex-1 align-middle" />
        </View>
      )}
    </View>
  );
}

export default ISBNResult;
