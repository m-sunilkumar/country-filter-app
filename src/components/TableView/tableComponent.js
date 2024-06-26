// src/TableComponent.js

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "./tableComponent.css";

const TableComponent = (props) => {
  const { tableData } = props;
  const headers = ["Country", "Code", "Ph Code", "Population", "Flag"];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.abbreviation}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.population}</TableCell>
              <TableCell>
                <img alt="flag" src={row.media.flag} className="flag-icon" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
