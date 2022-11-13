import React from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FONTS, SIZES } from "../constants";

function InfoBookCard({ bookData }) {
  const { book } = bookData;
  return (
    <View>
      <View className="flex my-2 rounded-lg bg-white px-4 py-4">
        <Text
          style={{ fontFamily: FONTS.JosefinSansBold, fontSize: SIZES.medium }}
          className="text-xl text-center mb-2"
        >
          {book.title}
        </Text>
        <View className="flex flex-row ">
          <Image
            source={{ uri: book.image }}
            resizeMode="contain"
            className="h-[150px] w-[30%]"
          />
          <View className="px-2">
            <Text
              className="text-base text-gray-600 "
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Authors: <Text className="" style={{ fontFamily: FONTS.textRegular }}>{book.authors[0]}</Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Publisher: <Text className="" style={{ fontFamily: FONTS.textRegular }}>{book.publisher}</Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Date Published: <Text className="" style={{ fontFamily: FONTS.textRegular }}>{book.date_published}</Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              ISBN 10: <Text className="" style={{ fontFamily: FONTS.textRegular }}>{book.isbn10}</Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              ISBN 13: <Text className="" style={{ fontFamily: FONTS.textRegular }}>{book.isbn13}</Text>
            </Text>
          </View>
        </View>



      </View>
      {/* <View className="bg-white rounded-lg px-4 py-4 nt-4 flex flex-row items-center justify-center flex-wrap mb-1">
        <TouchableOpacity className="bg-[#4e8098] px-2 py-2 rounded-lg ">
          <Text className="text-white " style={{ fontFamily: FONTS.JosefinSansBold }}>
            View on Amazon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#4e8098] ml-2 px-2 py-2 rounded-lg ">
          <Text className="text-white" style={{ fontFamily: FONTS.JosefinSansBold }}>
            Sales Rank: 216.84K
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#4e8098] ml-2 px-2 mt-6 py-2 rounded-lg ">
          <Text className="text-white" style={{ fontFamily: FONTS.JosefinSansBold }}>
            Amazon Sellers: 27 from: $4.69
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default InfoBookCard;
