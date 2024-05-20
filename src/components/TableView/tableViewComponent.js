// src/ReactTableComponent.js

import React from "react";
import { useTable } from "react-table";

//import css
import "./tableViewComponent.css";

const TableViewComponent = (props) => {
  const { tableData } = props;
  const data = React.useMemo(() => [...tableData], []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Country Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Code",
        accessor: "abbreviation",
      },
      {
        Header: "Capital",
        accessor: "capital", // accessor is the "key" in the data
      },
      {
        Header: "Ph Code",
        accessor: "phone",
      },
      {
        Header: "Population",
        accessor: "population", // accessor is the "key" in the data
      },
      {
        Header: "Flag",
        accessor: "flag",
      },
      {
        Header: "Emblum",
        accessor: "emblum",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ border: "solid 1px blue", width: "100%" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="tableHeader">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="tableRow">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableViewComponent;
