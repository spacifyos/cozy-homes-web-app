import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/router";
import AmenitiesComponent from "@/components/Search/AmenitiesComponent";
import ListingCardComponent from "@/components/Search/ListingCardComponent";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
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

export { getServerSideProps };

const Search = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const amenitiesTarget = useRef();
  const queryId = _.get(router, ["query", "id"], "");
  const queryKey = _.get(router, ["query", "key"], "");

  const getListingTagOptionRequest = () =>
    dispatch(listingAction.getListingTagOptionRequest());
  const listingTagOptionData = useSelector((state) =>
    listingSelector.getListingTagOptionData(state),
  );
  const listingTagOptionDataLoading = useSelector((state) =>
    listingSelector.getListingTagOptionDataLoading(state),
  );

  const getListingPropertyRequest = (postData) =>
    dispatch(listingAction.getListingPropertyRequest(postData));
  const listingPropertyData = useSelector((state) =>
    listingSelector.getListingPropertyData(state),
  );
  const listingPropertyDataLoading = useSelector((state) =>
    listingSelector.getListingPropertyDataLoading(state),
  );

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

  const [currentPagination, setCurrentPagination] = useState(1);

  const amenitiesTag = listingSelector.getFacilityTag(listingTagOptionData);
  const generalTag = listingSelector.getGeneralTag(listingTagOptionData);

  useEffect(() => {
    if (!_.isEmpty(queryKey) && !_.isEmpty(queryId)) {
      setSelectedFilterParams((prevState) => {
        return {
          ...prevState,
          [queryKey]: _.isEqual(queryKey, "tags") ? [queryId] : queryId,
        };
      });
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(amenitiesTag)) {
      const formatFacilityTag = _.map(amenitiesTag, (item) => {
        return {
          ...item,
          ...{ isActive: false },
        };
      });

      setNewAmenitiesTag(formatFacilityTag);
    }
  }, [amenitiesTag]);

  useEffect(() => {
    if (!_.isEmpty(generalTag)) {
      const formatGeneralTag = _.map(generalTag, (item) => {
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
    const handleScroll = _.debounce(() => {
      const currentPosition = window.scrollY;
      setScrollTop(currentPosition >= 187 ? 10 : 187 - currentPosition);
    }, 1);

    window.addEventListener("scroll", handleScroll);

    return () => {
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

  const fetchListingProperty = (postData) => {
    getListingPropertyRequest(postData);
  };

  const onClickGeneralTag = (name, code) => {
    setSelectedFilterParams((prevState) => {
      const preTags = _.get(prevState, ["tags"], []);

      const updatedTags = _.includes(preTags, code)
        ? _.filter(preTags, (tag) => !_.isEqual(tag, code))
        : [...preTags, code];

      return {
        ...prevState,
        tags: updatedTags,
      };
    });

    setNewGeneralTag((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === name) {
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
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
      const preTags = _.get(prevState, ["tags"], []);

      const updatedTags = _.includes(preTags, code)
        ? _.filter(preTags, (tag) => !_.isEqual(tag, code))
        : [...preTags, code];

      return {
        ...prevState,
        tags: updatedTags,
      };
    });

    setNewAmenitiesTag((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === name) {
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
          };
        } else {
          return item;
        }
      });
    });
  };

  const onChangeKeywordValue = (e) => {
    setKeywordValue(e.target.value);
  };

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
  };

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

  const onClickToPropertyOverview = (id) => {
    router.push(`/property-overview/${id}`);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPagination(pageNumber);
  };

  return (
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

      {_.isEmpty(newGeneralTag) ? (
        false
      ) : (
        <TagComponent
          lists={newGeneralTag}
          onClickGeneralTag={onClickGeneralTag}
        />
      )}

      {/*<TagComponent lists={generalTag2} onClickGeneralTag={onClickSelectTag2} />*/}

      <div className="pb-4">
        <div className="w-full flex gap-5 pb-5">
          <div className="w-1/5" ref={amenitiesTarget}>
            <div
              className="fixed"
              style={{
                width: dimensions,
                top: scrollTop,
              }}
            >
              <AmenitiesComponent
                list={newAmenitiesTag}
                loading={listingTagOptionDataLoading}
                onClickSelectAmenities={onClickSelectAmenities}
              />
            </div>
          </div>

          <div className="w-4/5 pr-4">
            <div className="flex pb-5 justify-end">
              <CustomSelect
                hideDefaultOption
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
                {_.map(Array(6), (item, index) => (
                  <Skeleton width="100%" height={140} key={index} />
                ))}
              </div>
            ) : _.isEmpty(listingPropertyData) ? (
              <div
                className="flex items-center justify-center"
                style={{ height: "200%" }}
              >
                <CustomEmptyBox />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {_.map(listingPropertyData, (item, index) => (
                  <ListingCardComponent
                    key={index}
                    item={item}
                    t={t}
                    onClickToPropertyOverview={onClickToPropertyOverview}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <CustomPagination
          totalPages={15}
          currentPage={currentPagination}
          onPageChange={onPageChange}
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Search);
