import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilters, useSortBy, useTable } from "react-table";
import "./InfoPage.css";
import { getProjects } from "./projectsSlice";
import {
  calculateAvgScore,
  calculatePercentageOfMadeDeadline,
} from "./projectsStats";

// this is the default component that is used to filter a given column
// a simple text box..
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <TextField
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// deadline column is of boolean value, so the default text based filter is not sufficient here..
function DeadlineColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <Select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || ""); // Set "" to remove the filter entirely
      }}
    >
      <MenuItem value={""}>All</MenuItem>
      <MenuItem value={"true"}>Yes</MenuItem>
      <MenuItem value={"false"}>No</MenuItem>
    </Select>
  );
}

function ProjectsTable({ columns, data }) {
  // uses react-table hook api to generate table
  const table = useTable(
    {
      columns,
      data,
      defaultColumn: {
        Filter: DefaultColumnFilter,
      },
    },
    useFilters,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    rows,
    prepareRow,
  } = table;

  return (
    <>
      <div className="cards-container">
        <div>
          <label>Average Score: </label>
          <span>{calculateAvgScore(rows.map((row) => row.values))}</span>
        </div>{" "}
        |
        <div>
          <label>Percentage Of Projects Made Deadline: </label>
          <span>
            {calculatePercentageOfMadeDeadline(rows.map((row) => row.values))}%
          </span>
        </div>
      </div>

      <Card>
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>

                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps({
                    style: {
                      background: getRowColor(row.values.score),
                    },
                  })}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </Card>
    </>
  );
}

// Change row color based on score
function getRowColor(score) {
  if (score < 70) {
    return "#e03e3e";
  } else if (score > 90) {
    return "#24d432";
  }
}

function ProjectsInfoPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData.personalDetails);
  const isProjectsInfoLoading = useSelector(
    (state) => state.projects.isLoading
  );
  const projectsData = useSelector((state) => state.projects.projects);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "Duration In Days",
        accessor: "durationInDays",
      },
      {
        Header: "Made Deadline",
        accessor: "madeDadeline",
        Cell: ({ value }) => <>{value ? "Yes" : "No"}</>,
        Filter: DeadlineColumnFilter,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div class="user-info">
            <Avatar src={userData.avatar} />
            <div className="user-info-section">
              <label>Name: </label>
              <span>{userData.name}</span>
            </div>
            |
            <div className="user-info-section">
              <label>Team: </label>
              <span>{userData.Team}</span>
            </div>
            |
            <div className="user-info-section">
              <label>Joined At: </label>
              <span>{userData.joinedAt}</span>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {isProjectsInfoLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <Card></Card>
          <ProjectsTable columns={columns} data={projectsData} />;
        </>
      )}
    </>
  );
}

export default ProjectsInfoPage;
