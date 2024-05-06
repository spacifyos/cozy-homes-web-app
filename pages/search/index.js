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

export { getServerSideProps };

const cityList = [
  { name: "Skudai", value: "skudai" },
  { name: "Kluang", value: "kluang" },
  { name: "Batu Pahat", value: "batu pahat" },
];

const Search = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const amenitiesTarget = useRef();

  const optionList = [
    {
      name: t("search.sortBy") + ": " + t("search.priceLowToHigh"),
      value: "Sort by: Price (Low to High)",
    },
    {
      name: t("search.sortBy") + ": " + t("search.priceHighToLow"),
      value: "Sort by: Price (High to Low)",
    },
  ];

  const getListingTagOptionRequest = () =>
    dispatch(listingAction.getListingTagOptionRequest());
  const listingTagOptionData = useSelector((state) =>
    listingSelector.getListingTagOptionData(state),
  );
  const listingTagOptionDataLoading = useSelector((state) =>
    listingSelector.getListingTagOptionDataLoading(state),
  );

  const getListingPropertyRequest = () =>
    dispatch(listingAction.getListingPropertyRequest());
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

  const amenitiesTag = listingSelector.getFacilityTag(listingTagOptionData);
  const generalTag = listingSelector.getGeneralTag(listingTagOptionData);

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
    if (!_.isEmpty(amenitiesTag)) {
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
    fetchListingProperty();
  }, []);

  const fetchListingTagOption = () => {
    getListingTagOptionRequest();
  };

  const fetchListingProperty = () => {
    getListingPropertyRequest();
  };

  const [generalTag2, setGeneralTag2] = useState([
    { name: "TARUMT", isActive: false },
    { name: "UTAR", isActive: false },
    { name: "ALFA", isActive: false },
    { name: "CATS", isActive: false },
    { name: "SUNWAY", isActive: false },
    { name: "INTI", isActive: false },
    { name: "UTM", isActive: false },
  ]);

  const onClickSelectTag = (tag) => {
    setNewGeneralTag((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === tag) {
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  };

  // const onClickSelectTag2 = (tag) => {
  //   setGeneralTag2((prevState) => {
  //     return _.map(prevState, (item) => {
  //       if (_.get(item, ["name"], "") === tag) {
  //         return {
  //           ...item,
  //           ...{ isActive: !_.get(item, ["isActive"], false) },
  //         };
  //       } else {
  //         return {
  //           ...item,
  //         };
  //       }
  //     });
  //   });
  // };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSelectAmenities = (name) => {
    setNewAmenitiesTag((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === name) {
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
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
        />

        <CustomInput placeholder={t("search.state")} />

        <CustomSelect placeholder={t("search.city")} optionList={cityList} />
      </div>

      {_.isEmpty(newGeneralTag) ? (
        false
      ) : (
        <TagComponent
          lists={newGeneralTag}
          onClickSelectTag={onClickSelectTag}
        />
      )}

      {/*<TagComponent lists={generalTag2} onClickSelectTag={onClickSelectTag2} />*/}

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
                list={newAmenitiesTag}
                onClickSelectAmenities={onClickSelectAmenities}
              />
            </div>
          </div>

          <div className="w-4/5 pr-4">
            <div className="flex pb-5 justify-end">
              <CustomSelect
                styles={{ width: "75%" }}
                optionList={optionList}
                placeholder={
                  t("search.sortBy") + ": " + t("search.priceLowToHigh")
                }
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
                  <ListingCardComponent key={index} item={item} t={t} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Search);
