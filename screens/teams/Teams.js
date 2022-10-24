import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Teams = () => {
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
                        Teams
                    </Text>
                </View>
                <View className="mx-4 mb-2 rounded-lg">
                    <View className="flex flex-row flex-wrap items-center justify-between">
                        <View className="w-[48%] mt-6 bg-white rounded-lg px-4 py-4">
                            <TouchableOpacity className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
                                onPress={() => { navigation.navigate("AddMember") }}
                            >
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </TouchableOpacity>
                            <Text className="text-center" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                            }}>User Name</Text>
                            <Text className="text-center mt-3 text-blue-500" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Hidden Mode</Text>
                            <Text className="text-center mt-3" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Database + Live</Text>
                        </View>
                        <View className="w-[48%] mt-6 bg-white rounded-lg px-4 py-4">
                            <TouchableOpacity className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
                                onPress={() => { navigation.navigate("AddMember") }}
                            >
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </TouchableOpacity>
                            <Text className="text-center" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                            }}>User Name</Text>
                            <Text className="text-center mt-3 text-blue-500" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Hidden Mode</Text>
                            <Text className="text-center mt-3" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Database + Live</Text>
                        </View>
                        <View className="w-[48%] mt-6 bg-white rounded-lg px-4 py-4">
                            <TouchableOpacity className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
                                onPress={() => { navigation.navigate("AddMember") }}
                            >
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </TouchableOpacity>
                            <Text className="text-center" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                            }}>User Name</Text>
                            <Text className="text-center mt-3 text-blue-500" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Hidden Mode</Text>
                            <Text className="text-center mt-3" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Database + Live</Text>
                        </View>
                        <View className="w-[48%] mt-6 bg-white rounded-lg px-4 py-4">
                            <TouchableOpacity className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
                                onPress={() => { navigation.navigate("AddMember") }}
                            >
                                <View className="mx-auto my-auto">
                                    <Image source={assets.edit} resizeMode="contain" className="w-[15px] h-[15px]" />
                                </View>
                            </TouchableOpacity>
                            <Text className="text-center" style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                            }}>User Name</Text>
                            <Text className="text-center mt-3 text-blue-500" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Hidden Mode</Text>
                            <Text className="text-center mt-3" style={{
                                fontFamily: FONTS.textRegular,
                            }}>Database + Live</Text>
                        </View>

                    </View>
                    <View className="flex items-center justify-center">
                        <TouchableOpacity className="w-[200px]"
                            onPress={() => { navigation.navigate("AddMember") }}
                        >
                            <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-3">
                                <Text
                                    className="text-center"
                                    style={{
                                        fontFamily: FONTS.JosefinSansBold,
                                        fontSize: SIZES.medium,
                                        color: "white"
                                    }}
                                >
                                    Add Member
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Teams