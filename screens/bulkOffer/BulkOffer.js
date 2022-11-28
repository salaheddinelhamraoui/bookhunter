import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { FONTS, SIZES, assets } from "../../constants";
import OfferCard from "./OfferCard";
import { useCallback, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { getRestrictedById, searchLimit } from "../../utils/Bulk.service";
import dataBackupService from "../../utils/data-backup.service";
import bulkOffer from "../../utils/bulk-offer.service";
import { Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";

const BulkOffer = () => {
  const [data, setData] = useState([]);
  const [Vendors, setVendors] = useState([]);
  const [masterVendors, setMasterVendors] = useState([]);
  const [input, setInput] = useState();
  const [inputList, setInputList] = useState([]);
  const [inputListCache, setInputListCache] = useState();
  const [masterEdit, setMasterEdit] = useState();
  const [slaveEdit, setSlaveEdit] = useState([]);
  const [salesRank, setSalesRank] = useState([]);
  const [tracker, setTracker] = useState([]);
  const [filteredDate, setFiltredDate] = useState([]);
  const [price, setPrice] = useState([]);
  const [profitFBA, setProfitFBA] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [open, setOpen] = useState(false);
  const [profit, setProfit] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [offer, setOffer] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState();
  const [recipName, setRecipName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [persoEmail, setPersoEmail] = useState();
  const [selected, setSelected] = useState();
  const [selectedList, setSelectedList] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [autoSearch, setAutoSearch] = useState(false);
  const [ave, setAve] = useState([]);
  const REFERRAL_FEE = 0.15;
  const CLOSSING_FEE = 1.8;
  const [values, setValues] = useState([]);
  const [id, setId] = useState(0);
  const [bookStatus, setBookStatus] = useState([]);
  const [voted, setVoted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listIndex, setListIndex] = useState([]);
  const [priceWithShipping, setPriceWithShipping] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [restrictedIndex, setRestrictedIndex] = useState();
  const [priceVendors, setPriceVendors] = useState();
  const [scoreState, setScoreState] = useState([]);
  const [selectedListID, setSelectedListID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionType, setSelectionType] = useState('vendors')

  const user = useSelector((state) => state.userSlice.data);


  useEffect(() => {
    values.length && setInput(values.toString().replaceAll(",", " "));
    setInputList(values);
  }, [values]);

  // let isbn = "9781524911959,9780470533314,9781111825867";

  // useEffect(() => {
  //     if (isbn) {
  //         setInputList(isbn.split(","));
  //         setAutoSearch(true);
  //     }
  // }, [isbn]);

  // useEffect(() => {
  //     submit();
  // }, [autoSearch]);

  async function submit() {
    setIsLoading(true);
    searchLimit(user.id, "bulkHuntLimit", inputList.length).then(
      async (result) => {
        if (result.data.status) {
          setLoading(true);
          getBookStatus(inputList);
          for (let i = 0; i < inputList.length; i++) {
            let ISBN = inputList[i];
            if (inputList[i].startsWith("290")) {
              console.log("isbn10 ", convISBN13toISBN10(inputList[i]));
              inputList[i] = convISBN13toISBN10(inputList[i])
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
            }

            await bulkOffer(ISBN || inputList[i]).then((result) => {

              setData((oldArray) => [
                ...oldArray,
                result.data.bookData,
              ]);
              setMasterVendors((oldArray) => [
                ...oldArray,
                result.data.Vendors,
              ]);
              setProfitFBA((oldArray) => [
                ...oldArray,
                result.data.profitFBA,
              ]);
              setShipping((oldArray) => [
                ...oldArray,
                result.data.shipping,
              ]);
              if (
                result.data.salesRank > 999 &&
                result.data.salesRank < 999999
              ) {
                setSalesRank((oldArray) => [
                  ...oldArray,
                  `${Math.round(result.data.salesRank / 1000)}K`,
                ]);
              } else if (result.data.salesRank > 999999) {
                setSalesRank((oldArray) => [
                  ...oldArray,
                  `${Math.round((result.data.salesRank / 1000000) * 10) /
                  10
                  }M`,
                ]);
              } else {
                setSalesRank((oldArray) => [
                  ...oldArray,
                  result.data.salesRank,
                ]);
              }
              if (result.data.ave > 999 && result.data.ave < 999999) {
                setAve((oldArray) => [
                  ...oldArray,
                  `${Math.round(result.data.ave / 1000)}K`,
                ]);
              } else if (result.data.ave > 999999) {
                setAve((oldArray) => [
                  ...oldArray,
                  `${Math.round((result.data.ave / 1000000) * 10) / 10
                  }M`,
                ]);
              } else {
                setAve((oldArray) => [...oldArray, result.data.ave]);
              }
              setTracker((oldArray) => [
                ...oldArray,
                result.data.tracker,
              ]);
              setPrice((oldArray) => [...oldArray, result.data.price]);
            });

            sellAllToVendors();

          }
          setLoading(false);
          setIsLoading(false);
        } else {
          limitMessage(result.data.message);
          setIsLoading(false);
        }
      }
    );
  }


  useEffect(() => {
    setFiltredDate([]);
    for (let i = 0; i < tracker.length; i++) {
      let dateTemp = [];
      let filterTemp = [];
      for (let j = 0; j < tracker[i].length; j++) {
        if (j % 2 != 0) {
          dateTemp.push(tracker[i][j]);
        } else {
          dateTemp.push(new Date((tracker[i][j] + 21564000) * 60000));
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
  }, [tracker]);

  function sellAllToVendors() {
    setListIndex([]);
    calculatePrice();
    setSelectionType('vendors')
  }

  useEffect(() => {
    if (masterVendors.length) {
      let tempTotal = 0;
      if (selected == "Amazon") {
        for (let i = 0; i < price.length; i++) {
          tempTotal += price[i] * (slaveEdit[i] || 1);
        }
      } else {
        for (let i = 0; i < selectedList.length; i++) {
          tempTotal += selectedList[i] * (slaveEdit[i] || 1);
        }
      }
      setTotalPrice(tempTotal);
      setPercentage((offer * 100) / tempTotal);
    }
  }, [price, slaveEdit]);


  function saveSlaveEdit(value, index) {
    let temp = [...slaveEdit];
    temp[index] = value;
    setSlaveEdit(temp);
  }

  function trackerCalculation(value) {
    try {
      let result = 0;
      for (let i = 0; i < filteredDate[value].length - 1; i++) {
        if ((filteredDate[value][i + 1] * 100) / filteredDate[value][i] <= 90) {
          result += 1;
        }
      }
      return result;
    } catch (e) {
      console.log("error", e);
    }
  }


  useEffect(() => {
    let score = [];
    filteredDate.map((item, index) => {
      score.push(trackerCalculation(index));
    });
    setScoreState(score);
  }, [filteredDate]);

  function handleOffer(value) {
    setOffer(value);
    setPercentage((value * 100) / totalPrice);
  }

  function handlePercentage(value) {
    setPercentage(value);
    setOffer((totalPrice * value) / 100);
  }

  // Sort
  useEffect(() => {
    if (masterVendors.length > 1) {
      const sorted = [...masterVendors].sort((a, b) => {
        return Number(b[0].price) - Number(a[0].price);
      });
    }
  }, [masterVendors]);

  // Sell All to Amazon with Shipping
  function sellAllToAmazon() {
    if (selected == "Vendors") {
      let tempTotal = 0;
      setSelected("Amazon");
      for (let i = 0; i < price.length; i++) {
        tempTotal += price[i] + shipping[i] * (slaveEdit[i] || 1);
      }
      setTotalPrice(tempTotal);
      // setOffer((totalPrice * tempTotal) / 100);
      setId(2);
    }

    setSelectionType('amazon')
  }

  useEffect(() => {
    // setOffer(
    //     (totalPrice * document.getElementById("percentage").value || 0) / 100
    // );
  }, [totalPrice]);


  function getBookStatus(isbns) {
    let statusList = [...bookStatus];
    let voteList = [...voted];
    isbns.map((isbn, index) => {
      const user_Id = user.id;
      getRestrictedById(isbn).then((result) => {
        try {
          statusList[index] = result.data.status;
          voteList[index] = result.data.usersId.includes(user_Id);
        } catch (e) {
          console.log("error", e);
        }
      });
    });
    setBookStatus(statusList);
    setVoted(voteList);
  }

  function addRestrictedBook(isbn, index) {
    const user_Id = userService.getUserId();
    restricted.addRestricted(isbn, user_Id);
    let voteList = [...voted];
    voteList[index] = true;
    setVoted(voteList);
  }


  useEffect(() => {
    calculatePrice();
  }, [selectedListID, listIndex]);


  useEffect(() => {
    let temp = [...masterVendors];
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

  }, [masterVendors]);


  useEffect(() => {
    let priceArray = [];
    price.map((pr, i) => {
      priceArray.push(
        parseFloat(((pr + shipping[i]) * percentage) / 100).toFixed(2)
      );
    });
    setPriceWithShipping(priceArray);
  }, [price, percentage]);

  useEffect(() => {
    let priceVendorsArray = [];
    listIndex.map((pr, i) => {
      priceVendorsArray.push(parseFloat((pr * percentage) / 100).toFixed(2));
    });
    setPriceVendors(priceVendorsArray);
  }, [listIndex, percentage]);

  function deleteVendor(index) {
    //alert(index)
    let temp1 = [...masterVendors];
    temp1.splice(index, 1);
    setMasterVendors(temp1);

    let temp2 = [...data];
    temp2.splice(index, 1);
    setData(temp2);

    let temp3 = [...price];
    temp3.splice(index, 1);
    setPrice(temp3);

    let temp4 = [...selectedList];
    temp4.splice(index, 1);
    setSelectedList(temp4);
  }

  function calculatePrice() {
    setSelected("Vendors");
    if (listIndex.length) {
      let sum = 0;
      listIndex.map((item, index) => {
        sum += +item.replace("$", "") * (slaveEdit[index] || 1);
      });
      setTotalPrice(sum);
    } else {
      let sum = 0;
      masterVendors.map((item) => {
        sum += +item[0].price.replace(/[^0-9\.]+/g, "");
        setListIndex((oldArray) => [
          ...oldArray,
          item[0].price.replace(/[^0-9\.]+/g, ""),
        ]);
      });
      setTotalPrice(sum);
    }
    setId(1);
  }


  function handleSearch(text) {
    const inputs = text.split(",");
    setInputList(inputs);
  }

  function handleSearchButton() {
    // setTotalPrice(0);
    // setMasterVendors([]);
    // setOffer(0);
    // setProfitFBA([]);
    // setPercentage(0);
    // // setInputList([]);
    // // setInput([]);
    // setPrice([]);
    // setVendors([]);
    // setBookStatus([]);
    // setVoted([]);
    submit();
  }

  const deleteBook = (isbn) => {
    let filteredBooks = data.filter(
      (book, index) => data[index][0].book.isbn13.split(",")[0] !== isbn
    )

    setData(filteredBooks);
    // calculatePrice();
  }

  const clearData = () => {
    setTotalPrice(0);
    setMasterVendors([]);
    setOffer(0);
    setProfitFBA([]);
    setPercentage(0);
    // setInputList([]);
    // setInput([]);
    setData([]);
    setPrice([]);
    setVendors([]);
    setBookStatus([]);
    setVoted([]);
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
        </View>
        <View className="mx-4 mt-4 bg-white px-4 py-4 rounded-lg">
          <Searchbar
            placeholder="978...,279.."
            onSubmitEditing={handleSearchButton}
            className=" my-4"
            value={inputList}
            placeholderTextColor={"#999"}
            onChangeText={handleSearch}
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              fontFamily: FONTS.JosefinSansRegular,
            }}
          />
          <TouchableOpacity className="" onPress={handleSearchButton}>
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
        {data.length > 0 && <View className="mx-4 my-4 bg-white  pt-4 rounded-lg px-4 py-4 flex flex-col">
          <View className="flex flex-row justify-between">
            <View className="w-[45%]">
              <Text
                className="mb-1"
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                Total Price
              </Text>
              <Text
                className="mb-1 border-[0.2px] rounded-lg px-2 py-3 bg-gray-200"
                style={{
                  fontFamily: FONTS.textBold,

                }}
              >
                {Math.round(totalPrice * 100) / 100}
              </Text>
            </View>
            <View className=" w-[45%]">
              <Text
                className="mb-1"
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                Gross Profit
              </Text>
              <Text
                className="mb-1 border-[0.2px] rounded-lg px-2 py-3 bg-gray-200"
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                {
                  id === 2
                    ? Math.round(
                      profitFBA.reduce(
                        (partialSum, a) => partialSum + a,
                        0
                      ) * 100
                    ) / 100
                    : Math.round(totalPrice * 100) / 100
                }
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-2">
            <View className="w-[45%]">
              <Text
                className="mb-1 "
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                %
              </Text>
              <TextInput
                onChangeText={(value) => { handlePercentage(value); }}
                outlineColor={"#6fbfbf"}
                activeOutlineColor={"#393e59"}
                mode="outlined"
                label="%"
                placeholder="%"
                className="border-[0.2px] rounded-lg px-2 py-2"
                defaultValue={
                  isNaN(percentage)
                    ? 0
                    : percentage
                      .toString()
                      .split(".")
                      .map((el, i) =>
                        i ? el.split("").slice(0, 2).join("") : el
                      )
                      .join(".")
                }
              />
            </View>
            <View className="w-[45%]">
              <Text
                className="mb-1"
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                Net Profit

              </Text>
              <Text
                className="mb-1 border-[0.2px] rounded-lg px-2 py-3 bg-gray-200"
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                {
                  id == 2
                    ? offer !== 0
                      ? Math.round(
                        (profitFBA.reduce(
                          (partialSum, a) => partialSum + a,
                          0
                        ) -
                          offer) *
                        100
                      ) / 100
                      : 0
                    : offer !== 0
                      ? Math.round((totalPrice - offer) * 100) / 100
                      : 0
                }
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-2">
            <View className="w-[45%]">
              <Text
                className="mb-1 "
                style={{
                  fontFamily: FONTS.textBold,
                }}
              >
                Offer
              </Text>
              <TextInput
                onChangeText={(value) => { handleOffer(value); }}
                outlineColor={"#6fbfbf"}
                activeOutlineColor={"#393e59"}
                mode="outlined"
                label="OFFER"
                placeholder="Offer"
                className="border-[0.2px] rounded-lg px-2 py-2"
                defaultValue={offer
                  .toString()
                  .split(".")
                  .map((el, i) =>
                    i ? el.split("").slice(0, 2).join("") : el
                  )
                  .join(".")}
              />

            </View>

          </View>
          <View className="flex flex-row justify-between mt-2 flex-wrap">
            <View className="w-[48%]">
              <TouchableOpacity className="" onPress={sellAllToAmazon}>
                <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-3">
                  <Text
                    className="text-center"
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                      fontSize: SIZES.font,
                      color: "white",
                    }}
                  >
                    Sell All to Amazon
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[48%]">
              <TouchableOpacity className="" onPress={sellAllToVendors}>
                <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-3">
                  <Text
                    className="text-center"
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                      fontSize: SIZES.font,
                      color: "white",
                    }}
                  >
                    Sell All to Vendors
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[48%]">
              <TouchableOpacity className="" onPress={clearData}>
                <View className="mt-4 bg-red-400  rounded-lg px-4 py-3">
                  <Text
                    className="text-center"
                    style={{
                      fontFamily: FONTS.JosefinSansBold,
                      fontSize: SIZES.font,
                      color: "white",
                    }}
                  >
                    Clear
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>}

        {data.length > 0 && <ScrollView horizontal={true} className="mr-4">

          <View className="mx-4 my-4 bg-white  pt-4 rounded-lg ">
            <View className="flex flex-row mb-4 px-4">
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.font
                }}
                className="text-center w-32"
              >
                Title
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.small
                }}
                className="text-center w-32"
              >
                HUNTSCORE
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.small
                }}
                className="text-center w-32"
              >
                AMAZON PROFIT
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.small
                }}
                className="text-center w-32"
              >
                SALES RANK
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.small
                }}
                className="text-center w-32"
              >
                AVE SALES RANK
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.small
                }}
                className="text-center w-16"
              >
                QTY.
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.small
                }}
                className="text-center w-32"
              >
                AMAZON PRICE
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: 14
                }}
                className="text-center w-96"
              >
                Vendors
              </Text>
            </View>
            {data.length > 0 &&
              data.map(
                (books, index) => <OfferCard
                  bg="bg-gray-200"
                  key={index}
                  books={books}
                  scoreState={scoreState}
                  index={index}
                  profitFBA={profitFBA}
                  shipping={shipping}
                  salesRank={salesRank}
                  ave={ave}
                  slaveEdit={slaveEdit}
                  price={price}
                  masterVendors={masterVendors[index]}
                  saveSlaveEdit={saveSlaveEdit}
                  isbn={data[index][0].book.isbn13.split(",")[0]}
                  selectionType={selectionType}
                  deleteBook={deleteBook}
                />)}
          </View>
        </ScrollView>}

      </ScrollView>
    </>
  )
}

export default BulkOffer