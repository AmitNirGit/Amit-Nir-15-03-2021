import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import {
  addToArchive,
  removeFromArchive,
  removeItem,
  addNewItem,
} from "../../actions";
import { formatToIsraeliDate } from "../../helpers";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable({ data, mainPage }) {
  const rows = data;
  const currencyRate = useSelector((state) => state.pickedCurrency);
  const dispatch = useDispatch();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addToArchiveHandler = (item) => {
    dispatch(removeItem(item));
    dispatch(addToArchive(item));
  };

  const removeFromArchiveHandler = (item) => {
    dispatch(removeFromArchive(item));
    dispatch(addNewItem(item));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='custom pagination table'>
        <TableHead style={{ backgroundColor: "#3f51b5" }}>
          <TableRow style={{}}>
            <TableCell
              key={"title"}
              align='left'
              style={{ color: "white", width: 160 }}>
              Item Name
            </TableCell>
            <TableCell
              key={"store"}
              align='right'
              style={{ color: "white", width: 160 }}>
              Store
            </TableCell>
            <TableCell
              key={"price"}
              align='right'
              style={{ color: "white", width: 160 }}>
              Price {currencyRate > 1 ? "₪" : "$"}
            </TableCell>
            <TableCell
              key={"delivery"}
              align='right'
              style={{ color: "white", width: 160 }}>
              Delivery Date
            </TableCell>
            <TableCell
              key={"archive"}
              align='right'
              style={{ color: "white", width: 160 }}>
              action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.title}>
              <TableCell component='th' scope='row'>
                {row.title}
              </TableCell>
              <TableCell style={{ width: 160 }} align='right'>
                {row.store}
              </TableCell>
              <TableCell style={{ width: 160 }} align='right'>
                {(Math.round(row.priceUSD * currencyRate * 100) / 100).toFixed(
                  2
                )}
              </TableCell>
              <TableCell style={{ width: 160 }} align='right'>
                {formatToIsraeliDate(row.deliveryDate)}
              </TableCell>
              <TableCell style={{ width: 160 }} align='right'>
                {mainPage === "home" ? (
                  <StyledButton
                    onClick={() => {
                      addToArchiveHandler(row);
                    }}
                    style={{
                      marginLeft: "auto",
                      marginRight: "0.1vw",
                      height: "fit-content",
                    }}>
                    Archive
                    <ArchiveIcon
                      style={{ fontSize: "1.3em", marginLeft: "0.5vw" }}
                    />{" "}
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => {
                      removeFromArchiveHandler(row);
                    }}
                    style={{
                      marginLeft: "auto",
                      marginRight: "0.1vw",
                      height: "fit-content",
                    }}>
                    Unarchive
                    <UnarchiveIcon
                      style={{ fontSize: "1.3em", marginLeft: "0.5vw" }}
                    />{" "}
                  </StyledButton>
                )}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export const StyledButton = styled.div`
  /* position: absolute; */
  background-color: rgba(10, 12, 19, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 10px;
  margin: 2vh 0;
  border-radius: 5px;
  font-size: 1.2em;
  color: white;
  /* bottom: -10vh; */
  /* left: 2vw; */
  box-shadow: 0 2px 3px 2px rgba(10, 12, 19, 0.35);
  cursor: pointer;
  transition: 0.1s ease-in-out;

  :hover {
    transform: translate(4px, 0);
  }
`;
