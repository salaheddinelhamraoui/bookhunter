import React from "react";
import { Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FONTS } from "../../constants";

function InfoBookCard({ bookData }) {
  const { book } = bookData;
  return (
    <Card className="m-2">
      <Card.Cover className="p-2 bg-transparent" source={{ uri: book.image }} />
      <Card.Title
        titleVariant="titleLarge"
        title={book.title}
        titleStyle={{ fontFamily: FONTS.JosefinSansBold }}
      />
      <Card.Content>
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
      </Card.Content>
    </Card>
  );
}

export default InfoBookCard;
