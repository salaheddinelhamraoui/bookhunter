import React from "react";
import { Pressable, Text, View } from "react-native";

function ProfitFBATable({
  finalProfit,
  triggers,
  handleClick,
  yindex,
  selectedItemId,
}) {
  return (
    <View>
      <View className="py-4 bg-lightTeal flex items-center">
        <Text>Profit (FBA)</Text>
        <Text>${finalProfit}</Text>
      </View>
      <View className="flex-row pt-2 bg-white ">
        <View className="flex-grow items-center border-r-2 border-black">
          <Text>0</Text>
          <Text>Used</Text>
          <View className=" w-full flex-row py-4">
            <View className="flex-grow items-center">
              <Text>All</Text>
              {triggers.map((item, index) => (
                <>
                  {/* selectedItemId */}
                  {item?.usedprice ? (
                    <Pressable
                      key={index + yindex}
                      className={`my-2 p-2 ${
                        `${index}${yindex}` === selectedItemId
                          ? "bg-darkTeal"
                          : ""
                      } rounded-md`}
                      onPress={() =>
                        handleClick(
                          !isNaN(parseFloat(item.usedprice).toFixed(2)) &&
                            parseFloat(item.usedprice).toFixed(2) +
                              " " +
                              item.usedPriceCondition,
                          `${index}${yindex}`
                        )
                      }
                      id={`${index}${yindex}`}
                    >
                      <Text>
                        {!isNaN(parseFloat(item.usedprice).toFixed(2)) &&
                          parseFloat(item.usedprice).toFixed(2) +
                            " " +
                            item.usedPriceCondition}
                      </Text>
                    </Pressable>
                  ) : null}
                </>
              ))}
            </View>
            <View className="flex-grow items-center">
              <Text>FBA</Text>
              {triggers.map((item, index) =>
                item?.usedfba ? (
                  <Pressable
                    key={index + yindex + 1}
                    className={`my-2 p-2 ${
                      `${index}${yindex + 1}` === selectedItemId
                        ? "bg-darkTeal"
                        : ""
                    } rounded-md`}
                    onPress={() =>
                      handleClick(
                        !isNaN(parseFloat(item.usedfba).toFixed(2)) &&
                          parseFloat(item.usedfba).toFixed(2) +
                            " " +
                            item.usedPriceCondition,
                        `${index}${yindex + 1}`
                      )
                    }
                    id={`${index}${yindex + 1}`}
                  >
                    <Text>
                      {!isNaN(parseFloat(item.usedfba).toFixed(2)) &&
                        parseFloat(item.usedfba).toFixed(2) +
                          " " +
                          item.usedPriceCondition}
                    </Text>
                  </Pressable>
                ) : null
              )}
            </View>
          </View>
        </View>
        {(yindex) => {
          return yindex++;
        }}
        <View className="flex-grow items-center  ">
          <Text>0</Text>
          <Text>New</Text>
          <View className=" w-full flex-row py-4">
            <View className="flex-grow items-center">
              <Text>All</Text>
              {triggers.map((item, index) => (
                <>
                  {item?.newprice ? (
                    <Pressable
                      key={index + yindex + 2}
                      className={`my-2 p-2 ${
                        `${index}${yindex + 2}` === selectedItemId
                          ? "bg-darkTeal"
                          : ""
                      } rounded-md`}
                      onPress={() =>
                        handleClick(
                          !isNaN(parseFloat(item.newprice).toFixed(2)) &&
                            parseFloat(item.newprice).toFixed(2),
                          `${index}${yindex + 2}`
                        )
                      }
                      id={`${index}${yindex + 2}`}
                    >
                      <Text>
                        {!isNaN(parseFloat(item.newprice).toFixed(2)) &&
                          parseFloat(item.newprice).toFixed(2)}
                      </Text>
                    </Pressable>
                  ) : null}
                </>
              ))}
            </View>
            <View className="flex-grow items-center">
              <Text>FBA</Text>
              {triggers.map((item, index) => (
                <>
                  {item?.newfba ? (
                    <Pressable
                      key={index + yindex + 3}
                      className={`my-2 p-2 ${
                        `${index}${yindex + 3}` === selectedItemId
                          ? "bg-darkTeal"
                          : ""
                      } rounded-md`}
                      onPress={(e) =>
                        handleClick(
                          (!isNaN(parseFloat(item.newfba).toFixed(2)) &&
                            parseFloat(item.newfba).toFixed(2)) ||
                            "",
                          `${index}${yindex + 3}`
                        )
                      }
                      id={`${index}${yindex + 3}`}
                    >
                      <Text>
                        {(!isNaN(parseFloat(item.newfba).toFixed(2)) &&
                          parseFloat(item.newfba).toFixed(2)) ||
                          ""}
                      </Text>
                    </Pressable>
                  ) : null}
                </>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProfitFBATable;
