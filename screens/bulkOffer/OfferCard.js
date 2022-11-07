import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";

const OfferCard = ({ bg }) => {
    return (
        <View className={`flex flex-row px-4 py-2 bg-white ${bg}`}>
            <Text
                style={{
                    fontSize: SIZES.small,
                }}
                className="w-24 text-center"
            >Reading Keys
                {"\n"}
                <Text className=" text-center pt-1"
                    style={{
                        fontSize: SIZES.base,
                    }}
                >

                    1234567891011
                </Text>
            </Text>

            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-24"
            >53</Text>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-24"
            >45K</Text>
            <TextInput
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-24"
            >$0.00</TextInput>
            <Text
                style={{
                    fontSize: SIZES.medium,
                }}
                className="text-center w-24"
            >$14.56</Text>
            <View className="ml-4 flex flex-row">
                <View className="w-24 flex flex-col">
                    <View className="flex flex-row items-center">
                        <Image
                            source={assets.Amazon}
                            resizeMode="contain"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <Text
                        >
                            $14.56
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: SIZES.base,
                        }}
                        className="text-center"
                    >
                        Max Qty: 3
                    </Text>
                </View>
                <View className="w-24 flex flex-col">
                    <View className="flex flex-row items-center">
                        <Image
                            source={assets.BookToCash}
                            resizeMode="contain"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <Text
                        >
                            $14.56
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: SIZES.base,
                        }}
                        className="text-center"
                    >
                        Max Qty: 3
                    </Text>
                </View>
                <View className="w-24 flex flex-col">
                    <View className="flex flex-row items-center">
                        <Image
                            source={assets.eCampus}
                            resizeMode="contain"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <Text
                        >
                            $14.56
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: SIZES.base,
                        }}
                        className="text-center"
                    >
                        Max Qty: 3
                    </Text>
                </View>
                <TouchableOpacity className="w-[80px]" onPress={() => { }}>
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
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OfferCard