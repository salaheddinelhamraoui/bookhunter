import React from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FONTS, SIZES } from "../constants";

function InfoBookCard({ bookData }) {
  // const { book } = bookData;
  const book = null;
  return (
    <View>
      <View className="flex my-2 rounded-lg bg-white px-4 py-4">
        <Text
          style={{ fontFamily: FONTS.JosefinSansBold, fontSize: SIZES.medium }}
          className="text-xl text-center mb-2"
        >
          {book?.title || "title"}
        </Text>
        <View className="flex flex-row ">
          <Image
            source={{
              uri:
                book?.image ||
                "https://images-na.ssl-images-amazon.com/images/I/51kq9h0dJUL.jpg,411dA8gApoL.jpg",
            }}
            resizeMode="contain"
            className="h-[150px] w-[30%]"
          />
          <View className="px-2">
            <Text
              className="text-base text-gray-600 "
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Authors:{" "}
              <Text className="" style={{ fontFamily: FONTS.textRegular }}>
                {book?.authors[0] || "author"}
              </Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Publisher:{" "}
              <Text className="" style={{ fontFamily: FONTS.textRegular }}>
                {book?.publisher || "publisher"}
              </Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Date Published:{" "}
              <Text className="" style={{ fontFamily: FONTS.textRegular }}>
                {book?.date_published || "published"}{" "}
              </Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              ISBN 10:{" "}
              <Text className="" style={{ fontFamily: FONTS.textRegular }}>
                {book?.isbn10 || "xxxxxxxx10"}{" "}
              </Text>
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              ISBN 13:{" "}
              <Text className="" style={{ fontFamily: FONTS.textRegular }}>
                {book?.isbn13 || "xxxxxxxx13"}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default InfoBookCard;
