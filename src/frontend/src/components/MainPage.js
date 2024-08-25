// src/components/MainPage.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { useTable } from "react-table";
import { useAuth } from "../context/AuthContext";
import "chart.js/auto";
import "../css/MainPage.css";

const MainPage = () => {
  const { user } = useAuth(); // Access user from AuthContext

  // Sample data for the bar chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  // Sample data for the table
  const tableData = React.useMemo(
    () => [
      { col1: "John Doe", col2: "john@example.com", col3: "Developer" },
      { col1: "Jane Smith", col2: "jane@example.com", col3: "Designer" },
      { col1: "Michael Johnson", col2: "michael@example.com", col3: "Manager" },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "col1" },
      { Header: "Email", accessor: "col2" },
      { Header: "Role", accessor: "col3" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <div className="dashboard">
      <h1>QC TEST WEB</h1>
      <div>
        <h2>Welcome, {user ? user.name : "Guest"}</h2> {/* Display user name */}
      </div>
      <div className="chart">
        <h2>Sales Overview</h2>
        <Bar data={data} />
      </div>
      <div className="table">
        <h2>User Information</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
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
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPage;
