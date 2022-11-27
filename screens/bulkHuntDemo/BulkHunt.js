import { useCallback, useEffect, useId, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";
import { FONTS, SIZES } from "../../constants";
import {
  searchLimit,
  bulkHunt,
  getRestrictedById,
  TriggersSearchResult,
} from "../../utils/Bulk.service";
import { convISBN13toISBN10 } from "../../utils/services";
import {
  getTriggers,
  getTriggersSet,
  triggersResult,
} from "../../utils/Triggers.service";
import OfferCard from "./OfferCard";
import Loading from "../../components/Loading";
import "intl";
import "intl/locale-data/jsonp/en";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof Intl.__disableRegExpRestore === "function") {
    Intl.__disableRegExpRestore();
  }
}

const BulkHunt = ({ route }) => {
  const state = useSelector((state) => state.userSlice.data);
  let isbn = route?.params?.isbn;
  const [data, setData] = useState([]);
  const [Vendors, setVendors] = useState([]);
  const [input, setInput] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [masterEdit, setMasterEdit] = useState();
  const [slaveEdit, setSlaveEdit] = useState([]);
  const [salesRank, setSalesRank] = useState([]);
  const [filteredDate, setFiltredDate] = useState([]);
  const [profitFBA, setProfitFBA] = useState([]);
  const [masterVendors, setMasterVendors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoSearch, setAutoSearch] = useState(false);
  const REFERRAL_FEE = 0.15;
  const CLOSSING_FEE = 1.8;
  const [ave, setAve] = useState([]);
  const [master, setMaster] = useState([]);
  const [bookStatus, setBookStatus] = useState([]);
  const [voted, setVoted] = useState([]);
  ////////////////////////////////
  const [triggers, setTriggers] = useState([]);
  const AMAZON_SELLER_FEE = 0.99;
  const [minUsedFbaPrice, setMinUsedFbaPrice] = useState(0);
  const [BBCompare, setBBCompare] = useState();
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedValueIndex1, setSelectedValueIndex1] = useState(null);
  const [selectedValueIndex2, setSelectedValueIndex2] = useState(null);
  const [selectedFBA, setSelectedFBA] = useState(null);
  const [selectedMF, setSelectedMF] = useState(null);
  const [fulfillement, setFulfillement] = useState("FBA");
  const [targetProfit, setTargetProfit] = useState(null);
  const [triggerSet, setTriggerSet] = useState([]);
  const [finalProfit, setFinalProfit] = useState([]);
  const [amazonPercentage, setAmazonPercentage] = useState(0);
  const [autoReject, setAutoReject] = useState(false);
  const [weight, setWeight] = useState([]);
  const [fba, setFba] = useState([]);
  const [EditedBuyCost, setEditedBuyCost] = useState(0);
  const [amazonPrice, setAmazonPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  /////////////////////////////////////////////////////////
  const [showClearAll, setShowClearAll] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [restrictedIndex, setRestrictedIndex] = useState();
  const [open, setOpen] = useState(false);
  const [dataRestricted, setDataRestricted] = useState();

  const navigation = useNavigation();

  let vendorsObject = {};

  const notify = () =>
    toast.success("Added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const limitMessage = (message) =>
    toast.warn(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const user_Id = state?.id;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isbn) {
      setInputList(isbn.split(","));
      setAutoSearch(true);
      if (!isbn) return;
      submit();
    }
  }, [isbn, isFocused]);

  function getBookStatus(isbn, index) {
    let statusList = [...bookStatus];
    let voteList = [...voted];
    const user_Id = state?.id;
    getRestrictedById(isbn).then((result) => {
      try {
        statusList[index] = result.data.status;
        voteList[index] = result.data.usersId.includes(user_Id);
      } catch (e) {}
    });
    setBookStatus(statusList);
    setVoted(voteList);
  }

  /******  Convert ISBN's  ******/
  function convISBN13toISBN10(str) {
    var s;
    var c;
    var checkDigit = 0;
    var result = "";

    s = str.substring(3, str.length);
    for (let i = 10; i > 1; i--) {
      c = s.charAt(10 - i);
      checkDigit += (c - 0) * i;
      result += c;
    }
    checkDigit = (11 - (checkDigit % 11)) % 11;
    result += checkDigit == 10 ? "X" : checkDigit + "";

    return result;
  }
  /******** End of Conversion *********/
  function addRestrictedBook(isbn, index) {
    const user_Id = state?.id;
    restricted.addRestricted(isbn, user_Id);
    let voteList = [...voted];
    voteList[index] = true;
    setVoted(voteList);
  }

  useEffect(() => {
    if (autoSearch) {
      submit();
    }
  }, [autoSearch]);

  async function submit() {
    searchLimit(user_Id, "bulkHuntLimit", inputList.length, "").then(
      async (result) => {
        if (result.data.status) {
          setLoading(true);
          setIsLoading(true);
          for (let i = 0; i < inputList.length; i++) {
            getBookStatus(inputList[i], i);
            let ISBN;
            if (inputList[i]?.startsWith("290")) {
              inputList[i] = convISBN13toISBN10(inputList[i]);
            }
            if (inputList[i].length == 10) {
              let isbnTemp = inputList[i].slice(0, -1);
              let calcTemp = 0;
              let prefix = "978";
              isbnTemp = prefix.concat(isbnTemp);
              for (let i = 0; i < isbnTemp.length; i++) {
                if (i % 2 == 0) {
                  if (isbnTemp[i] == "X") {
                    calcTemp += 10 * 1;
                  } else {
                    calcTemp += +isbnTemp[i] * 1;
                  }
                } else {
                  if (isbnTemp[i] == "X") {
                    calcTemp += 10 * 3;
                  } else {
                    calcTemp += +isbnTemp[i] * 3;
                  }
                }
              }
              let moduloCalc = calcTemp % 10;
              if (moduloCalc != 0) {
                moduloCalc = 10 - moduloCalc;
              }
              let ISBN13 = isbnTemp.concat(moduloCalc);
              ISBN = ISBN13;
            } else {
              ISBN = inputList[i];
            }
            await bulkHunt(ISBN || inputList[i]).then((result) => {
              // if (i == inputList.length - 1) {
              //   recentlySearchedService.addRecentlySearched(
              //     result.data.bookData[0].book.isbn13,
              //     result.data.bookData[0].book.image,
              //     result.data.Vendors
              //   );
              // }
              setMaster((oldArray) => [...oldArray, result.data.MasterVendors]);
              setData((oldArray) => [...oldArray, result.data.bookData]);
              setVendors((oldArray) => [...oldArray, result.data.Vendors]);
              setProfitFBA((oldArray) => [...oldArray, result.data.profitFBA]);
              filterTrackerDate(result.data.tracker);
              setSalesRank((oldArray) => [
                ...oldArray,
                Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 2,
                }).format(result.data.salesRank),
              ]);
              setAve((oldArray) => [
                ...oldArray,
                Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 2,
                }).format(result.data.ave),
              ]);
            });
            TriggersSearchResult(ISBN).then((result) => {
              handleOffersList(result.data.usedObject, result.data.newObject);
              setWeight((oldArray) => [...oldArray, result.data.weight]);
              setFba((oldArray) => [...oldArray, result.data.fba]);
            });
            // setInputList([]);
          }
          setLoading(false);
          setIsLoading(false);
          setShowClearAll(true);
        } else {
          limitMessage(result.data.message);
        }
      }
    );
    setIsLoading(false);
  }

  useCallback((data) => {
    data.length && setInput(data.toString().replaceAll(",", " "));
    setInputList(data);
  }, []);

  useEffect(() => {
    //get data from triggers database
    const user_Id = state?.id;
    getTriggersSet(user_Id)
      .then((res) => res.data)
      .then(
        (result) => {
          result.map((trigger, index) => {
            //only leave the active trigger
            if (trigger.active == "true") {
              setFulfillement(trigger.fulfillement);
              getTriggers(trigger._id).then((res) => {
                if (res.data.length) {
                  setItems(res.data);
                  setTriggerSet(trigger);
                }
              });
            }
          });
        },
        (error) => {
          //setError(error);
        }
      );
  }, []);
  ///////////////////////

  useEffect(() => {
    if (selectedValue.length) {
      let tempArray = [];
      selectedValue.map((item, index) => {
        let temp = item * REFERRAL_FEE + CLOSSING_FEE;
        // calculate the fina profit calculation to be able to detect if its a reject or an accept
        if (fulfillement == "FBA") {
          if (EditedBuyCost) {
            tempArray.push(
              Math.round(
                (item -
                  temp -
                  fba[index] -
                  EditedBuyCost -
                  triggerSet.FBACostPerLBS * weight[index]) *
                  100
              ) / 100 || 0
            );
          } else {
            tempArray.push(
              Math.round(
                (item -
                  temp -
                  fba[index] -
                  triggerSet.buyCost -
                  triggerSet.FBACostPerLBS * weight[index]) *
                  100
              ) / 100 || 0
            );
          }
        } else {
          let MFCPP =
            +triggerSet.MFFixed + +Math.ceil(weight) * +triggerSet.MFCostPerLBS;
          let totalFees = item * REFERRAL_FEE + CLOSSING_FEE;
          if (EditedBuyCost) {
            tempArray.push(
              Math.round((item - totalFees - EditedBuyCost - MFCPP) * 100) /
                100 || 0
            );
          } else {
            tempArray.push(
              Math.round(
                (item - totalFees - triggerSet.buyCost - MFCPP) * 100
              ) / 100 || 0
            );
          }
        }
      });
      setFinalProfit(tempArray);
    }
  }, [selectedValue]);

  function filterTrackerDate(tracker) {
    if (tracker) {
      let dateTemp = [];
      let filterTemp = [];
      for (let i = 0; i < tracker.length; i++) {
        if (i % 2 != 0) {
          dateTemp.push(tracker[i]);
        } else {
          dateTemp.push(new Date((tracker[i] + 21564000) * 60000));
        }
      }
      let day = 0;
      for (let k = 0; k < dateTemp.length; k++) {
        if (k % 2 == 0) {
          let temp = Date.parse(dateTemp[k]);
          let temp2 = new Date(temp);
          if (temp2.getDay() != day) {
            filterTemp.push(dateTemp[k + 1]);
            day = temp2.getDay();
          }
        }
      }

      setFiltredDate((oldValue) => [...oldValue, filterTemp]);
    }
  }

  const [huntScore, setHuntScore] = useState([]);
  useEffect(() => {
    // select the most profitable price based on the active trigger parameters
    let score = [];
    filteredDate.map((item, index) => {
      score.push(trackerCalculation(index));
      setHuntScore(score);
      if (filteredDate.length && triggers.length) {
        items.map((item) => {
          if (score.length) {
            //select the correct line of the trigger
            if (
              score[index] >= item.minTracker &&
              score[index] <= item.maxTracker
            ) {
              //set the value of the target profit
              setTargetProfit(item.targetProfit);
              //set the amazon percentage
              setAmazonPercentage(item.offAmazon);
              //set BBCompare
              setBBCompare(item.BBCompare);
              //set auto reject
              setAutoReject(item.alwaysReject == "Yes" ? true : false);
              //set the value of the selected fba offer
              if (item.FBASlot != "Skip") {
                setSelectedFBA(triggers[item.FBASlot - 1].usedfba);
                setSelectedValueIndex1(item.FBASlot);
              }
              //set the value of the selected used offer
              if (item.usedSlot == "Highest") {
                setSelectedMF(triggers[triggers.length - 1].usedprice);
                setSelectedValueIndex2(triggers.length);
              } else if (+item.usedSlot == 10) {
                setSelectedMF(triggers[5].usedprice);
                setSelectedValueIndex2(6);
              } else {
                setSelectedMF(triggers[item.usedSlot - 1].usedprice);
                setSelectedValueIndex2(item.usedSlot);
              }
            }
          }
        });
      }
    });
    //remember to add the exception for when there is no tracker data available
    ///////////////////////////////////////////////////////////////////////////
  }, [triggers]);

  useEffect(() => {
    if (selectedFBA) {
      if (BBCompare == "Yes") {
        setSelectedValue((oldArray) => [
          ...oldArray,
          Math.max(selectedFBA, minUsedFbaPrice),
        ]);
      } else {
        setSelectedValue((oldArray) => [...oldArray, Math.max(selectedFBA)]);
      }
    } else if (selectedMF) {
      if (BBCompare == "Yes") {
        setSelectedValue((oldArray) => [
          ...oldArray,
          Math.max(selectedMF, minUsedFbaPrice),
        ]);
      } else {
        setSelectedValue((oldArray) => [...oldArray, Math.max(selectedMF)]);
      }
    } else if (amazonPrice != null && amazonPrice != 0) {
      if (BBCompare == "Yes") {
        setSelectedValue((oldArray) => [
          ...oldArray,
          Math.max(
            minUsedFbaPrice,
            amazonPrice - (amazonPrice * amazonPercentage) / 100
          ),
        ]);
      } else {
        setSelectedValue((oldArray) => [
          ...oldArray,
          amazonPrice - (amazonPrice * amazonPercentage) / 100,
        ]);
      }
    }
  }, [selectedFBA, selectedMF]);

  function handleOffersList(usedObject, newObject) {
    let usedPrice = [];
    let usedFBAPriceCondition = [];
    let usedPriceCondition = [];
    let NewFBAPriceCondition = [];
    let usedFba = [];
    let newPrice = [];
    let newFba = [];
    let maxUsedPrice;
    let condition = [];
    let usedShipping = [];
    let newShipping = [];
    //set up an object with all of the prices and conditions for the used books
    if (usedObject) {
      //get the max used price
      //maxUsedPrice = Math.max.apply(Math, usedObject.map(function(item) { return item.Price; }))
      for (let i = 0; i < usedObject.length; i++) {
        if (usedObject[i].isFBA) {
          //append used fba price
          usedFba.push(`${usedObject[i].Price + usedObject[i].shipping || 0}`);
          //append fba condition
          condition.push(`${usedObject[i].Condition || null}`);
          usedFBAPriceCondition.push(`${usedObject[i].Condition || null}`);
          // usedShipping.push(`${usedObject[i].usedShipping || null}`);

          //append used price
          if (i < 6) {
            usedPrice.push(
              `${usedObject[i].Price + usedObject[i].shipping || 0}`
            );
          }
          usedPriceCondition.push(`${usedObject[i].Condition || null}`);
          //append condition
          condition.push(`${usedObject[i].Condition || null}`);
          //usedShipping.push(`${usedObject[i].usedShipping || null}`);
        }
        //append used price
        usedPrice.push(`${usedObject[i].Price + usedObject[i].shipping || 0}`);
        usedPriceCondition.push(`${usedObject[i].Condition || null}`);
        //append condition
        condition.push(`${usedObject[i].Condition || null}`);
        //usedShipping.push(`${usedObject[i].usedShipping || null}`);
      }
      maxUsedPrice =
        Math.max(...usedPrice) == -Infinity ? 0 : Math.max(...usedPrice);
    }
    //set up an object with all of the prices and conditions for the new books
    if (newObject) {
      for (let i = 0; i < newObject.length; i++) {
        if (newObject[i].isFBA) {
          //append new price
          newFba.push(newObject[i].Price + newObject[i].shipping || 0);
          //NewFBAPriceCondition.push(newObject[i].Condition || null);
          //newShipping.push(`${usedObject[i].newShipping || null}`);
          if (i < 6) {
            newPrice.push(`${newObject[i].Price + newObject[i].shipping || 0}`);
          }
        }
        //append new fba price
        newPrice.push(newObject[i].Price + newObject[i].shipping || 0);
        //newPriceCondition.push(newObject[i].Condition || null);
        //newShipping.push(`${usedObject[i].newShipping || null}`);
      }
    }

    // we only need the first 7 values, but with some modifications
    //first we need the 10th value to be on the 5th index
    usedPrice[5] = usedPrice[10];
    usedPriceCondition[5] = usedPriceCondition[10];
    //second we need the maximum value to be on the 6th index
    let index = usedPrice.indexOf(`${maxUsedPrice}`);
    usedPrice[index] = usedPrice[6];
    usedPriceCondition[index] = usedPriceCondition[6];
    usedPrice[6] = `${maxUsedPrice}`;
    //finally we slice the array and only leave the 7 values we need then we sort it from lowest to highest
    usedPrice = usedPrice.slice(0, 7);
    usedPriceCondition = usedPriceCondition.slice(0, 7);
    usedPrice = usedPrice.sort((a, b) => a - b);
    usedPriceCondition = usedPriceCondition.sort((a, b) => a - b);
    usedFba = usedFba.slice(0, 5);
    usedFBAPriceCondition = usedFBAPriceCondition.slice(0, 5);
    usedFba = usedFba.sort((a, b) => a - b);
    usedFBAPriceCondition = usedFBAPriceCondition.sort((a, b) => a - b);
    newPrice = newPrice.slice(0, 7);
    //newPriceCondition = newPriceCondition.slice(0, 7);
    newPrice = newPrice.sort((a, b) => a - b);
    //newPriceCondition = newPriceCondition.sort((a, b) => a - b);
    newFba = newFba.slice(0, 7);
    NewFBAPriceCondition = NewFBAPriceCondition.slice(0, 7);
    newFba = newFba.sort((a, b) => a - b);
    NewFBAPriceCondition = NewFBAPriceCondition.sort((a, b) => a - b);
    setMinUsedFbaPrice(
      Math.min(...usedFba) == Infinity ? 0 : Math.min(...usedFba)
    );
    //we loop through the arrays and add them to an object with the required keys
    let tempTriggers = [];
    for (let i = 0; i < 7; i++) {
      let newElement = {
        usedprice: usedPrice[i] || null,
        usedfba: usedFba[i] || null,
        newprice: newPrice[i] || null,
        newfba: newFba[i] || null,
        usedPriceCondition: usedPriceCondition[i] || "",
        usedFBAPriceCondition: usedPriceCondition[i] || "",
        NewFBAPriceCondition: usedPriceCondition[i] || "",
        //newPriceCondition: usedPriceCondition[i] || null,
        usedShipping: usedShipping[i] || 0,
        newShipping: newShipping[i] || 0,
      };
      tempTriggers.push(newElement);
    }
    tempTriggers.length && setTriggers(tempTriggers);
  }

  useEffect(() => {
    let temp = [...Vendors];
    temp.length &&
      temp.map((item) =>
        item.sort((a, b) =>
          +a.price.replace("$", "") < +b.price.replace("$", "")
            ? 1
            : +b.price.replace("$", "") < +a.price.replace("$", "")
            ? -1
            : 0
        )
      );
  }, [Vendors]);

  function trackerCalculation(value) {
    try {
      let result = 0;
      for (let i = 0; i < filteredDate[value]?.length - 1; i++) {
        if ((filteredDate[value][i + 1] * 100) / filteredDate[value][i] <= 90) {
          result += 1;
        }
      }
      return result;
    } catch (e) {
      console.log("error", e);
    }
  }

  function VendorQuantity(vendorName, quantity) {
    switch (vendorName) {
      case "WinyaBooks":
        return 5;
      // case "Bookbyte":
      //   return 3;
      case "Empire Text":
        return 2;
      case "BookToCash":
        return 1;
      case "Textbook Maniac":
        return 10;
      case "eCampus":
        return 5;
      case "sellbackbooks":
        return 5;
      case "ValoreBooks":
        return quantity[0] || 0;
      default:
        return 1;
    }
  }

  const handleSearchButton = () => {
    submit();
  };
  const handleSearch = (text) => {
    const inputs = text.split(",");
    setInputList(inputs);
  };

  const clearAll = () => {
    setMasterVendors([]);
    setData([]);
    setProfitFBA([]);
    setInputList([]);
    setInput([]);
    setVendors([]);
    setLoaded(false);
    setSlaveEdit([]);
    setMasterEdit();
    setAve([]);
    setSelectedValue([]);
    setShowClearAll(false);
    setVoted([]);
    isbn = null;
  };

  const cancelLoading = () => {
    setIsLoading(false);
    isbn = null;
  };

  return (
    <>
      {isLoading ? <Loading cancelLoading={cancelLoading} /> : null}
      <ScrollView>
        <View className="mx-4 my-4 shadow-md bg-white px-4 py-4 rounded-lg">
          <Text
            className="text-center"
            style={{
              fontFamily: FONTS.JosefinSansBold,
              fontSize: SIZES.extraMedium,
            }}
          >
            Bulk Hunt
          </Text>
          <View className="flex-row items-center">
            <View className="flex-grow mr-4">
              <Searchbar
                placeholder="978..."
                onSubmitEditing={handleSearchButton}
                className="my-4 flex-grow"
                value={inputList.toString()}
                placeholderTextColor={"#999"}
                onChangeText={handleSearch}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  fontFamily: FONTS.JosefinSansRegular,
                }}
              />
            </View>

            <Pressable
              onPress={() => navigation.navigate("BULK HUNT SCANNER")}
              className="bg-greyBlue py-3 px-4 rounded-md"
            >
              <Text>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={20}
                  color="white"
                />
              </Text>
            </Pressable>
          </View>

          <TouchableOpacity onPress={handleSearchButton}>
            <View className=" bg-[#6fbfbf]  rounded-lg px-4 py-3">
              <Text
                className="text-center"
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.font,
                  color: "white",
                }}
              >
                Search
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {data.length > 0 ? (
          <>
            <View className="items-center">
              <Pressable
                className="bg-red-500 py-2 px-4 rounded-md"
                onPress={clearAll}
              >
                <Text>Clear All</Text>
              </Pressable>
            </View>
            <ScrollView horizontal={true} className="mr-4">
              <View className="mx-4 my-4 bg-white  pt-4 rounded-lg ">
                <View className="flex flex-row mb-4 px-4">
                  {/* <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Action
                  </Text> */}
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Name
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Hunt Score
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Sales Rank
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Cost $0.00
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Profit (FBA)
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center w-24"
                  >
                    Ave Sales Rank
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                    }}
                    className="text-center ml-4"
                  >
                    Profit Vendors
                  </Text>
                </View>
                {data?.length
                  ? data?.map((dataList, i) => (
                      <OfferCard
                        // deleteOfferCard={clearBook}
                        key={i}
                        index={i}
                        data={dataList}
                        finalProfit={finalProfit[i] || 0}
                        salesRank={salesRank[i]}
                        vendors={Vendors[i]}
                        huntScore={huntScore[i]}
                        ave={ave[i]}
                      />
                    ))
                  : null}
              </View>
            </ScrollView>
          </>
        ) : null}
      </ScrollView>
    </>
  );
};

export default BulkHunt;
