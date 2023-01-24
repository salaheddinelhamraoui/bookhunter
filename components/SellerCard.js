import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { FONTS } from "../constants";
import { addToCard } from "../features/cardSlice";

import CardModal from "./CardModal";

function SellerCard({ vendor, type, bookData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const API = "https://bookhunter.com";
  const {
    vendorName,
    price,
    link,
    vendorLogo,
    sell,
    duration = false,
  } = vendor;

  const DATA = {
    vendor: { ...vendor },
    type,
    bookData,
  };

  return (
    <>
      <TouchableOpacity
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        className="bg-white flex-row justify-between align-middle rounded-lg"
      >
        <View className="flex flex-row   w-[70%]">
          <Image
            source={{ uri: API + vendorLogo }}
            resizeMode="contain"
            className="w-[35px] mr-2"
          />
          <View>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-base"
            >
              {vendorName}
            </Text>
          </View>
          {parseFloat(price.replace("$", "")) !== 0 && (
            <View className="ml-auto">
              <Text
                style={{ fontFamily: FONTS.JosefinSansBold }}
                className="text-base"
              >
                {`$${Number(price.replace("$", "")).toFixed(2)}`}
              </Text>
            </View>
          )}
        </View>
        {parseFloat(price.replace("$", "")) !== 0 && (
          <TouchableOpacity
            onPress={() => {
              dispatch(addToCard(DATA));
              Toast.show("Book added to cart!", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                containerStyle: {
                  zIndex: 9999,
                  backgroundColor: "#68B984",
                  height: 60,
                  justifyContent: "center",
                },
              });
            }}
            className={`flex-1 justify-center px-5 rounded-md ${
              parseFloat(price.replace("$", "")) === 0
                ? "bg-gray-400"
                : "bg-red-400"
            }`}
            disabled={parseFloat(price.replace("$", "")) === 0 ? true : false}
          >
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-base text-white"
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
        {parseFloat(price.replace("$", "")) === 0 && (
          <TouchableOpacity onPress={() => {}} className="">
            <Text
              style={{ fontFamily: FONTS.textRegular, fontSize: 13 }}
              className="text-base text-black mr-12"
            >
              No available offers
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {/* <CardModal
        data={DATA}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
    </>
  );
}

export default SellerCard;
