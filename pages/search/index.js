import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/router";
import AmenitiesComponent from "@/components/Search/AmenitiesComponent";
import ListingCardComponent from "@/components/Search/ListingCardComponent";
import { get, isEmpty, map, debounce, includes, filter, isEqual } from "lodash";
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

export { getServerSideProps };

const Search = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const amenitiesTarget = useRef();
  const queryId = get(router, ["query", "id"], "");
  const queryKey = get(router, ["query", "key"], "");

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

  const [isKeywordTyping, setIsKeywordTyping] = useState(false);
  const [isCityTyping, setIsCityTyping] = useState(false);
  const [dimensions, setDimensions] = useState(0);
  const [scrollTop, setScrollTop] = useState(187); //235
  const [newAmenitiesTag, setNewAmenitiesTag] = useState([]);
  const [newGeneralTag, setNewGeneralTag] = useState([]);
  const [keywordValue, setKeywordValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [sortValue, setSortValue] = useState("asc");
  const [selectedFilterParams, setSelectedFilterParams] = useState({
    sort: "rental",
  });

  const amenitiesTag = listingSelector.getFacilityTag(listingTagOptionData);
  const generalTag = listingSelector.getGeneralTag(listingTagOptionData);
  const hasMorePages = listingSelector.getHasMorePages(
    listingPropertyPagination,
  );
  const totalPage = listingSelector.getTotalPage(listingPropertyPagination);
  const currentPage = listingSelector.getCurrentPage(listingPropertyPagination);
  const lastPage = listingSelector.getLastPage(listingPropertyPagination);

  useEffect(() => {
    if (!isEmpty(queryKey) && !isEmpty(queryId)) {
      setSelectedFilterParams((prevState) => {
        return {
          ...prevState,
          [queryKey]: isEqual(queryKey, "tags") ? [queryId] : queryId,
        };
      });
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(amenitiesTag)) {
      const formatFacilityTag = map(amenitiesTag, (item) => {
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
    setSelectedFilterParams((prevState) => {
      const preTags = get(prevState, ["tags"], []);

      const updatedTags = includes(preTags, code)
        ? filter(preTags, (tag) => !isEqual(tag, code))
        : [...preTags, code];

      return {
        ...prevState,
        tags: updatedTags,
      };
    });

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
    setSelectedFilterParams((prevState) => {
      const preTags = get(prevState, ["tags"], []);

      const updatedTags = includes(preTags, code)
        ? filter(preTags, (tag) => !isEqual(tag, code))
        : [...preTags, code];

      return {
        ...prevState,
        tags: updatedTags,
      };
    });

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

  const handleKeywordTypingStopped = useCallback(() => {
    setIsKeywordTyping(false);
    onClickSubmitKeyword();
  }, [keywordValue]);

  useEffect(() => {
    if (isKeywordTyping) {
      const handler = setTimeout(() => {
        handleKeywordTypingStopped();
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [keywordValue, isKeywordTyping, handleKeywordTypingStopped]);

  const onClickSubmitKeyword = () => {
    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        search: keywordValue,
      };
    });
  };

  const onChangeStateValue = (e) => {
    setStateValue(e.target.value);

    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        state: e.target.value,
      };
    });
  };

  const onChangeCityValue = (e) => {
    setCityValue(e.target.value);
    setIsCityTyping(true);
  };

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

  const onChangeSortValue = (e) => {
    setSortValue(e.target.value);

    setSelectedFilterParams((prevState) => {
      return {
        ...prevState,
        direction: e.target.value,
      };
    });
  };

  const onPageChange = (pageNumber) => {
    fetchListingProperty(selectedFilterParams, pageNumber, 12);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Spacify Listing - Spacify Asia" />

      <DesktopLayout hideNav>
        <div className="container mx-auto flex-1 py-10">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-3">
              <DesktopSearchBar />
            </div>
            <div className="col-span-9">
              <DesktopListingSection
                t={t}
                listingPropertyDataLoading={listingPropertyDataLoading}
                listingPropertyData={listingPropertyData}
                lastPage={lastPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
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

      <CustomHeader
        pageTitle={t("pageTitle.search")}
        hideBgImage
        hideRightButton
        onClickGoBack={onClickGoBack}
      >
        <div className="grid grid-cols-4 gap-2 pb-5 global-horizontal-padding">
          <CustomInput
            rightIcon={Images.searchOutlineActiveIcon}
            className="col-span-2"
            placeholder={t("search.keyword")}
            value={keywordValue}
            onChange={onChangeKeywordValue}
            onClickRightIcon={onClickSubmitKeyword}
          />

          <CustomSelect
            placeholder={t("search.state")}
            optionList={Constant.STATE_CODE}
            onChange={onChangeStateValue}
            value={stateValue}
          />

          <CustomInput
            placeholder={t("search.city")}
            value={cityValue}
            onChange={onChangeCityValue}
            onClickRightIcon={onClickSubmitCity}
          />
        </div>

        {isEmpty(newGeneralTag) ? (
          false
        ) : (
          <TagComponent
            lists={newGeneralTag}
            onClickGeneralTag={onClickGeneralTag}
          />
        )}

        {/*<TagComponent lists={generalTag2} onClickGeneralTag={onClickSelectTag2} />*/}

        <div className="pb-4">
          <div className="w-full flex gap-5">
            <div className="w-1/5" ref={amenitiesTarget}>
              <div
                className="fixed"
                style={{
                  width: dimensions,
                  top: scrollTop,
                }}
              >
                <AmenitiesComponent
                  data={newAmenitiesTag}
                  loading={listingTagOptionDataLoading}
                  onClickSelectAmenities={onClickSelectAmenities}
                />
              </div>
            </div>

            <div className="w-4/5 pr-4">
              <div className="flex pb-5 justify-end">
                <CustomSelect
                  hideDefaultOption
                  selectClassName="select-sm min-h-10"
                  styles={{ width: "75%" }}
                  optionList={[
                    {
                      name:
                        t("search.sortBy") + ": " + t("search.priceLowToHigh"),
                      value: "asc",
                    },
                    {
                      name:
                        t("search.sortBy") + ": " + t("search.priceHighToLow"),
                      value: "desc",
                    },
                  ]}
                  onChange={onChangeSortValue}
                  value={sortValue}
                  // placeholder={
                  //   t("search.sortBy") + ": " + t("search.priceLowToHigh")
                  // }
                />
              </div>

              {listingPropertyDataLoading ? (
                <div className="grid grid-cols-2 gap-3">
                  {map(Array(6), (item, index) => (
                    <Skeleton width="100%" height={140} key={index} />
                  ))}
                </div>
              ) : isEmpty(listingPropertyData) ? (
                <div
                  className="flex items-center justify-center"
                  style={{ height: "200%" }}
                >
                  <CustomEmptyBox />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {map(listingPropertyData, (item, index) => (
                    <ListingCardComponent key={index} item={item} t={t} />
                  ))}
                </div>
              )}
            </div>
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
      </CustomHeader>
    </div>
  );
};

export default withTranslation("common")(Search);
