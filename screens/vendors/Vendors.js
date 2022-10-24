import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";

const DATA = [
    {
        id: 1,
        name: "Alibris",
        image: assets.alibris,
    },
    {
        id: 2,
        name: "Amazon",
        image: assets.Amazon,
    }
    ,
    {
        id: 3,
        name: "Better World Books",
        image: assets.BetterWorldBooks,
    }
    ,
    {
        id: 4,
        name: "Bigger Books",
        image: assets.BiggerBooks,
    }
    ,
    {
        id: 5,
        name: "Books A Million",
        image: assets.BooksAMillion,
    }
    ,
    {
        id: 6,
        name: "Booksrun",
        image: assets.Booksrun,
    }
    ,
    {
        id: 7,
        name: "Book To Cash",
        image: assets.BookToCash,
    }
    ,
    {
        id: 8,
        name: "Ebay",
        image: assets.Ebay,
    }
    ,
    {
        id: 9,
        name: "eCampus",
        image: assets.eCampus,
    }
    ,
    {
        id: 10,
        name: "eBooks",
        image: assets.eBooks,
    }
    ,
    {
        id: 11,
        name: "Empire Text",
        image: assets.EmpireText,
    }
    ,
    {
        id: 12,
        name: "Knet Books",
        image: assets.Knetbooks,
    }
    ,
    {
        id: 13,
        name: "Sell Back Books",
        image: assets.sellbackbooks,
    }
    ,
    {
        id: 14,
        name: "Text Book Maniac",
        image: assets.TextbookManiac,
    }
    ,
    {
        id: 15,
        name: "Valore Books",
        image: assets.Valorebooks,
    }
    ,
    {
        id: 16,
        name: "Vital Source",
        image: assets.VitalSource,
    }
    ,
    {
        id: 17,
        name: "Winya Books",
        image: assets.WinyaBooks,
    }
    ,
    {
        id: 18,
        name: "Ziffit",
        image: assets.ziffit,
    }
];

const Vendors = () => {
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
                        Vendors
                    </Text>
                </View>
                <View className="mx-4 mb-2 rounded-lg">
                    <View className="flex flex-row flex-wrap items-center justify-between">
                        {DATA.map((item) => (
                            <View key={item.id} className="w-[48%] flex flex-col items-center justify-center mt-6 bg-white rounded-lg px-4 py-4">
                                <Image
                                    source={item.image}
                                    resizeMode="contain"
                                    className="w-[80px] h-[60px] "
                                />
                                <Text className="mt-2" style={{
                                    fontFamily: FONTS.textBold,
                                    fontSize: SIZES.medium,
                                }}>
                                    {item.name}
                                </Text>
                            </View>
                        ))}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Vendors