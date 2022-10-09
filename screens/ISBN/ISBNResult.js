import React, { useEffect, useState } from "react";
import { View } from "react-native";
import InfoBookCard from "../../shared/components/InfoBookCard";
import { getISBNResult } from "../../utils/services";
import { ActivityIndicator } from "react-native-paper";

function ISBNResult({ route, navigation }) {
  const [data, setData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isbn, type } = route.params;

  useEffect(() => {
    setIsLoaded(false);
    console.log("isbn result");
    getISBNResult(isbn, type)
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      });
  }, []);
  return (
    <View className="flex-1">
      {isLoaded ? (
        <InfoBookCard bookData={data.bookData} />
      ) : (
        <View className="flex-1 align-middle ">
          <ActivityIndicator animating={true} className="flex-1 align-middle" />
        </View>
      )}
    </View>
  );
}

export default ISBNResult;
