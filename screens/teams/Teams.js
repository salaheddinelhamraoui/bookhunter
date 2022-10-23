import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";

const Teams = () => {
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default Teams