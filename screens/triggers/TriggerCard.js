import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FONTS, SIZES, assets } from '../../constants';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";

const data = [
    { label: 'Skip', value: 'skip' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
];

const data2 = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: 'Highest', value: 'highest' },

];

const data3 = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
];

const data4 = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
];



const TriggerCard = () => {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [value2, setValue2] = useState(null);
    const [isFocus2, setIsFocus2] = useState(false);

    const [value3, setValue3] = useState(null);
    const [isFocus3, setIsFocus3] = useState(false);

    const [value4, setValue4] = useState(null);
    const [isFocus4, setIsFocus4] = useState(false);


    return (
        <View className="flex flex-col bg-white mx-4 my-4 rounded-lg px-4 py-4">
            <TouchableOpacity className="absolute top-[-10] right-[-10] bg-red-500 w-[25px] h-[25px] rounded-full">
                <Image source={assets.close} style={{ width: 10, height: 10 }} className="m-auto" />
            </TouchableOpacity>
            <View className="flex flex-row items-center">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Trigger
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    editable={false}
                    selectTextOnFocus={false}
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Min Huntscore
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Max Huntscore
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Min Rank
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Max Rank
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Fba Slot
                </Text>
                <Dropdown
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? '' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Used Slot
                </Text>
                <Dropdown
                    data={data2}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? '' : '...'}
                    searchPlaceholder="Search..."
                    value={value2}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                        setValue2(item.value);
                        setIsFocus2(false);
                    }}
                    className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Bb Compare
                </Text>
                <Dropdown
                    data={data3}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus3 ? '' : '...'}
                    searchPlaceholder="Search..."
                    value={value3}
                    onFocus={() => setIsFocus3(true)}
                    onBlur={() => setIsFocus3(false)}
                    onChange={item => {
                        setValue3(item.value);
                        setIsFocus3(false);
                    }}
                    className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    % Off Amazon
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Target Profit
                </Text>
                <TextInput
                    onChangeText={(text) => { }}
                    outlineColor={"#6fbfbf"}
                    activeOutlineColor={"#393e59"}
                    mode="outlined"
                    label="TRIGGER"
                    placeholder="TRIGGER"
                    value='1'
                    className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
                />
            </View>
            <View className="flex flex-row items-center mt-2">
                <Text className="w-[70%]" style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.extraMedium,
                }}>
                    Always Reject
                </Text>
                <Dropdown
                    data={data4}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus4 ? '' : '...'}
                    searchPlaceholder="Search..."
                    value={value4}
                    onFocus={() => setIsFocus4(true)}
                    onBlur={() => setIsFocus4(false)}
                    onChange={item => {
                        setValue4(item.value);
                        setIsFocus4(false);
                    }}
                    className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
                />
            </View>
            <View className="flex items-center justify-center">
                <TouchableOpacity className="w-[250px]">
                    <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-2">
                        <Text
                            className="text-center"
                            style={{
                                fontFamily: FONTS.JosefinSansBold,
                                fontSize: SIZES.medium,
                                color: "white"
                            }}
                        >
                            Save
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TriggerCard