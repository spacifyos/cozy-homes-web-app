import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/router";
import AmenitiesComponent from "@/components/Search/AmenitiesComponent";
import ListingCardComponent from "@/components/Search/ListingCardComponent";
import {
  get,
  isEmpty,
  map,
  debounce,
  includes,
  filter,
  isEqual,
  size,
  remove,
  toArray,
  split,
  concat,
  first,
  set,
} from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "@/components/Skeleton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import TagComponent from "@/components/Search/TagComponent";
import * as listingSelector from "@/src/selectors/listing";
import * as listingAction from "@/src/actions/listing";
import { useDispatch, useSelector } from "react-redux";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import Constant from "@/src/utils/Constant";
import CustomPagination from "@/components/CustomPagination";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopSearchBar from "@/components/Search/DesktopSearchBar";
import DesktopListingSection from "@/components/Search/DesktopListingSection";
import SpacifyMap from "@/components/PropertyOverview/SpacifyMap";
import DesktopFilterModal from "@/components/Search/DesktopFilterModal";
import Helper from "@/src/utils/Helper";
import * as commonSelector from "@/src/selectors/common";
import CustomText from "@/components/CustomText";
import { getListing } from "@/src/selectors/listing";
import CustomImage from "@/components/CustomImage";

export { getServerSideProps };

