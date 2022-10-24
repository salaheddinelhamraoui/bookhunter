import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FONTS, SIZES, assets } from '../../constants';
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';


const data = [
    { label: 'Hidden Mode', value: 'hm' },
    { label: 'Full Mode', value: 'fm' },
];


const data_2 = [
    { label: 'Database', value: 'db' },
    { label: 'Database + Live', value: 'dbl' },
];


const AddMember = () => {


    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [value2, setValue2] = useState(null);
    const [isFocus2, setIsFocus2] = useState(false);


    return (
        <SafeAreaView>
            <ScrollView>
                <View className="mx-4 my-4 mb-0 bg-white px-4 py-4 rounded-lg" >
                    <Text
                        className="text-center"
                        style={{
                            fontFamily: FONTS.JosefinSansBold,
                            fontSize: SIZES.medium,
                        }}
                    >
                        Add New Team Member
                    </Text>
                </View>
                <View className="flex flex-col bg-white mx-4 my-4 rounded-lg px-4 py-4">
                    <View>
                        <Text className="mb-2" style={{
                            fontFamily: FONTS.textRegular,
                        }}>
                            First Name
                        </Text>
                        <TextInput
                            onChangeText={(text) => { }}
                            outlineColor={"#6fbfbf"}
                            activeOutlineColor={"#393e59"}
                            mode="outlined"
                            label="First Name"
                            placeholder="First Name"
                            className="border-[0.2px] rounded-lg px-2 py-2"
                        />
                    </View>


                    <View className="mt-4">
                        <Text className="mb-2" style={{
                            fontFamily: FONTS.textRegular,
                        }}>
                            Last Name
                        </Text>
                        <TextInput
                            onChangeText={(text) => { }}
                            outlineColor={"#6fbfbf"}
                            activeOutlineColor={"#393e59"}
                            mode="outlined"
                            label="Last Name"
                            placeholder="Last Name"
                            className="border-[0.2px] rounded-lg px-2 py-2"
                        />
                    </View>
                    <View className="mt-4">
                        <Text className="mb-2" style={{
                            fontFamily: FONTS.textRegular,
                        }}>
                            Username
                        </Text>
                        <TextInput
                            onChangeText={(text) => { }}
                            outlineColor={"#6fbfbf"}
                            activeOutlineColor={"#393e59"}
                            mode="outlined"
                            label="Username"
                            placeholder="Username"
                            className="border-[0.2px] rounded-lg px-2 py-2"
                        />
                    </View>
                    <View className="mt-4">
                        <Text className="mb-2" style={{
                            fontFamily: FONTS.textRegular,
                        }}>
                            Mode
                        </Text>
                        <Dropdown
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            className="border-[0.2px] rounded-lg px-2 py-2"
                        />
                    </View>
                    <View className="mt-4">
                        <Text className="mb-2" style={{
                            fontFamily: FONTS.textRegular,
                        }}>
                            Type
                        </Text>
                        <Dropdown
                            data={data_2}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus2 ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value2}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setValue2(item.value);
                                setIsFocus2(false);
                            }}
                            className="border-[0.2px] rounded-lg px-2 py-2"

                        />
                    </View>
                    <View className="flex items-center justify-center">
                        <TouchableOpacity className="w-[200px]">
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

export default AddMember