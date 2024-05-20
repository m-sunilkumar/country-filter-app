// src/HorizontalForm.js

import React, { useEffect, useState } from "react";
import { filterDropdowns } from "../../utils";
import axios from "axios";
import { GET_API_URL } from "../../utils";

//css
import "./queryForm.css";
import TableViewComponent from "../TableView/tableViewComponent";

const QueryForm = (props) => {
  const { setFilterData } = props;
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [loader, setLoader] = useState(false);

  const getFilterValue = (val, type) => {
    let filteredArr = [];
    const popValue = val.split("")[0] * 1000000;
    if (type === "population") {
      filteredArr = filteredList.filter((dt, i) => dt.population >= popValue);
      setFilteredList([...filteredArr]);
    }
    if (type === "country") {
      filteredArr = filteredList.filter(
        (dt, i) => dt.name.toLowerCase() === val.toLowerCase()
      );
      setFilteredList([...filteredArr]);
    }
    setFilterData([...filteredArr]);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    getFilterValue(event.target.value, "country");
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    getFilterValue(event.target.value);
  };
  const clearFilter = () => {
    setFilterData([...filteredList]);
  };

  //get all country list by calling api
  const getListData = () => {
    axios
      .get(GET_API_URL)
      .then((res) => {
        setFilteredList([...res?.data]);
        setLoader(false);
        setFilterData([...res.data]);
      })
      .catch((err) => {
        setLoader(false);
        throw new Error("Something went wrong");
      });
  };

  //   useEffect(()=>{
  //     setFilterData([...filteredList]);
  //   })
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
        <button type="submit" className="button" onClick={handleSubmit}>
          Show All Countries
        </button>
      </form>
      {loader ? <div>Loading......</div> : ""}
    </>
  );
};

export default QueryForm;
