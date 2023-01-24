import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import InfoBookCard from "../../components/InfoBookCard";
import {
  addRecentlySearched,
  bookSearch,
  searchLimit,
} from "../../utils/Bulk.service";
import {
  getTriggers,
  getTriggersSet,
  triggersResult,
} from "../../utils/Triggers.service";
import HuntActions from "./HuntActions";
import HuntTableHead from "./HuntTableHead";
import ProfitFBATable from "./ProfitFBATable";
import VendorsTable from "./VendorsTable";
import Loading from "../../components/Loading";
import { FONTS, SIZES } from "../../constants";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Hunt({ route }) {
  const [userId, setUserId] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [input, setInput] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [inputListCache, setInputListCache] = useState([]);
  const [salesRank, setSalesRank] = useState([]);
  const [filteredDate, setFiltredDate] = useState([]);
  const [profitFBA, setProfitFBA] = useState([]);
  const [amazonPrice, setAmazonPrice] = useState("");
  const [usedObject, setUsedObject] = useState([]);
  const [newObject, setNewObject] = useState();
  const REFERRAL_FEE = 0.15;
  const CLOSSING_FEE = 1.8;
  const AMAZON_SELLER_FEE = 0.99;
  const [minUsedFbaPrice, setMinUsedFbaPrice] = useState(0);
  const [buyBox, setBuyBox] = useState(0);
  const [BBCompare, setBBCompare] = useState();
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueIndex1, setSelectedValueIndex1] = useState(null);
  const [selectedValueIndex2, setSelectedValueIndex2] = useState(null);
  const [selectedValueIndex, setSelectedValueIndex] = useState(null);
  const [selectedFBA, setSelectedFBA] = useState(null);
  const [selectedMF, setSelectedMF] = useState(null);
  const [fulfillement, setFulfillement] = useState("FBA");
  const [salesRankType, setSalesRankType] = useState("Min/Max");
  const [targetProfit, setTargetProfit] = useState(null);
  const [data, setData] = useState();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [triggerSet, setTriggerSet] = useState([]);
  const [triggerData, setTriggerData] = useState([]);
  const [previousID, setPreviousID] = useState(null);
  const [finalProfit, setFinalProfit] = useState(0);
  const [amazonPercentage, setAmazonPercentage] = useState(0);
  const [autoReject, setAutoReject] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [isActive, setActive] = useState(false);
  const [maxVendor, setMaxVendor] = useState(0);
  const [sortedVendors, setSortedVendors] = useState([]);
  const [selectedVendorsValue, setSelectedVendorsValue] = useState(0);
  const [previousVendorsID, setPreviousVendorsID] = useState(null);
  const [tempID, setTempID] = useState(null);
  const [tempVendorsID, setTempVendorsID] = useState(null);
  const [vendorsProfit, setVendorsProfit] = useState(0);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [graph, setGraph] = useState();
  const [isbn, setIsbn] = useState([]);
  const [title, setTitle] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [publisher, setPublisher] = useState("");
  const [avg30, setAvg30] = useState(0);
  const [avg90, setAvg90] = useState(0);
  const [avg180, setAvg180] = useState(0);
  const [bookCover, setBookCover] = useState("");
  const [author, setAuthor] = useState("");
  const [weight, setWeight] = useState(0);
  const [fba, setFba] = useState(0);
  const [storage, setStorage] = useState(0);
  const [ebayNew, setEbayNew] = useState(0);
  const [ebayUsed, setEbayUsed] = useState(0);
  const [EditedBuyCost, setEditedBuyCost] = useState(0);
  const [bookStatus, setBookStatus] = useState();
  const [voted, setVoted] = useState(false);
  const [huntScore, setHuntScore] = useState(0);

  const [openPopup, setOpenPopup] = useState(false);

  let ParamIsbn;
  ParamIsbn = route?.params?.isbn;
  let type = route?.params?.type;

  // let ParamIsbn = { isbn: "9780393918281" };

  const options = { year: "numeric", month: "long", day: "numeric" };
  let vendorsObject = {};

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

  useEffect(() => {
    let temp = [
      ...vendors.map((vendor) => +vendor.price.replace(/[^\d.-]/g, "")),
    ];
    let maxTemp = Math.max(...temp);
    setMaxVendor(maxTemp);
    setSortedVendors(
      vendors.sort((a, b) =>
        +a.price.replace(/[^\d.-]/g, "") < +b.price.replace(/[^\d.-]/g, "")
          ? 1
          : -1
      )
    );
  }, [vendors]);

  useEffect(() => {
    if (sortedVendors.length > 4) {
      setSortedVendors(sortedVendors.slice(0, 4));
    }
  }, [sortedVendors]);

  useEffect(() => {
    //get data from triggers database
    // const user_Id = userService.getUserId();
    getTriggersSet(user_Id)
      .then((res) => res.data)
      .then(
        (result) => {
          result.map((trigger, index) => {
            //only leave the active trigger
            if (trigger.active == "true") {
              setFulfillement(trigger.fulfillement);
              setSalesRankType(trigger.salesRankType);
              getTriggers(trigger._id).then((res) => {
                if (res.data.length) {
                  setItems(res.data);
                  setTriggerSet(trigger);
                  setTriggerData(getTriggers(trigger._id));
                }
              });
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);

  function addRestrictedBook(ISBN = inputList[0]) {
    let start = performance.now();
    // const user_Id = userService.getUserId();
    addRestricted(ISBN, user_Id);
    setVoted(true);
    //console.log("Time to add restricted book: " + (end - start) + "ms");
  }

  async function getBookStatus(isbn) {
    let start = performance.now();
    // const user_Id = userService.getUserId();
    // await restricted.getRestrictedById(isbn).then((result) => {
    //   if (result) {
    //     setBookStatus(result.data.status);
    //     setVoted(result.data.usersId.includes(user_Id));
    //   } else return;
    // });
  }

  // const state = useContext(UserContext);

  function convISBN13toISBN10(str) {
    var s;
    var c;
    var checkDigit = 0;
    var result = "";

    s = str.substring(3, str.length);
    for (let k = 10; k > 1; k--) {
      c = s.charAt(10 - k);
      checkDigit += (c - 0) * k;
      result += c;
    }
    checkDigit = (11 - (checkDigit % 11)) % 11;
    result += checkDigit == 10 ? "X" : checkDigit + "";

    return result;
  }
  // const user_Id = userService.getUserId();

  const user = useSelector((state) => state.userSlice.data);
  const user_Id = user.id;
  // function redirection() {
  //   window.location.href = `/scan-results/${input}`;
  // }

  useEffect(() => {
    if (ParamIsbn) {
      setInputList([ParamIsbn]);
      submit(ParamIsbn);
    }
  }, [ParamIsbn]);

  const handelSearch = (isbn) => {
    setInputList([isbn]);
  };

  const handelSearchButton = () => {
    setIsLoading(true);
    submit(inputList[0]);
  };

  const [isLoading, setIsLoading] = useState(false);
  async function submit(ISBN = inputList[0]) {
    setIsLoading(true);
    searchLimit(user_Id, "huntLimit", 1, "").then((result) => {
      if (result.data.status) {
        setActive(true);
        getBookStatus(ISBN);
        if (ISBN?.startsWith("290")) {
          ISBN = convISBN13toISBN10(ISBN);
        }
        if (ISBN.length == 10) {
          let isbnTemp = ISBN.slice(0, -1);
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
        }
        bookSearch(ISBN, "sell").then((result) => {
          addRecentlySearched(
            ISBN,
            result.data.bookData.book.image,
            result.data.Vendors
          );
          setVendors(result.data.Vendors);
        });
        //get all data from keepa
        triggersResult(ISBN)
          .then((result) => {
            setSalesRank(
              Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 2,
              }).format(result.data.salesRank[0])
            );
            // console.log(result.data);
            setEbayNew(result.data.ebayNew);
            setEbayUsed(result.data.ebayUsed);
            filterTrackerDate(...result.data.tracker);
            setProfitFBA(result.data.profitFBA);
            setAmazonPrice(result.data.amazonPrice);
            setBuyBox(result.data.buyBox);
            handleOffersList(result.data.usedObject, result.data.newObject);
            setGraph(result.data.graph);
            setIsbn(result.data.isbn);
            setTitle(result.data.title);
            setDatePublished(
              new Date(
                result.data.datePublished.substring(0, 4) +
                  "-" +
                  result.data.datePublished.substring(4, 6) +
                  "-" +
                  result.data.datePublished.substring(6, 8)
              ).toLocaleDateString("en-US", options)
            );
            setPublisher(result.data.publisher);
            setBookCover(result.data.bookCover);
            setAuthor(result.data.author);
            setWeight(result.data.weight);
            setFba(result.data.fba);
            setStorage(result.data.storageFees);
            setAvg30(
              Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 2,
              }).format(result.data.avg30)
            );
            setAvg90(
              Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 2,
              }).format(result.data.avg90)
            );
            setAvg180(
              Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 2,
              }).format(result.data.avg180)
            );
            setIsLoading(false);
            // if (finalProfit >= targetProfit && !autoReject) {
            //   success.play();
            // } else {
            //   fail.play();
            // }
          })
          .then(() => {
            setInputListCache(inputList);
          });
      } else {
        limitMessage(result.data.message);
      }
    });
  }

  function filterTrackerDate(tracker) {
    if (tracker) {
      const start = performance.now();
      let dateTemp = [];
      let filterTemp = [];
      let day = 0;
      for (let i = 0; i < tracker.length; i++) {
        if (i % 2 == 0) {
          let temp = Date.parse(new Date((tracker[i] + 21564000) * 60000));
          let temp2 = new Date(temp);
          if (temp2.getDay() != day) {
            filterTemp.push(tracker[i + 1]);
            day = temp2.getDay();
          }
        }
      }

      setFiltredDate((oldValue) => [...oldValue, filterTemp]);
      const end = performance.now();
      //console.log(`data extraction Execution time: ${end - start} ms`);
    }
  }

  function trackerCalculation() {
    const start = performance.now();
    //calculate tracker based on parameters that will be provided by the client in the future
    let result = 0;
    for (let i = 0; i < filteredDate[0].length - 2; i++) {
      if ((filteredDate[0][i + 1] * 100) / filteredDate[0][i] <= 90) {
        result += 1;
      }
    }
    const end = performance.now();
    //console.log(`tracker calculation extraction Execution time: ${end - start} ms`);
    return result;
  }

  //SEE LATER
  useEffect(() => {
    // select the most profitable price based on the active trigger parameters
    if (filteredDate.length && !huntScore && triggers.length) {
      let score = trackerCalculation();
      setHuntScore(score);
      items.map((item) => {
        if (score) {
          //alert('im at score')
          //select the correct line of the trigger
          if (score >= item.minTracker && score <= item.maxTracker) {
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
              setSelectedMF(triggers[5 - 1].usedprice);
              setSelectedValueIndex2(5);
            } else {
              setSelectedMF(triggers[item.usedSlot - 1].usedprice);
              setSelectedValueIndex2(item.usedSlot);
            }
          }
        } else if (salesRankType === "Min/Max") {
          //alert('im at sales rank')
          if (salesRank >= item.minRank && score <= item.maxRank) {
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
              setSelectedMF(triggers[5 - 1].usedprice);
              setSelectedValueIndex2(5);
            } else {
              setSelectedMF(triggers[item.usedSlot - 1].usedprice);
              setSelectedValueIndex2(item.usedSlot);
            }
          }
        } else {
          //alert('im at ave sales rank')
          if (salesRank >= item.minAveRank && score <= item.maxAveRank) {
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
              setSelectedMF(triggers[5 - 1].usedprice);
              setSelectedValueIndex2(5);
            } else {
              setSelectedMF(triggers[item.usedSlot - 1].usedprice);
              setSelectedValueIndex2(item.usedSlot);
            }
          }
        }
      });
    }
  }, [triggers]);

  useEffect(() => {
    if (selectedFBA) {
      if (BBCompare == "Yes") {
        setSelectedValue(Math.max(selectedFBA, minUsedFbaPrice));
      } else {
        setSelectedValue(Math.max(selectedFBA));
      }
    } else if (selectedMF) {
      if (BBCompare == "Yes") {
        setSelectedValue(Math.max(selectedMF, minUsedFbaPrice));
      } else {
        setSelectedValue(Math.max(selectedMF));
      }
    } else if (amazonPrice) {
      if (BBCompare == "Yes") {
        setSelectedValue(
          Math.max(
            minUsedFbaPrice,
            amazonPrice - (amazonPrice * amazonPercentage) / 100
          )
        );
      } else {
        setSelectedValue(amazonPrice - (amazonPrice * amazonPercentage) / 100);
      }
    }
  }, [selectedFBA, selectedMF]);

  useMemo(() => {
    const start = performance.now();
    if (selectedValue == selectedFBA) {
      setSelectedValueIndex(`${selectedValueIndex1 - 1}1`);
      selectedValueIndex1 != null && "";
      // setPreviousID(`${selectedValueIndex1 - 1}1`);
    } else if (selectedValue == selectedMF) {
      setSelectedValueIndex(`${selectedValueIndex2 - 1}0`);
      selectedValueIndex2 != null &&
        setPreviousID(`${selectedValueIndex2 - 1}0`);
    } else if (selectedValue == minUsedFbaPrice) {
      // setPreviousID("usedBuyBox");
    } else if (selectedValue == amazonPrice - amazonPrice * 0.1) {
      setPreviousID("Amazon");
    }
    const end = performance.now();
    //console.log(`Selection Execution time: ${end - start} ms`);
  }, [selectedValue]);

  const handleOffersList = (usedObject, newObject) => {
    let start = performance.now();
    let usedPrice = [];
    let usedFBAPriceCondition = [];
    let usedPriceCondition = [];
    let usedFba = [];
    let newPrice = [];
    let newFba = [];
    let maxUsedPrice;
    let usedShipping = [];
    let newShipping = [];
    setTriggers([]);
    //set up an object with all of the prices and conditions for the used books
    if (usedObject) {
      usedObject.sort((a, b) => {
        return a.Price - b.Price;
      });
      //get the max used price
      //maxUsedPrice = Math.max.apply(Math, usedObject.map(function(item) { return item.Price; }))
      for (let i = 0; i < usedObject.length; i++) {
        if (usedObject[i].isFBA) {
          //append used fba price
          usedFba.push(`${usedObject[i].Price + usedObject[i].shipping || 0}`);
          //append fba condition
          usedFBAPriceCondition.push(`${usedObject[i].Condition || null}`);
          // usedShipping.push(`${usedObject[i].usedShipping || null}`);

          //append used price
          if (i < 6) {
            usedPrice.push(
              `${usedObject[i].Price + usedObject[i].shipping || 0}`
            );
            usedPriceCondition.push(`${usedObject[i].Condition || null}`);
            //append condition
          }
          //usedShipping.push(`${usedObject[i].usedShipping || null}`);
        }
        //append used price
        usedPrice.push(`${usedObject[i].Price + usedObject[i].shipping || 0}`);
        usedPriceCondition.push(`${usedObject[i].Condition || null}`);
        //append condition
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
    usedPriceCondition = usedPriceCondition.sort(
      (a, b) => usedPrice.indexOf(a) - usedPrice.indexOf(b)
    );
    usedFba = usedFba.slice(0, 5);
    usedFBAPriceCondition = usedFBAPriceCondition.slice(0, 5);
    usedFba = usedFba.sort((a, b) => a - b);
    usedFBAPriceCondition = usedFBAPriceCondition.sort(
      (a, b) => usedFba.indexOf(a) - usedFba.indexOf(b)
    );
    newPrice.sort((a, b) => {
      return a - b;
    });
    newPrice = newPrice.slice(0, 7);

    newPrice = newPrice.sort((a, b) => a - b);
    newFba = newFba.slice(0, 7);
    newFba = newFba.sort((a, b) => a - b);
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
        usedFBAPriceCondition: usedFBAPriceCondition[i] || "",
        usedShipping: usedShipping[i] || 0,
        newShipping: newShipping[i] || 0,
      };
      tempTriggers.push(newElement);

      //determineSelectedValue()
    }
    setTriggers(tempTriggers);
  };

  function handleCLick(e, id) {
    //handle the selection of values and their background and calculation
    setPreviousID(id);
    setSelectedValue(+e.replace(/[^\d.-]/g, ""));
  }

  function handleVendorsCLick(e, id) {
    //handle the selection of values and their background and calculation
    setPreviousVendorsID(id);
    setSelectedVendorsValue(+e.replace("$", ""));
    setVendorsProfit(+e.replace("$", ""));
  }

  // useEffect(() => {
  //   //set the background of the selected value
  //   previousID &&
  //     document.getElementById(previousID)?.classList.add("bg-darkTeal");
  //   previousID &&
  //     document.getElementById(previousID)?.classList.toggle("text-white");
  //   setTempID(previousID);
  // }, [previousID]);

  useEffect(() => {
    //set the background of the selected value
    // let start = performance.now();
    // if (tempVendorsID) {
    //   document.getElementById(tempVendorsID).classList.toggle("bg-darkTeal");
    //   document.getElementById(tempVendorsID).classList.toggle("text-white");
    // }
    // previousVendorsID &&
    // setSelectedVendorsValue(
    //   document
    //     .getElementById(previousVendorsID)
    //     .dataset.price.replace("$", "")
    // );
    // previousVendorsID &&
    // setVendorsProfit(
    //   document
    //     .getElementById(previousVendorsID)
    //     .dataset.price.replace("$", "")
    // );
    // previousVendorsID &&
    //   document.getElementById(previousVendorsID).classList.add("bg-darkTeal");
    // previousVendorsID &&
    //   document.getElementById(previousVendorsID).classList.add("text-white");
    setTempVendorsID(previousVendorsID);
  }, [previousVendorsID]);

  useEffect(() => {
    let temp = [
      ...vendors.map((vendor) => +vendor.price.replace(/[^\d.-]/g, "")),
    ];
    let maxTemp = parseFloat(Math.max(...temp) - EditedBuyCost).toFixed(2);
    setMaxVendor(maxTemp);
    temp = selectedValue * REFERRAL_FEE + CLOSSING_FEE;
    // calculate the fina profit calculation to be able to detect if its a reject or an accept
    if (fulfillement == "FBA") {
      if (EditedBuyCost) {
        setFinalProfit(
          Math.round(
            (selectedValue -
              temp -
              fba -
              storage -
              EditedBuyCost -
              triggerSet.FBACostPerLBS * weight) *
              100
          ) / 100 || 0
        );
      } else {
        setFinalProfit(
          Math.round(
            (selectedValue -
              temp -
              fba -
              storage -
              triggerSet.buyCost -
              triggerSet.FBACostPerLBS * weight) *
              100
          ) / 100 || 0
        );
      }
    } else {
      let MFCPP =
        +triggerSet.MFFixed + +Math.ceil(weight) * +triggerSet.MFCostPerLBS;
      let totalFees = selectedValue * REFERRAL_FEE + CLOSSING_FEE;
      if (EditedBuyCost) {
        setFinalProfit(
          (selectedValue &&
            Math.round(
              (selectedValue - totalFees - EditedBuyCost - MFCPP) * 100
            ) / 100) ||
            0
        );
      } else {
        setFinalProfit(
          (selectedValue &&
            Math.round(
              (selectedValue - totalFees - triggerSet.buyCost - MFCPP) * 100
            ) / 100) ||
            0
        );
      }
    }
    const end = performance.now();
  }, [selectedValue, EditedBuyCost, vendors]);

  // var success = new Audio("/success.mp3");
  // var fail = new Audio("/fail.mp3");

  function addToCart(index) {
    let found = false;
    let array = [];
    try {
      array = JSON.parse(localStorage.getItem("Vendors") || []);
      array.map((item) => {
        if (item["ID"] == vendors[index].vendorName + isbn[0]) {
          vendorsObject = vendors[index];
          vendorsObject["quantity"] = +item["quantity"] + 1;
          vendorsObject["price"] =
            "$" +
            +item["unitprice"].replace("$", "") * +vendorsObject["quantity"];
          array[index] = vendorsObject;
          // already exist
          localStorage.setItem("Vendors", JSON.stringify(array));
          Cart.updateCart(userId, array);
          found = true;
        }
      });
      if (!found) {
        vendorsObject = vendors[index];
        vendorsObject["ID"] = vendors[index].vendorName + isbn[0];
        vendorsObject["isbn"] = isbn[0];
        vendorsObject["unitprice"] = vendors[index].price;
        vendorsObject["operation"] = "sell";
        vendorsObject["quantity"] = "1";
        vendorsObject["title"] = title;
        array[array.length] = vendorsObject;
        // first add
        localStorage.setItem("Vendors", JSON.stringify(array));
        Cart.deleteCart(userId);
        Cart.addCart(userId, array);
      }
    } catch (err) {
      vendorsObject = vendors[index];
      vendorsObject["ID"] = vendors[index].vendorName + isbn[0];
      vendorsObject["unitprice"] = vendors[index].price;
      vendorsObject["isbn"] = isbn[0];
      vendorsObject["operation"] = "sell";
      vendorsObject["quantity"] = "1";
      vendorsObject["title"] = title;
      array[index] = vendorsObject;
      localStorage.setItem("Vendors", JSON.stringify(array));
    }
  }

  let bookData = {
    book: {
      image: bookCover,
      authors: [author],
      date_published: datePublished,
      isbn13: isbn[1],
      isbn10: isbn[0],
      publisher,
    },
  };

  let huntActions = {
    minUsedFbaPrice:
      minUsedFbaPrice && (Math.round(minUsedFbaPrice * 100) / 100).toFixed(2),
    buyBox: buyBox && (Math.round(buyBox * 100) / 100).toFixed(2),
    amazonPrice:
      amazonPrice && (Math.round(amazonPrice * 100) / 100).toFixed(2),
    graph,
    amazonUrl: `https://www.amazon.com/dp/${
      isbn && isbn[0]
    }/ref=nosim?tag=bookhunter02-20`,
  };

  let huntTableHead = {
    salesRank: salesRank ? salesRank : 0,
    huntScore: filteredDate.length && huntScore,
    avg: [avg180, avg90, avg30],
    ebay: [`Used $${ebayUsed / 100}`, `New $${ebayNew / 100}`],
  };

  let yindex = 0;
  let venderValue =
    +selectedVendorsValue - +EditedBuyCost ||
    (Math.abs(maxVendor) == Infinity ? 0 : maxVendor);

  const cancelLoading = () => {
    setActive(false);
    setIsLoading(false);
  };

  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <>
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
                onSubmitEditing={handelSearch}
                className="my-4 flex-grow"
                value={inputList[0]}
                placeholderTextColor={"#999"}
                onChangeText={handelSearch}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  fontFamily: FONTS.JosefinSansRegular,
                }}
              />
            </View>

            <Pressable
              onPress={() => navigation.navigate("HUNT SCANNER")}
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

          <TouchableOpacity onPress={handelSearchButton}>
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
        {isLoading ? (
          <Loading cancelLoading={cancelLoading} />
        ) : (
          isActive && (
            <>
              <InfoBookCard bookData={bookData} />
              <HuntActions
                huntActions={huntActions}
                handleClick={handleCLick}
                selectedItemId={previousID}
              />
              <View className="mx-4 rounded-md overflow-hidden mb-4">
                <HuntTableHead huntTableHead={huntTableHead} />
                <ProfitFBATable
                  finalProfit={finalProfit}
                  triggers={triggers}
                  handleClick={handleCLick}
                  yindex={yindex}
                  selectedItemId={previousID}
                />
                <VendorsTable
                  bookData={bookData}
                  venderValue={venderValue}
                  sortedVendors={sortedVendors}
                  handleVendorsClick={handleVendorsCLick}
                  setPreviousVendorsID={setPreviousVendorsID}
                  vendorName={previousVendorsID}
                />
              </View>
            </>
          )
        )}
      </>
    </ScrollView>
  );
}

export default Hunt;
