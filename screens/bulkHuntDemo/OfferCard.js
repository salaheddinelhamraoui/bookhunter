import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { FONTS, SIZES } from "../../constants";
import { addToCard } from "../../features/cardSlice";

const type = "sell";

const OfferCard = ({
  index,
  data,
  ave,
  salesRank,
  huntScore,
  finalProfit,
  vendors,
  deleteOfferCard,
}) => {
  const { book } = data[0];
  const dispatch = useDispatch();
  const [cost, setCost] = useState(0);

  function VendorQuantity(vendor) {
    switch (vendor?.vendorName) {
      case "WinyaBooks":
        return 5;
      case "Empire Text":
        return 2;
      case "BookToCash":
        return 1;
      case "Textbook Maniac":
        return 10;
      case "eCampus":
        return 5;
      case "sellbackbooks":
        return 5;
      case "ValoreBooks":
        return vendor?.quantity[0] || 0;
      default:
        return 1;
    }
  }

  function addToStore(quantity, vendor) {
    const vendorPrice = Number(vendor?.price.replace("$", ""));
    try {
      if (vendorPrice > 0) {
        const newData = {
          type,
          bookData: data[0],
          vendor,
        };
        dispatch(addToCard(newData));
        Toast.show("added to cart");
      } else {
        Toast.show("There is no offer available", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          containerStyle: {
            backgroundColor: "#FF8787",
            height: 60,
            justifyContent: "center",
          },
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show("There is no offer available", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
          backgroundColor: "#FF8787",
          height: 60,
          justifyContent: "center",
        },
      });
    }
  }

  const renderSalesRank = (salesRank) => {
    console.log(salesRank);
    const aveLength = salesRank.split(",").length;
    const value = salesRank.split(",")[0];
    if (aveLength === 1) return value;
    if (aveLength === 2) return `${value}K`;
    if (aveLength === 3) return `${value}M`;
  };

  return (
    <View
      className={`flex flex-row px-4 py-2 bg-white ${
        index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      {/* <Pressable
        className=" justify-center w-24 items-center"
        // onPress={() => deleteOfferCard(data?.cardId)}
      >
        <View className="bg-red-600 w-6 h-6 justify-center items-center pt-[6px] rounded-full overflow-hidden shadow-lg">
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-white"
          >
            X
          </Text>
        </View>
      </Pressable> */}
      <View>
        <Text
          style={{
            fontSize: SIZES.small,
          }}
          className="w-24 text-center"
        >
          {book?.title}
        </Text>
        <Text
          className=" text-center pt-1"
          style={{
            fontSize: SIZES.base,
          }}
        >
          {book?.isbn13}
        </Text>
      </View>

      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        {huntScore}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        {salesRank && renderSalesRank(salesRank)}
      </Text>
      <TextInput
        keyboardType="numeric"
        onChange={(e) => setCost(Number(e))}
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24"
      >
        0
      </TextInput>
      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        ${finalProfit}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        {ave}
      </Text>
      <View className="ml-4 flex flex-row items-center">
        {vendors?.length
          ? vendors
              .sort(
                (a, b) => a?.price?.replace("$", "") < b?.price.replace("$", "")
              )
              .filter((_, index) => index <= 2)
              .map(
                (vendor, index) => (
                  // vendor?.price !== "0" && vendor?.price !== "$0" ? (
                  <Pressable
                    onPress={() => addToStore(vendor?.quantity, vendor)}
                    className="w-24 flex flex-col"
                    key={vendor.vendorName + vendor.price + index}
                  >
                    <View className="flex flex-row items-center">
                      <Image
                        source={{
                          uri: "https://bookhunter.com" + vendor?.vendorLogo,
                        }}
                        resizeMode="contain"
                        className="w-[20px] h-[20px] mr-2"
                      />
                      <Text>{vendor?.price}</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: SIZES.base,
                      }}
                      className="text-center"
                    >
                      Max Qty: {VendorQuantity(vendor)}
                    </Text>
                  </Pressable>
                )
                // ) : null
              )
          : null}
      </View>
    </View>
  );
};

export default OfferCard;
