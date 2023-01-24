import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { addToCard } from "../../features/cardSlice";

function VendorsTable({
  sortedVendors,
  handleVendorsClick,
  setPreviousVendorsID,
  bookData,
  vendorName,
  venderValue,
}) {
  // useEffect(() => {
  //   setPreviousVendorsID();
  // }, []);

  const dispatch = useDispatch();

  function addToStore(vendor) {
    const vendorPrice = Number(vendor?.price.replace("$", ""));
    try {
      if (vendorPrice > 0) {
        const newData = {
          type: "sell",
          bookData,
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
    <View>
      <View className="py-4 bg-lightTeal flex items-center">
        <Text>PROFIT VENDORS</Text>
        <Text>${venderValue}</Text>
      </View>
      <View className="flex-row pt-2 bg-white ">
        <View className="flex-grow items-center">
          <Text>{sortedVendors.length}</Text>
          <Text>Vendors</Text>
          <View className=" w-full flex-row py-4">
            <View className="flex-grow items-center">
              {sortedVendors.length
                ? sortedVendors.map(
                    (vendor, index) =>
                      +vendor.price.replace(/[^\d.-]/g, "") != 0 && (
                        <Pressable
                          key={index}
                          onPress={() =>
                            handleVendorsClick(vendor.price, vendor.vendorName)
                          }
                          className={`my-2 p-2 rounded-md flex-row w-5/6 justify-between items-center ${
                            vendor?.vendorName === vendorName
                              ? "bg-darkTeal"
                              : null
                          }`}
                        >
                          <Image
                            source={{
                              uri: "https://bookhunter.com" + vendor.vendorLogo,
                            }}
                          />
                          <Text>{vendor.vendorName}</Text>
                          <Text>{vendor.price}</Text>
                          <Pressable
                            onPress={() => addToStore(vendor)}
                            className="bg-greyBlue px-2 py-1 rounded-md"
                          >
                            <Text className="text-white">Sell</Text>
                          </Pressable>
                        </Pressable>
                      )
                  )
                : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default VendorsTable;
