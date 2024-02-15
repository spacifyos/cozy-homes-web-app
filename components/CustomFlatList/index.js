import FlatList from "flatlist-react";

const CustomFlatList = ({ itemList, renderItem, renderEmptyBox, ...props }) => {
  return (
    <FlatList
      {...props}
      list={itemList}
      renderItem={renderItem}
      renderWhenEmpty={renderEmptyBox}
      // groupBy="occupation.name"
      // sortBy="details.age"
      // searchBy="children.0.name"
    />
  );
};

export default CustomFlatList;
