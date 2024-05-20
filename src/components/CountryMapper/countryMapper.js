import React, { useState } from "react";

import { QueryForm } from "../index";
import TableComponent from "../TableView/tableComponent";
import "./styles.css";

export default function CountryMapper() {
  const [listData, setListData] = useState([]);
  return (
    <main className="container">
      <section className="header-wrapper">
        <QueryForm setFilterData={setListData} data={listData} />
      </section>
      <section className="table-list-wrapper">
        <TableComponent tableData={listData} />
      </section>
    </main>
  );
}
