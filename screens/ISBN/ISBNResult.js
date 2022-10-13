import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import InfoBookCard from "../../components/InfoBookCard";
import { getISBNResult, sortVendorsBuy } from "../../utils/services";
import { ActivityIndicator } from "react-native-paper";
import SellerCard from "../../components/SellerCard";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../../constants";

function ISBNResult({ route }) {
  const [data, setData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isbn, type } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoaded(false);
    getISBNResult(isbn, type)
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      });
  }, [isbn, type]);

  return (
    <View className="flex-1">
      {isLoaded ? (
        <ScrollView style={{ marginHorizontal: 10 }} className="mb-20">
          <InfoBookCard bookData={data.bookData} />
          <>
            {sortVendorsBuy(data.Vendors).map((vendor, i) => (
              <SellerCard
                bookData={data.bookData}
                type={type}
                vendor={vendor}
                key={vendor.vendorName + "" + i}
              />
            ))}
          </>
        </ScrollView>
      ) : (
        <View className="flex-1 align-middle" >
          <ActivityIndicator animating={true} className="flex-1 align-middle" />
        </View>
      )}
      <View className="absolute w-full bottom-0 py-4 mx-auto flex-1 bg-white rounded-lg" style={{
        shadowColor: "#565958",

        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ISBN SCANNER")}
          className="mx-auto bg-greyBlue py-3 px-2 rounded-lg w-[200px]"
        >
          <Text
            style={{
              fontFamily: FONTS.JosefinSansBold, shadowColor: "#565958",

            }}
            className="text-base text-center text-white"
          >
            Back To Home Page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ISBNResult;
