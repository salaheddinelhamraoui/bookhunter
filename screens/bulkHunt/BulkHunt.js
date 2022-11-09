import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";
import { FONTS, SIZES, assets } from "../../constants";
import { getRestrictedById } from "../../utils/Bulk.service";
import { convISBN13toISBN10 } from "../../utils/services";
import { triggersResult } from "../../utils/Triggers.service";
import OfferCard from "./OfferCard";

const BulkHunt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [salesRank, setSalesRank] = useState();
  const [ave, setAve] = useState();
  const [bookStatus, setBookStatus] = useState();
  const [voted, setVoted] = useState();
  const [triggers, setTriggers] = useState();
  const [minUsedFbaPrice, setMinUsedFbaPrice] = useState();
  const [filtredDate, setFiltredDate] = useState();
  const [weight, setWeight] = useState();
  const [fba, setFba] = useState();

  const { user } = useSelector((state) => state.userSlice.data);

  function getBookStatus(isbn, index) {
    let statusList = [...bookStatus];
    let voteList = [...voted];
    getRestrictedById(isbn)
      .then((result) => {
        statusList[index] = result.data.status;
        voteList[index] = result.data.usersId.includes(user?.id);
      })
      .catch((err) => console.log(err));
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

      setFiltredDate((oldValue) => [...oldValue, filterTemp]);
    }
  }

  const limitMessage = (message) => Toast.show(message);

  async function submit() {
    searchLimit(user.id, "bulkHuntLimit", inputList.length, state[0].plan).then(
      async (result) => {
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
            await bulkHunt(ISBN || inputList[i]).then((result) => {
              setData((prev) => {
                return {
                  masterVendors: [
                    ...prev.masterVendors,
                    result.data.MasterVendors,
                  ],
                  bookData: [...prev.bookData, result.data.bookData],
                  vendors: [...prev.vendors, result.data.vendors],
                  profitFBA: [...prev.profitFBA, result.data.profitFBA],
                };
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
            });
            triggersResult(ISBN).then((result) => {
              handleOffersList(result.data.usedObject, result.data.newObject);
              setWeight((oldArray) => [...oldArray, result.data.weight]);
              setFba((oldArray) => [...oldArray, result.data.fba]);
            });
            // setInputList([]);
          }
          setLoading(false);
          setShowClearAll(true);
        } else {
          limitMessage(result.data.message);
        }
      }
    );
  }

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
            <OfferCard bg="bg-gray-200" />
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default BulkHunt;
