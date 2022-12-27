import { useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "./helpers";
import { Pagination } from "./Pagination";
import "../css/billabilityplan.css";
import SaveIcon from "../images/saveicon.svg";
import Select from "react-select";

export const BillabilityPlanTable = ({
  columns,
  rows,
  rowsPerPage,
  isPagination,
  billableCategoryViews,
}) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  const printContent = (column, row) => {
    if (column.type == "icon") {
      return <img src={SaveIcon} alt="Save" width="15" height="15" />;
    } else if (column.type == "select") {
      console.log(billableCategoryViews);
      return <Select options={billableCategoryViews}></Select>;
    } else if (column.type == "date") {
      return <></>;
    } else return row[column.accessor];
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === "asc") {
                    return "⬆️";
                  }
                  return "⬇️";
                } else {
                  return "️↕️";
                }
              };
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  {column.accessor ? (
                    <>
                      <button onClick={() => handleSort(column.accessor)}>
                        {sortIcon()}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map((column) => {
              return (
                <th>
                  {column.accessor ? (
                    <>
                      <input
                        key={`${column.accessor}-search`}
                        type="search"
                        placeholder={`Search ${column.label}`}
                        value={filters[column.accessor]}
                        size={column.filterSize}
                        onChange={(event) =>
                          handleSearch(event.target.value, column.accessor)
                        }
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            console.log(1);
            return (
              <tr key={row.id} className="rowstyle">
                {columns.map((column) => {
                  if (column.format) {
                    return (
                      <td
                        key={column.accessor}
                        className="tdleftcontent"
                        size="10px"
                      >
                        {column.format(row[column.accessor])}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={column.accessor}
                      className="tdleftcontent"
                      size="10px"
                    >
                      {printContent(column, row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {isPagination ? (
        <>
          {count > 0 ? (
            <Pagination
              activePage={activePage}
              count={count}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          ) : (
            <p>No data found</p>
          )}
        </>
      ) : (
        <></>
      )}

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </>
  );
};
