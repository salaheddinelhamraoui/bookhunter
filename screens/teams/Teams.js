import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FONTS, SIZES } from "../../constants";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getMembers } from "../../utils/Team.service";
import { useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import Member from "./Member";
import Loading from "../../components/Loading";

const Teams = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.userSlice.data);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFocused) return;
    setIsLoading(true);
    getMembers(user?.id)
      .then((res) => setTeamMembers(res))
      .catch(() => Toast.show("Error"))
      .finally(() => setIsLoading(false));
  }, [isFocused]);
  return (
    <>
      {isLoading ? <Loading /> : null}
      <ScrollView>
        <View className="mx-4 my-4 bg-white px-4 py-4 rounded-lg">
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
            {teamMembers?.length > 0
              ? teamMembers.map((member) => (
                  <Member member={member} key={member._id} />
                ))
              : null}
          </View>
          <View className="flex items-center justify-center">
            <TouchableOpacity
              className="w-[200px]"
              onPress={() => {
                navigation.navigate("AddMember");
              }}
            >
              <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-3">
                <Text
                  className="text-center"
                  style={{
                    fontFamily: FONTS.JosefinSansBold,
                    fontSize: SIZES.medium,
                    color: "white",
                  }}
                >
                  Add Member
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Teams;
