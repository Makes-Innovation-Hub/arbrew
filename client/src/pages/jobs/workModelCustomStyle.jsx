const workModelCustomStyle = {
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    boxShadow: "none",
    border: state.isFocused ? "0.063rem solid #1e75e5" : "0.063rem solid #ccc",
    borderRadius: "0.5rem",
    width: "35rem",
    background: "transparent",
    height: "5rem",
    fontSize: "1.8rem",
    lineHeight: "1.5",
    textAlign: "center",
    margin: "1.5rem 5rem 0 5rem",
    color: "#7c7c7c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: state.isFocused
      ? "#f2f2f2"
      : state.isSelected
      ? "#EFF6FF"
      : "transparent",
    color: state.isSelected ? "#06110A" : "#7c7c7c",
    cursor: "pointer",
    textAlign: "center",
    width: "19rem",
    margin: "auto",
    borderRadius: "0.313rem",
  }),

  menu: (provided) => ({
    ...provided,
    width: "35rem", // Adjust the width as needed
    maxHeight: "22rem", // Adjust the max height as needed
    overflowY: "auto",
    scrollbarWidth: "none",
    margin: "1rem 5rem",
    // marginLeft: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::-webkit-scrollbar": {
      width: "0", // Adjust the width of the scrollbar track
      background: "transparent", // Set the background color of the scrollbar track
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "#ccc", // Set the color of the scrollbar thumb
      // borderRadius: "0.5rem", // Set the border radius of the scrollbar thumb
      width: "0", // Adjust the width of the scrollbar track
      background: "transparent", // Set the background color of the scrollbar track
      display: "none",
    },
  }),
  menuList: (provided) => ({
    ...provided,
    width: "21rem",
    // maxHeight: "20rem",
    // height: "21rem",
    overflowY: "scroll",
    scrollbarWidth: "none",
    margin: "1rem 0rem 1rem 0",

    // "&::WebkitScrollbarThumb": {
    //   // backgroundColor: "#ccc", // Set the color of the scrollbar thumb
    //   // borderRadius: "0.5rem", // Set the border radius of the scrollbar thumb
    //   width: "0", // Adjust the width of the scrollbar track
    //   background: "transparent", // Set the background color of the scrollbar track
    //   display: "none",
    // },
    "&::WebkitScrollbar": {
      // backgroundColor: "#ccc", // Set the color of the scrollbar thumb
      // borderRadius: "0.5rem", // Set the border radius of the scrollbar thumb
      width: "0", // Adjust the width of the scrollbar track
      background: "transparent", // Set the background color of the scrollbar track
      display: "none",
    },
  }),
};

export default workModelCustomStyle;
