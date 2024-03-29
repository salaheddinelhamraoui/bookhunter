import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const OfferCard = ({ bg, books, scoreState, index, shipping, profitFBA, salesRank, ave, slaveEdit, price, masterVendors, saveSlaveEdit, isbn, selectionType, deleteBook }) => {

    const navigation = useNavigation();

    return (
        <View className={`flex flex-row px-4  bg-white ${bg}`}>
            <Text
                style={{
                    fontSize: SIZES.small,
                }}
                className="w-32 text-center py-2"
            >{books[0].book.title}
                {"\n"}
                <Text className=" text-center pt-1"
                    style={{
                        fontSize: SIZES.base,
                    }}
                >

                    {books[0].book.isbn13}
                </Text>
            </Text>

            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32 py-2"
            >{scoreState[index]}</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32 py-2"
            >{isNaN(profitFBA[index])
                ? 0
                : parseFloat(
                    profitFBA[index] + shipping[index]
                ).toFixed(2)}</Text>

            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32 py-2"
            >{salesRank[index]}</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32 py-2"
            >{ave[index]}</Text>

            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-16 py-2"
            >1</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className={`text-center w-32 ${selectionType === 'amazon' ? 'bg-red-300' : ''} py-2`}
            >{isNaN(price[index])
                ? 0
                : parseFloat(
                    price[index] + shipping[index]
                ).toFixed(2)}</Text>
            {masterVendors && <View className="ml-4 flex flex-row ">
                <View className={`w-40 flex flex-col ${selectionType === 'vendors' ? 'bg-red-300' : ''} py-2 px-2`}>
                    <View className="flex flex-row items-center  justify-center">
                        <Image
                            source={{ uri: 'https://www.bookhunter.com' + masterVendors[0].vendorLogo }}
                            resizeMode="contain"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <Text
                        >
                            {masterVendors[0].vendorName}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: SIZES.font,
                        }}
                        className="text-center"
                    >
                        {masterVendors[0].price}
                    </Text>
                </View>
                <View className="w-40 flex flex-col py-2 px-2">
                    <View className="flex flex-row items-center justify-center">
                        <Image
                            source={{ uri: 'https://www.bookhunter.com' + masterVendors[1].vendorLogo }}
                            resizeMode="contain"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <Text
                        >
                            {masterVendors[1].vendorName}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: SIZES.font,
                        }}
                        className="text-center"
                    >
                        {masterVendors[1].price}
                    </Text>
                </View>
                <View className="w-40 flex flex-col py-2 px-2">
                    <View className="flex flex-row items-center justify-center">
                        <Image
                            source={{ uri: 'https://www.bookhunter.com' + masterVendors[2].vendorLogo }}
                            resizeMode="contain"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <Text
                        >
                            {masterVendors[2].vendorName}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: SIZES.font,
                        }}
                        className="text-center"
                    >
                        {masterVendors[2].price}
                    </Text>
                </View>
                <TouchableOpacity className="w-[160px] py-2" onPress={() => {
                    navigation.navigate("ISBN RESULT", {
                        isbn: isbn,
                        type: "sell",
                    })
                }}>
                    <View className="bg-[#6fbfbf]  rounded-lg py-2 ">
                        <Text
                            className="text-center"
                            style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                                color: "white",
                            }}
                        >
                            See more vendors
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="ml-4 flex mt-4 items-center" onPress={() => {
                    deleteBook(isbn);
                }}>
                    <Image
                        source={assets.delete2}
                        resizeMode="contain"
                        className="w-[20px] h-[20px]"
                    />
                </TouchableOpacity>
            </View>}
        </View >
    )
}

export default OfferCard