const Search = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const amenitiesTarget = useRef();

  const queryKeyword = get(router, ["query", "keyword"], "");
  const queryState = get(router, ["query", "state"], "");
  const queryCity = get(router, ["query", "city"], "");

  // const formatQueryTags = split(queryTags, ",");

  const getListingTagOptionRequest = () =>
    dispatch(listingAction.getListingTagOptionRequest());
  const listingTagOptionData = useSelector((state) =>
    listingSelector.getListingTagOptionData(state),
  );
  const listingTagOptionDataLoading = useSelector((state) =>
    listingSelector.getListingTagOptionDataLoading(state),
  );

  const getListingPropertyRequest = (postData, page, perPage) =>
    dispatch(listingAction.getListingPropertyRequest(postData, page, perPage));
  const listingPropertyData = useSelector((state) =>
    listingSelector.getListingPropertyData(state),
  );
  const listingPropertyDataLoading = useSelector((state) =>
    listingSelector.getListingPropertyDataLoading(state),
  );
  const listingPropertyPagination = useSelector((state) =>
    listingSelector.getListingPropertyPagination(state),
  );

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const stateOption = commonSelector.getState(selectOptionData);
  const listingData = listingSelector.getListing(listingPropertyData);

  const [isKeywordTyping, setIsKeywordTyping] = useState(false);
  const [isCityTyping, setIsCityTyping] = useState(false);
  const [dimensions, setDimensions] = useState(0);
  const [scrollTop, setScrollTop] = useState(187); //235
  const [newAmenitiesTag, setNewAmenitiesTag] = useState([]);
  const [newGeneralTag, setNewGeneralTag] = useState([]);
  const [newSortTag, setNewSortTag] = useState([
    { name: "Lowest Price", code: "asc", isActive: false },
    { name: "Highest Price", code: "desc", isActive: false },
  ]);

  const [keywordValue, setKeywordValue] = useState(queryKeyword);
  const [cityValue, setCityValue] = useState(queryCity);
  const [stateValue, setStateValue] = useState(queryState);
  const [tenureValue, setTenureValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [spaceTypeValue, setSpaceTypeValue] = useState("");
  const [genderValue, setGenderValue] = useState("");

  const [selectedFilterParams, setSelectedFilterParams] = useState({
    sort: "rental",
  });

  const amenitiesTag = listingSelector.getFacilityTag(listingTagOptionData);
  const generalTag = listingSelector.getGeneralTag(listingTagOptionData);
  const genderTag = listingSelector.getGenderTag(listingTagOptionData);
  const tenureTag = listingSelector.getTenureTag(listingTagOptionData);
  const spaceTypeTag = listingSelector.getSpaceType(listingTagOptionData);

  const hasMorePages = listingSelector.getHasMorePages(
    listingPropertyPagination,
  );
  const totalPage = listingSelector.getTotalPage(listingPropertyPagination);
  const currentPage = listingSelector.getCurrentPage(listingPropertyPagination);
  const lastPage = listingSelector.getLastPage(listingPropertyPagination);

  const isFilter = !isEmpty(selectedFilterParams);

  // useEffect(() => {
  //   if (!isEmpty(queryKey) && !isEmpty(queryId)) {
  //     setSelectedFilterParams((prevState) => {
  //       return {
  //         ...prevState,
  //         tags: isEmpty(queryTags) ? "" : formatQueryTags,
  //         [queryKey]:
  //           isEqual(queryId, "car_park") || isEqual(queryId, "sublet")
  //             ? queryId
  //             : size(queryId) > 1
  //               ? split(queryId, ",")
  //               : queryId,
  //       };
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (!isEmpty(amenitiesTag)) {
      const formatFacilityTag = map(amenitiesTag, (item) => {
        const code = get(item, ["code"], "");

        return {
          ...item,
          ...{ isActive: false },
        };
      });

      setNewAmenitiesTag(formatFacilityTag);
    }
  }, [amenitiesTag]);

  useEffect(() => {
    if (!isEmpty(generalTag)) {
      const formatGeneralTag = map(generalTag, (item) => {
        return {
          ...item,
          ...{ isActive: false },
        };
      });

      setNewGeneralTag(formatGeneralTag);
    }
  }, [generalTag]);

  useEffect(() => {
    if (amenitiesTarget.current) {
      setDimensions(amenitiesTarget.current.offsetWidth);
    }
  }, [amenitiesTarget]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentPosition = typeof window != "undefined" && window.scrollY;
      setScrollTop(currentPosition >= 187 ? 10 : 187 - currentPosition);
    }, 1);

    typeof window != "undefined" &&
      window.addEventListener("scroll", handleScroll);

    return () => {
      typeof window != "undefined" &&
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchListingTagOption();
  }, []);

  useEffect(() => {
    fetchListingProperty(selectedFilterParams);
  }, [selectedFilterParams]);

  const fetchListingTagOption = () => {
    getListingTagOptionRequest();
  };

  const fetchListingProperty = (postData, page = 1, perPage = 12) => {
    getListingPropertyRequest(postData, page, perPage);
  };

  const onClickGeneralTag = (name, code) => {
    setNewGeneralTag((prevState) => {
      return map(prevState, (item) => {
        if (get(item, ["name"], "") === name) {
          return {
            ...item,
            ...{ isActive: !get(item, ["isActive"], false) },
          };
        } else {
          return item;
        }
      });
    });
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSelectAmenities = (name, code) => {
    setNewAmenitiesTag((prevState) => {
      return map(prevState, (item) => {
        if (get(item, ["name"], "") === name) {
          return {
            ...item,
            ...{ isActive: !get(item, ["isActive"], false) },
          };
        } else {
          return item;
        }
      });
    });
  };

  const onChangeKeywordValue = (e) => {
    setKeywordValue(e.target.value);
    setIsKeywordTyping(true);
  };

  // const handleKeywordTypingStopped = useCallback(() => {
  //   setIsKeywordTyping(false);
  //   onClickSubmitKeyword();
  // }, [keywordValue]);

  // useEffect(() => {
  //   if (isKeywordTyping) {
  //     const handler = setTimeout(() => {
  //       handleKeywordTypingStopped();
  //     }, 1000);
  //
  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }
  // }, [keywordValue, isKeywordTyping, handleKeywordTypingStopped]);

  const onClickSubmitKeyword = () => {
    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        search: keywordValue,
      };
    });
  };

  // const onChangeStateValue = (e) => {
  //   setStateValue(e.target.value);
  //
  //   setSelectedFilterParams((prevState) => {
  //     return {
  //       ...prevState,
  //       state: e.target.value,
  //     };
  //   });
  // };

  // const onChangeCityValue = (e) => {
  //   setCityValue(e.target.value);
  //   setIsCityTyping(true);
  // };

  const handleCityTypingStopped = useCallback(() => {
    setIsCityTyping(false);
    onClickSubmitCity();
  }, [cityValue]);

  useEffect(() => {
    if (isCityTyping) {
      const handler = setTimeout(() => {
        handleCityTypingStopped();
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [cityValue, isCityTyping, handleCityTypingStopped]);

  const onClickSubmitCity = () => {
    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        city: cityValue,
      };
    });
  };

  const onPageChange = (pageNumber) => {
    fetchListingProperty(selectedFilterParams, pageNumber, 12);
  };

  const onClickOpenModal = () => {
    Helper.documentGetElementById("desktop_filter_modal").showModal();
  };

  const onChangeTenurePeriod = (e) => {
    setTenureValue(e.target.value);

    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        ["tenure_period"]: e.target.value,
      };
    });
  };

  const onThumbDragEnd = () => {
    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        ["min_price"]: priceRange[0],
        ["max_price"]: priceRange[1],
      };
    });
  };

  const onClickApply = () => {
    const generalTagValue = map(
      filter(newGeneralTag, (item) => get(item, ["isActive"], false)),
      (generalTag) => {
        return get(generalTag, ["code"], "");
      },
    );

    const amenitiesTagValue = map(
      filter(newAmenitiesTag, (item) => get(item, ["isActive"], false)),
      (amenitiesTag) => {
        return get(amenitiesTag, ["code"], "");
      },
    );

    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        state: isEmpty(stateValue) ? "" : stateValue,
        city: isEmpty(cityValue) ? "" : cityValue,
        direction: isEmpty(sortValue) ? "" : sortValue,
        space_type: isEmpty(spaceTypeValue) ? "" : spaceTypeValue,
        tenure_period: isEmpty(tenureValue) ? "" : tenureValue,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        tags:
          isEmpty(generalTagValue) && isEmpty(amenitiesTagValue)
            ? ""
            : concat(generalTagValue, amenitiesTagValue),
        gender: isEmpty(genderValue) ? "" : genderValue,
      };
    });

    Helper.documentGetElementById("desktop_filter_modal").close();
  };

  const onClickClearAll = () => {
    setStateValue("");
    setCityValue("");
    setSpaceTypeValue("");
    setTenureValue("");
    setPriceRange([0, 10000]);
    setGenderValue("");
    setSortValue("");

    setNewGeneralTag((prevState) => {
      return map(prevState, (item) => {
        return {
          ...item,
          ...{ isActive: false },
        };
      });
    });

    setNewAmenitiesTag((prevState) => {
      return map(prevState, (item) => {
        return {
          ...item,
          ...{ isActive: false },
        };
      });
    });
  };

  const onClickCloseFilterModal = () => {
    const {
      state,
      city,
      direction,
      space_type,
      tenure_period,
      minPrice = 0,
      maxPrice = 10000,
      tags,
      gender,
    } = selectedFilterParams;

    setStateValue(state);
    setCityValue(city);
    setTenureValue(tenure_period);
    setSpaceTypeValue(space_type);
    setPriceRange([minPrice, maxPrice]);
    setGenderValue(gender);
    setSortValue(direction);

    map(tags, (tag) => {
      setNewGeneralTag((prevState) => {
        return map(prevState, (item) => {
          const code = get(item, ["code"], "");

          if (isEqual(code, tag)) {
            console.log(tag, code);
            return {
              ...item,
              ...{ isActive: true },
            };
          } else {
            return item;
          }
        });
      });

      setNewAmenitiesTag((prevState) => {
        return map(prevState, (item) => {
          const code = get(item, ["code"], "");

          if (isEqual(code, tag)) {
            return {
              ...item,
              ...{ isActive: true },
            };
          } else {
            return item;
          }
        });
      });
    });
  };

  // const src = `https://app.proptechai.bot/js/widget/8fbmuzfis3duu3i4/float.js`;
  //
  // useEffect(() => {
  //   const checkScript = Helper.documentGetElementById(src);
  //   const chatContainer = document.body;
  //   const script = document.createElement("script");
  //
  //   if (checkScript) {
  //     return router.reload();
  //   }
  //
  //   script.id = src;
  //   script.async = true;
  //   script.defer = true;
  //   script.src = src;
  //
  //   chatContainer.appendChild(script);
  // }, []);

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo
        title={`Discover spaces for your needs in room listing | Spacify.asia`}
        description={`Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!`}
        canonical={process.env.DOMAIN}
        openGraph={{
          url: process.env.DOMAIN,
          title: `Discover spaces for your needs in room listing | Spacify.asia}`,
          description: `Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!`,
          images: [
            {
              url: Images.logoImage,
              width: 800,
              height: 600,
              alt: `Spacify Image`,
            },
          ],
          siteName: `${process.env.DOMAIN}`,
        }}
      />

      <a
        target="_blank"
        href={`https://wa.me/+601137354267`}
        className="fixed bottom-10 right-6 z-10"
      >
        <CustomImage src={Images.whatsappIcon} className="w-10 h-10" />
      </a>

      <DesktopLayout
        hideNav
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/"}>
                  <CustomText textClassName="text-base disable-text">
                    Explore
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="text-base">Room Listing</CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="container mx-auto flex-1 xl:pb-8 lg:pb-8 md:pb-8 sm:pb-8 pb-8">
          <DesktopSearchBar
            onClickOpenModal={onClickOpenModal}
            keywordValue={keywordValue}
            onChangeKeywordValue={onChangeKeywordValue}
            setTenureValue={setTenureValue}
            tenureTag={tenureTag}
            tenureValue={tenureValue}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            onClickSubmitKeyword={onClickSubmitKeyword}
            onChangeTenurePeriod={onChangeTenurePeriod}
            onThumbDragEnd={onThumbDragEnd}
            isFilter={isFilter}
          />

          <div className="grid grid-cols-5 gap-10 pb-2">
            <div className="xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 col-span-5">
              <DesktopListingSection
                t={t}
                listingPropertyDataLoading={listingPropertyDataLoading}
                listingPropertyData={listingData}
                lastPage={lastPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
            {/*<div className="xl:col-span-3 lg:col-span-3 md:col-span-4 sm:col-span-4">*/}
            {/*  <SpacifyMap />*/}
            {/*</div>*/}
          </div>

          {lastPage > 1 ? (
            <CustomPagination
              totalPages={lastPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
              disableNext={currentPage === lastPage}
              disablePrevious={currentPage === 1}
            />
          ) : (
            false
          )}
        </div>
      </DesktopLayout>

      <DesktopFilterModal
        sortValue={sortValue}
        setSortValue={setSortValue}
        newSortTag={newSortTag}
        amenities={newAmenitiesTag}
        onClickSelectAmenities={onClickSelectAmenities}
        onClickGeneralTag={onClickGeneralTag}
        newGeneralTag={newGeneralTag}
        genderTag={genderTag}
        stateOption={stateOption}
        setStateValue={setStateValue}
        stateValue={stateValue}
        cityValue={cityValue}
        setCityValue={setCityValue}
        onClickSubmitCity={onClickSubmitCity}
        spaceTypeTag={spaceTypeTag}
        spaceTypeValue={spaceTypeValue}
        setSpaceTypeValue={setSpaceTypeValue}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        tenureTag={tenureTag}
        setTenureValue={setTenureValue}
        tenureValue={tenureValue}
        genderValue={genderValue}
        setGenderValue={setGenderValue}
        onClickApply={onClickApply}
        onClickClearAll={onClickClearAll}
        onClickCloseFilterModal={onClickCloseFilterModal}
      />
    </div>
  );
};

export default withTranslation("common")(Search);
