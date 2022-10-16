import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../constants";
import CardModal from "./CardModal";

function RentCard({ vendor, type, bookData }) {
  const [modalVisible, setModalVisible] = useState(false);

  const API = "https://bookhunter.com";

  const renderItems = (item, i) => {
    const DATA = {
      vendor: { ...item },
      type,
      bookData,
    };

    return (
      <TouchableOpacity
        key={i + "" + item.vendorName}
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        className="bg-white flex-row justify-between align-middle rounded-lg shadow-sm"
      >
        <CardModal
          data={DATA}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View className="flex flex-row   w-[70%]">
          <Image
            source={{ uri: API + item.vendorLogo }}
            resizeMode="contain"
            className="w-[35px] mr-2"
          />
          <View>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-base"
            >
              {item.vendorName}
            </Text>
          </View>
          {parseFloat(item.price.replace("$", "")) !== 0 && (
            <View className="ml-auto">
              <Text
                style={{ fontFamily: FONTS.JosefinSansBold }}
                className="text-base"
              >
                {item.price}
              </Text>
            </View>
          )}
        </View>
        {parseFloat(item.price.replace("$", "")) !== 0 && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className={`flex-1 justify-center px-5 rounded-md ${
              parseFloat(item.price.replace("$", "")) === 0
                ? "bg-gray-400"
                : "bg-red-400"
            }`}
            disabled={
              parseFloat(item.price.replace("$", "")) === 0 ? true : false
            }
          >
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-base text-white"
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
        {parseFloat(item.price.replace("$", "")) === 0 && (
          <TouchableOpacity onPress={() => {}} className="">
            <Text
              style={{ fontFamily: FONTS.textRegular, fontSize: 11 }}
              className="text-base text-black "
            >
              No available offers
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return <>{vendor.map((item, i) => renderItems(item, i))}</>;
}

export default RentCard;
