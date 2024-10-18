import Select from "react-select";

const CustomMultiSelect = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Select
      defaultValue={[]}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export default CustomMultiSelect;
