import React from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FONTS } from "../constants";

function InfoBookCard({ bookData }) {
  const { book } = bookData;
  return (
    <View>
      <View className="my-2 rounded-lg bg-white px-4 py-4">
        {console.log(book.image)}
        <Image
          source={{ uri: book.image }}
          resizeMode="contain"
          className="w-full h-[250px] mb-4"
        />
        {/* <Card.Cover className="p-2 bg-transparent rounded-lg" source={{ uri: book.image }} /> */}
        <Text
          style={{ fontFamily: FONTS.JosefinSansBold }}
          className="text-xl text-center mb-4"
        >
          {book.title}
        </Text>
        <Text
          className="text-base text-gray-600"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          Author: {book.authors[0]}
        </Text>
        <Text
          className="text-base text-gray-600"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          Publisher: {book.publisher}
        </Text>
        <Text
          className="text-base text-gray-600"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          Date Published: {book.date_published}
        </Text>
        <Text
          className="text-base text-gray-600"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          ISBN 10: {book.isbn10}
        </Text>
        <Text
          className="text-base text-gray-600"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          ISBN 13: {book.isbn13}
        </Text>
      </View>
      <View className="bg-white rounded-lg px-4 py-4 nt-4 flex flex-row items-center justify-center flex-wrap">
        <TouchableOpacity className="bg-blue-500 px-2 py-2 rounded-lg ">
          <Text className="text-white " style={{ fontFamily: FONTS.JosefinSansBold }}>
            View on Amazon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 ml-2 px-2 py-2 rounded-lg ">
          <Text className="text-white" style={{ fontFamily: FONTS.JosefinSansBold }}>
            SALES RANK: 216.84K
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 ml-2 px-2 mt-4 py-2 rounded-lg ">
          <Text className="text-white" style={{ fontFamily: FONTS.JosefinSansBold }}>
            Amazon Sellers: 27 from: $4.69
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InfoBookCard;
