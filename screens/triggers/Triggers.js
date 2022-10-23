import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Triggers = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView>
                <View className="mx-4 my-4 bg-white px-4 py-4 rounded-lg" >
                    <Text
                        className="text-center"
                        style={{
                            fontFamily: FONTS.JosefinSansBold,
                            fontSize: SIZES.extraMedium,
                        }}
                    >
                        Triggers
                    </Text>
                </View>
                <View className="mx-4 bg-white px-4 py-4 mb-2 rounded-lg">
                    <Text
                        className="text-center px-1"
                        style={{
                            fontFamily: FONTS.textRegular,
                            fontSize: SIZES.font,
                        }}
                    >
                        Triggers help with calculating what is profitable. Use our default buying criteria or create your own.
                    </Text>
                </View>
                <View className="flex flex-row flex-wrap mx-4 my-2 mt-4 items-center justify-between">
                    <View className="bg-white rounded-2xl w-[48%] mb-6">
                        <View className="px-4 py-4 mb-4">
                            <TouchableOpacity className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
                                onPress={() => navigation.navigate("EditTrigger")}
                            >
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </TouchableOpacity>

                            <Text className="border-b-[0.2px] border-gray-500 pb-2 mb-2 text-center w-full " style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                                lineHeight: 20,
                            }}>BookHunter Default</Text>
                            <View className="w-full flex flex-row ">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Fulfilment :</Text>
                                </View>
                                <View className="w-[30%] mb-1">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>FBA</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Buy Cost :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>2</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%]">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Cost Per lb :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>0.25</Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-green-500 rounded-b-2xl">
                            <Text className="py-2 text-center text-white" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.extraMedium,
                            }}>
                                Active
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl w-[48%] mb-6">
                        <View className="px-4 py-4 mb-4">
                            <View className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200">
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </View>
                            <Text className="border-b-[0.2px] border-gray-500 pb-2 mb-2 text-center w-full" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                                lineHeight: 20,
                            }}>BookHunter Default</Text>
                            <View className="w-full flex flex-row ">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Fulfilment :</Text>
                                </View>
                                <View className="w-[30%] mb-1">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>FBA</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Buy Cost :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>0</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%]">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Cost Per lb :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>0</Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-gray-400 rounded-b-2xl">
                            <Text className="py-2 text-center text-white" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.extraMedium,
                            }}>
                                Inactive
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl w-[48%] mb-6">
                        <View className="px-4 py-4 mb-4">
                            <View className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200">
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </View>

                            <Text className="border-b-[0.2px] border-gray-500 pb-2 mb-2 text-center w-full " style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                                lineHeight: 20,
                            }}>BookHunter Default</Text>
                            <View className="w-full flex flex-row ">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Fulfilment :</Text>
                                </View>
                                <View className="w-[30%] mb-1">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>FBA</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Buy Cost :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>2</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%]">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Cost Per lb :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>0.25</Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-gray-400 rounded-b-2xl">
                            <Text className="py-2 text-center text-white" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.extraMedium,
                            }}>
                                Inactive
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl w-[48%] mb-6">
                        <View className="px-4 py-4 mb-4">
                            <View className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200">
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </View>

                            <Text className="border-b-[0.2px] border-gray-500 pb-2 mb-2 text-center w-full " style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                                lineHeight: 20,
                            }}>BookHunter Default</Text>
                            <View className="w-full flex flex-row ">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Fulfilment :</Text>
                                </View>
                                <View className="w-[30%] mb-1">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>FBA</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%] mb-1">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Buy Cost :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>2</Text>
                                </View>
                            </View>
                            <View className="w-full flex flex-row">
                                <View className="w-[70%]">
                                    <Text style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.font,
                                    }}>Cost Per lb :</Text>
                                </View>
                                <View className="w-[30%]">
                                    <Text className="ml-auto" style={{
                                        fontFamily: FONTS.textRegular,
                                        fontSize: SIZES.font,
                                    }}>0.25</Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-gray-400 rounded-b-2xl">
                            <Text className="py-2 text-center text-white" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.extraMedium,
                            }}>
                                Inactive
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Triggers