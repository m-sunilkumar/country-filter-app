import React, { useEffect, useState } from "react";

import { QueryForm, TableViewComponent } from "../index";
import "./styles.css";

export default function CountryMapper() {
  const [listData, setListData] = useState([]);

  return (
    <main className="container">
      <section className="header-wrapper">
        <QueryForm setFilterData={setListData} data={listData} />
      </section>
      <section className="table-list-wrapper">
        <TableViewComponent tableData={listData} />
      </section>
    </main>
  );
}
