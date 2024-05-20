// src/HorizontalForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { filterDropdowns } from "../../utils";
import { GET_API_URL } from "../../utils";

//css
import "./queryForm.css";

const QueryForm = (props) => {
  const { setFilterData } = props;
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [originalList, setOriginalList] = useState([]);
  const [loader, setLoader] = useState(false);

  //we can also implement debounce here to reduce function calls
  const getFilterValue = (val, type) => {
    let filteredArr = [];
    const popValue = val.includes("1M")
      ? 1000000
      : val.includes("5M")
      ? 5000000
      : 10000000;
    if (type === "population") {
      filteredArr = originalList.filter((dt) => dt.population >= popValue);
    }

    if (type === "country") {
      filteredArr = originalList.filter(
        (dt) => dt.name.toLowerCase() === val.toLowerCase()
      );
    }

    setFilterData([...filteredArr]);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    getFilterValue(event.target.value, "country");
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    getFilterValue(event.target.value, "population");
  };

  const clearFilter = () => {
    setFilterValue("");
    setInputValue("");
    setFilterData([...originalList]);
  };

  // Get all country list by calling API
  const getListData = () => {
    axios
      .get(GET_API_URL)
      .then((res) => {
        setOriginalList([...res.data]);
        setLoader(false);
        setFilterData([...res.data]);
      })
      .catch((err) => {
        setLoader(false);
        throw new Error("Something went wrong");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    getListData();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="formWrap">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Country name"
          style={{ marginRight: "10px" }}
        />
        <select
          value={filterValue}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        >
          {filterDropdowns.map((item, i) => (
            <option key={item + i}>{item}</option>
          ))}
        </select>
        <span style={{ padding: "0 1em" }} onClick={clearFilter}>
          Clear
        </span>
        <button type="submit" className="button" onClick={handleSubmit}>
          Show All Countries
        </button>
      </form>
      {loader ? <div>Loading......</div> : ""}
    </>
  );
};

export default QueryForm;
