import { View, Text, ScrollView, TextInput, Image } from 'react-native'
import { FONTS, SIZES, assets } from "../../constants";
import OfferCard from './OfferCard';

const BulkOffer = () => {
    return (
        <>
            <ScrollView>
                <View className="mx-4 mt-4 bg-white px-4 py-4 rounded-lg">
                    <Text
                        className="text-center"
                        style={{
                            fontFamily: FONTS.JosefinSansBold,
                            fontSize: SIZES.extraMedium,
                        }}
                    >
                        Bulk Offer
                    </Text>
                </View>
                <ScrollView horizontal={true} className="mr-4">
                    <View className="mx-4 my-4 bg-white  pt-4 rounded-lg ">
                        <View className="flex flex-row mb-4 px-4">
                            <Text
                                style={{
                                    fontFamily: FONTS.JosefinSansBold,
                                }}
                                className="text-center w-24"
                            >Name</Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.JosefinSansBold,
                                }}
                                className="text-center w-24"
                            >Tracker</Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.JosefinSansBold,
                                }}
                                className="text-center w-24"
                            >Sales Rank</Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.JosefinSansBold,
                                }}
                                className="text-center w-24"
                            >Cost $0.00</Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.JosefinSansBold,
                                }}
                                className="text-center w-24"
                            >Profit (FBA)</Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.JosefinSansBold,
                                }}
                                className="text-center ml-4"
                            >Profit Vendors</Text>

                        </View>
                        <OfferCard bg="bg-gray-200" />
                        <OfferCard bg="bg-gray-100" />
                        <OfferCard bg="bg-gray-200" />
                        <OfferCard bg="bg-gray-100" />
                        <OfferCard bg="bg-gray-200" />
                        <OfferCard bg="bg-gray-100" />
                        <OfferCard bg="bg-gray-200" />
                        <OfferCard bg="bg-gray-100" />
                        <OfferCard bg="bg-gray-200" />
                        <OfferCard bg="bg-gray-100" />
                        <OfferCard bg="bg-gray-200" />
                        <OfferCard bg="bg-gray-100" />

                    </View>
                </ScrollView>
            </ScrollView>
        </>
    )
}

export default BulkOffer