import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { FONTS, SIZES, assets } from "../../constants";

const OfferCard = ({ index, data, salesRank, huntScore }) => {
  const { bookData, MasterVendors, Vendors, profitFBA } = data;

  return (
    <View
      className={`flex flex-row px-4 py-2 bg-white ${
        index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      <View>
        <Text
          style={{
            fontSize: SIZES.small,
          }}
          className="w-24 text-center"
        >
          {bookData[0]?.book?.title}
        </Text>
        <Text
          className=" text-center pt-1"
          style={{
            fontSize: SIZES.base,
          }}
        >
          {bookData[0]?.book?.isbn13}
        </Text>
      </View>

      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        {huntScore}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        {salesRank}
      </Text>
      <TextInput
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24"
      >
        $0.00
      </TextInput>
      <Text
        style={{
          fontSize: SIZES.medium,
        }}
        className="text-center w-24 self-center"
      >
        ${profitFBA}
      </Text>
      <View className="ml-4 flex flex-row items-center">
        {Vendors?.length
          ? Vendors.map((vendor) => (
              <>
                {vendor?.price !== "0" && vendor?.price !== "$0" ? (
                  <View
                    className="w-24 flex flex-col"
                    key={vendor.vendorName + vendor.price}
                  >
                    <View className="flex flex-row items-center">
                      <Image
                        source={{
                          uri: "https://bookhunter.com" + vendor?.vendorLogo,
                        }}
                        resizeMode="contain"
                        className="w-[20px] h-[20px] mr-2"
                      />
                      <Text>{vendor?.price}</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: SIZES.base,
                      }}
                      className="text-center"
                    >
                      Max Qty: {vendor?.quantity}
                    </Text>
                  </View>
                ) : null}
              </>
            ))
          : null}

        {/* <TouchableOpacity className="w-[80px]" onPress={() => {}}>
          <View className="bg-[#6fbfbf]  rounded-lg py-2 ">
            <Text
              className="text-center"
              style={{
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
                color: "white",
              }}
            >
              Sell
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default OfferCard;
