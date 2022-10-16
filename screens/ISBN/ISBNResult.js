import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import InfoBookCard from "../../components/InfoBookCard";
import {
  getISBNResult,
  sortRent,
  sortVendorsBuy,
  sortVendorsSell,
} from "../../utils/services";
import { ActivityIndicator } from "react-native-paper";
import SellerCard from "../../components/SellerCard";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../../constants";
import RentCard from "../../components/RentCard";

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

  const renderSellBuy = () => {
    return (
      <View className="flex-1">
        {isLoaded ? (
          <ScrollView style={{ marginHorizontal: 10 }} className="mb-20">
            <InfoBookCard bookData={data.bookData} />
            <>
              {type === "buy"
                ? sortVendorsBuy(data.Vendors).map((vendor, i) => (
                    <SellerCard
                      bookData={data.bookData}
                      type={type}
                      vendor={vendor}
                      key={vendor.vendorName + "" + i}
                    />
                  ))
                : sortVendorsSell(data.Vendors).map((vendor, i) => (
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
          <View className="flex-1 align-middle">
            <ActivityIndicator
              animating={true}
              className="flex-1 align-middle"
            />
          </View>
        )}
        <View
          className="absolute w-full bottom-0 py-4 mx-auto flex-1 bg-white rounded-lg flex-row"
          style={{
            shadowColor: "#565958",

            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ISBN SCANNER")}
            className="mx-auto bg-greyBlue py-3 px-2 rounded-lg w-[200px]"
          >
            <Text
              style={{
                fontFamily: FONTS.JosefinSansBold,
                shadowColor: "#565958",
              }}
              className="text-base text-center text-white"
            >
              Back To Home Page
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigation.navigate("SCANNER")}
            className="mx-auto bg-greyBlue py-3 px-2 rounded-lg w-[200px]"
          >
            <Text
              style={{
                fontFamily: FONTS.JosefinSansBold,
                shadowColor: "#565958",
              }}
              className="text-base text-center text-white"
            >
              Scan Another Book
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderRent = () => {
    return (
      <View className="flex-1">
        {isLoaded ? (
          <ScrollView className="mb-20">
            <InfoBookCard bookData={data.bookData} />
            <>
              {sortRent(data.Vendors).map((vendor, i) => {
                return (
                  <>
                    <Text
                      className="bg-[#82d9d9] py-4 px-2 text-lg"
                      style={{ fontFamily: FONTS.JosefinSansBold }}
                    >
                      {vendor.duration !== undefined
                        ? `${vendor.duration} Months +`
                        : "Others"}
                    </Text>
                    <View style={{ marginHorizontal: 10 }}>
                      <RentCard
                        bookData={data.bookData}
                        type={type}
                        vendor={vendor.vendors}
                        key={i}
                      />
                    </View>
                  </>
                );
              })}
            </>
          </ScrollView>
        ) : (
          <View className="flex-1 align-middle">
            <ActivityIndicator
              animating={true}
              className="flex-1 align-middle"
            />
          </View>
        )}
        <View
          className="absolute w-full bottom-0 py-4 mx-auto flex-1 bg-white rounded-lg"
          style={{
            shadowColor: "#565958",

            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ISBN SCANNER")}
            className="mx-auto bg-greyBlue py-3 px-2 rounded-lg w-[200px]"
          >
            <Text
              style={{
                fontFamily: FONTS.JosefinSansBold,
                shadowColor: "#565958",
              }}
              className="text-base text-center text-white"
            >
              Back To Home Page
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <>{type === "rent" ? renderRent() : renderSellBuy()}</>;
}

export default ISBNResult;
