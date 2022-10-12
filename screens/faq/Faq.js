import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constants";

const Faq = () => {
  return (
    <ScrollView>
      <View className="mx-4 my-4 bg-white px-4 py-4 rounded-lg">
        <Text
          className="text-center"
          style={{
            fontFamily: FONTS.JosefinSansBold,
          }}
        >
          FAQs
        </Text>
      </View>
      <View className="mx-4 bg-white px-4 py-4 rounded-lg mb-6">
        <Text
          className=""
          style={{
            fontFamily: FONTS.textRegular,
          }}
        >
          <Text
            className=""
            style={{
              fontFamily: FONTS.textBold,
              fontWeight: "bold",
            }}
          >
            How much can I make flipping books?
          </Text>
          {"\n"}
          {"\n"}
          <Text
            className=""
            style={{
              fontFamily: FONTS.textRegular,
            }}
          >
            Read how Charlie Williams made over $4,000 per month selling used books online from the comfort of his own home and/or while on vacation. BookHunter makes it easier than ever!
          </Text>
        </Text>

        <Text
          className=""
          style={{
            fontFamily: FONTS.textRegular,
          }}
        >
          {"\n"}
          {"\n"}
          <Text
            className=""
            style={{
              fontFamily: FONTS.textBold,
              fontWeight: "bold",
            }}
          >
            How much time does it take?
          </Text>
          {"\n"}
          {"\n"}
          <Text
            className=""
            style={{
              fontFamily: FONTS.textRegular,
            }}
          >
            With practice, you can make money flipping books for only a couple hours each day! It might take a little more time upfront to get started, but our users get faster and more profitable as they go.
          </Text>
        </Text>
        <Text
          className=""
          style={{
            fontFamily: FONTS.textRegular,
          }}
        >
          {"\n"}
          {"\n"}
          <Text
            className=""
            style={{
              fontFamily: FONTS.textBold,
              fontWeight: "bold",
            }}
          >
            How does it work?
          </Text>
          {"\n"}
          {"\n"}
          <Text
            className=""
            style={{
              fontFamily: FONTS.textRegular,
            }}
          >
            It’s easy! You can scan books or upload.
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Faq;
