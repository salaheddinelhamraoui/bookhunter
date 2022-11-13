import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { SIZES } from "../../constants";
import { addToCard } from "../../features/cardSlice";

const type = "sell";

const OfferCard = ({ index, data, salesRank, huntScore }) => {
  const { bookData, MasterVendors, Vendors, profitFBA } = data;
  const dispatch = useDispatch();

  // AsyncStorage.clear();

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
    console.log(vendor);
    const vendorPrice = Number(vendor?.price.replace("$", ""));
    console.log(vendorPrice);
    try {
      if (vendorPrice > 0) {
        const newData = {
          type,
          bookData: bookData[0],
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

  return (
    <View
      className={`flex flex-row px-4 py-2 bg-white ${
        index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      <View>
        <Text
          style={{
            fontSize: SIZES.small,
          }}
          className="w-24 text-center"
        >
          {bookData[0]?.book?.title}
        </Text>
        <Text
          className=" text-center pt-1"
          style={{
            fontSize: SIZES.base,
          }}
        >
          {bookData[0]?.book?.isbn13}
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
        {salesRank}
      </Text>
      <TextInput
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24"
      >
        $0.00
      </TextInput>
      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        ${profitFBA}
      </Text>
      <View className="ml-4 flex flex-row items-center">
        {Vendors?.length
          ? Vendors.sort(
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

        {/* <Pressable className="w-[80px]" onPress={() => {}}>
          <View className="bg-[#6fbfbf]  rounded-lg py-2 ">
            <Text
              className="text-center"
              style={{
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
                color: "white",
              }}
            >
              Sell
            </Text>
          </View>
        </Pressable> */}
      </View>
    </View>
  );
};

export default OfferCard;
