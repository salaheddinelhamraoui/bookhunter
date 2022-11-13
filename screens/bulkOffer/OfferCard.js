import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";

const OfferCard = ({ bg, books, scoreState, index, shipping, profitFBA, salesRank, ave, slaveEdit, price, masterVendors, saveSlaveEdit }) => {

    console.log('----------------------------------------');
    console.log("masterVendors", masterVendors);

    return (
        <View className={`flex flex-row px-4 py-2 bg-white ${bg}`}>
            <Text
                style={{
                    fontSize: SIZES.small,
                }}
                className="w-32 text-center"
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
                className="text-center w-32"
            >{scoreState[index]}</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32"
            >{isNaN(profitFBA[index])
                ? 0
                : parseFloat(
                    profitFBA[index] + shipping[index]
                ).toFixed(2)}</Text>

            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32"
            >{salesRank[index]}</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32"
            >{ave[index]}</Text>

            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-16"
            >1</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-32"
            >{isNaN(price[index])
                ? 0
                : parseFloat(
                    price[index] + shipping[index]
                ).toFixed(2)}</Text>
            {masterVendors && <View className="ml-4 flex flex-row">
                <View className="w-32 flex flex-col">
                    <View className="flex flex-row items-center">
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
                <View className="w-36 flex flex-col">
                    <View className="flex flex-row items-center">
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
                <View className="w-36 flex flex-col">
                    <View className="flex flex-row items-center">
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
                <TouchableOpacity className="w-[160px]" onPress={() => { }}>
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
            </View>}
        </View >
    )
}

export default OfferCard