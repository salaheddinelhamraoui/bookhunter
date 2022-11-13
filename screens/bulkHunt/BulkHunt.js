import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";
import { FONTS, SIZES, assets } from "../../constants";
import {
  getRestrictedById,
  searchLimit,
  bulkHunt,
} from "../../utils/Bulk.service";
import { convISBN13toISBN10 } from "../../utils/services";
import {
  getTriggers,
  getTriggersSet,
  triggersResult,
} from "../../utils/Triggers.service";
import OfferCard from "./OfferCard";
import Loading from "../../components/Loading";

const BulkHunt = () => {
  const user = useSelector((state) => state.userSlice.data);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  // {
  //   masterVendors: [],
  //   bookData: [],
  //   vendors: [],
  //   profitFBA: [],
  // }

  const [salesRank, setSalesRank] = useState([]);
  const [ave, setAve] = useState([]);
  const [bookStatus, setBookStatus] = useState([]);
  const [voted, setVoted] = useState([]);
  const [triggers, setTriggers] = useState();
  const [minUsedFbaPrice, setMinUsedFbaPrice] = useState();
  const [filteredDate, setFilteredDate] = useState([]);
  const [weight, setWeight] = useState([]);
  const [fba, setFba] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [autoSearch, setAutoSearch] = useState(false);
  const [fulfillement, setFulfillement] = useState("FBA");
  const [items, setItems] = useState([]);
  const [triggerSet, setTriggerSet] = useState([]);
  const REFERRAL_FEE = 0.15;
  const CLOSSING_FEE = 1.8;
  const [selectedValue, setSelectedValue] = useState([]);
  const [finalProfit, setFinalProfit] = useState([]);
  const [huntScore, setHuntScore] = useState([]);
  const [amazonPercentage, setAmazonPercentage] = useState(0);
  const [BBCompare, setBBCompare] = useState();
  const [selectedFBA, setSelectedFBA] = useState(null);
  const [selectedMF, setSelectedMF] = useState(null);
  const [amazonPrice, setAmazonPrice] = useState(null);
  const [searchInput, setSearchInput] = useState([]);

  // const isbn = "9781524911959,9780470533314,9781111825867";
  // const isbn = null;
  // useEffect(() => {
  //   if (isbn) {
  //     setInputList(isbn.split(","));
  //     setAutoSearch(true);
  //   }
  // }, [isbn, inputList]);

  // useEffect(() => {
  //   if (autoSearch) {
  //     submit();
  //   }
  // }, [autoSearch]);

  // useCallback((data) => {
  //   setInputList(data);
  // }, []);

  useEffect(() => {
    if (!inputList.length) return;
    //get data from triggers database
    const user_Id = user?.id;
    getTriggersSet(user_Id)
      .then((res) => res.data)
      .then(
        (result) => {
          result.map((trigger) => {
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

  useEffect(() => {
    if (!inputList.length) return;
    if (selectedValue.length) {
      let tempArray = [];
      selectedValue.map((item, index) => {
        let temp = item * REFERRAL_FEE + CLOSSING_FEE;
        // calculate the fina profit calculation to be able to detect if its a reject or an accept
        if (fulfillement == "FBA") {
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
        } else {
          let MFCPP =
            +triggerSet.MFFixed + +Math.ceil(weight) * +triggerSet.MFCostPerLBS;
          let totalFees = item * REFERRAL_FEE + CLOSSING_FEE;
          tempArray.push(
            Math.round((item - totalFees - triggerSet.buyCost - MFCPP) * 100) /
              100 || 0
          );
        }
      });
      setFinalProfit(tempArray);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (!inputList.length) return;
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
              // setTargetProfit(item.targetProfit);
              //set the amazon percentage
              setAmazonPercentage(item.offAmazon);
              //set BBCompare
              setBBCompare(item.BBCompare);
              //set auto reject
              // setAutoReject(item.alwaysReject == "Yes" ? true : false);
              //set the value of the selected fba offer
              if (item.FBASlot != "Skip") {
                setSelectedFBA(triggers[item.FBASlot - 1].usedfba);
                // setSelectedValueIndex1(item.FBASlot);
              }
              //set the value of the selected used offer
              if (item.usedSlot == "Highest") {
                setSelectedMF(triggers[triggers.length - 1].usedprice);
                // setSelectedValueIndex2(triggers.length);
              } else if (+item.usedSlot == 10) {
                setSelectedMF(triggers[5].usedprice);
                // setSelectedValueIndex2(6);
              } else {
                setSelectedMF(triggers[item.usedSlot - 1].usedprice);
                // setSelectedValueIndex2(item.usedSlot);
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
    if (!inputList.length) return;
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

  // useEffect(() => {
  //   let temp = data.length && [...data[0]?.Vendors];
  //   console.log(temp.length);
  //   if (!temp.length) return;
  //   temp.length &&
  //     temp.forEach(
  //       (item) => {
  //         item.sort();
  //       }
  //       // item.sort((a, b) =>
  //       //   +a.price.replace("$", "") < +b.price.replace("$", "")
  //       //     ? 1
  //       //     : +b.price.replace("$", "") < +a.price.replace("$", "")
  //       //     ? -1
  //       //     : 0
  //       // )
  //     );
  // }, [data[0]?.Vendors]);

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

  function getBookStatus(isbn, index) {
    let statusList = [...bookStatus];
    let voteList = [...voted];
    // getRestrictedById(isbn)
    //   .then((result) => {
    //     statusList[index] = result.data.status;
    //     voteList[index] = result.data.usersId.includes(user?.id);
    //   })
    //   .catch((err) => console.log(JSON.stringify(err)));
    setBookStatus(statusList);
    setVoted(voteList);
  }

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
      for (let i = 0; i < usedObject.length; i++) {
        if (usedObject[i].isFBA) {
          //append used fba price
          usedFba.push(`${usedObject[i].Price + usedObject[i].shipping || 0}`);
          //append fba condition
          condition.push(`${usedObject[i].Condition || null}`);
          usedFBAPriceCondition.push(`${usedObject[i].Condition || null}`);

          //append used price
          if (i < 6) {
            usedPrice.push(
              `${usedObject[i].Price + usedObject[i].shipping || 0}`
            );
          }
          usedPriceCondition.push(`${usedObject[i].Condition || null}`);
          //append condition
          condition.push(`${usedObject[i].Condition || null}`);
        }
        //append used price
        usedPrice.push(`${usedObject[i].Price + usedObject[i].shipping || 0}`);
        usedPriceCondition.push(`${usedObject[i].Condition || null}`);
        //append condition
        condition.push(`${usedObject[i].Condition || null}`);
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
          if (i < 6) {
            newPrice.push(`${newObject[i].Price + newObject[i].shipping || 0}`);
          }
        }
        //append new fba price
        newPrice.push(newObject[i].Price + newObject[i].shipping || 0);
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
    newPrice = newPrice.sort((a, b) => a - b);
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
        usedShipping: usedShipping[i] || 0,
        newShipping: newShipping[i] || 0,
      };
      tempTriggers.push(newElement);
    }
    tempTriggers.length && setTriggers(tempTriggers);
  }

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

      setFilteredDate((oldValue) => [...oldValue, filterTemp]);
    }
  }

  const limitMessage = (message) => Toast.show(message);

  async function submit() {
    setIsLoading(true);
    searchLimit(user?.id, "bulkHuntLimit", inputList.length, "")
      .then(async (result) => {
        if (result.data.status) {
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
            await bulkHunt(ISBN || inputList[i])
              .then((result) => {
                setData((prev) => {
                  return [...prev, result.data];
                });
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
              })
              .catch((err) => {
                console.log(JSON.stringify(err));
                throw new Error(err);
              });
            triggersResult(ISBN).then((result) => {
              handleOffersList(result.data.usedObject, result.data.newObject);
              setWeight((oldArray) => [...oldArray, result.data.weight]);
              setFba((oldArray) => [...oldArray, result.data.fba]);
            });
            setInputList([]);
          }
          setLoading(false);
          setShowClearAll(true);
        } else {
          limitMessage(result.data.message);
        }
      })
      .catch((err) => console.log(JSON.stringify(err)))
      .finally(() => setIsLoading(false));
  }

  function VendorQuantity(vendorName, quantity) {
    switch (vendorName) {
      case "WinyaBooks":
        return 5;
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

  function handleSearch(text) {
    const inputs = text.split(",");
    setInputList(inputs);
  }

  function handleSearchButton() {
    setData([]);
    setSalesRank([]);
    setAve([]);
    submit();
  }

  return (
    <>
      {isLoading ? <Loading /> : null}
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
          <Searchbar
            placeholder="978...,278..,..."
            className=" my-4"
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={handleSearchButton}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} className="mr-4">
          <View className="mx-4 my-4 bg-white  pt-4 rounded-lg ">
            <View className="flex flex-row mb-4 px-4">
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
                Tracker
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
                className="text-center ml-4"
              >
                Profit Vendors
              </Text>
            </View>
            {data?.length
              ? data?.map((dataList, i) => (
                  <OfferCard
                    key={i}
                    index={i}
                    data={dataList}
                    salesRank={salesRank[i]}
                    huntScore={huntScore[i]}
                  />
                ))
              : null}
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default BulkHunt;
