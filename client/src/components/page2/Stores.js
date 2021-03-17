import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useSelector } from "react-redux";
import { formatToIsraeliDate } from "../../helpers";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    padding: "10px",
  },
});

function Row(props) {
  const pickedCurrency = useSelector((state) => state.pickedCurrency);
  const { row } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let totalPrice = 0;
  row.history.forEach((item) => {
    totalPrice = totalPrice + item.priceUSD;
  });
  totalPrice = (Math.round(totalPrice * pickedCurrency * 100) / 100).toFixed(2);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.store}
        </TableCell>
        <TableCell align='left'>{row.history.length}</TableCell>
        <TableCell align='left'>{totalPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Items{" "}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Estimated delivery date</TableCell>
                    <TableCell align='left'>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.title}>
                      <TableCell component='th' scope='row'>
                        {historyRow.title}
                      </TableCell>
                      <TableCell>
                        {formatToIsraeliDate(historyRow.deliveryDate)}
                      </TableCell>
                      <TableCell align='left'>
                        {(
                          Math.round(
                            historyRow.priceUSD * pickedCurrency * 100
                          ) / 100
                        ).toFixed(2) + " "}
                        {pickedCurrency > 1 ? "₪" : "$"}
                      </TableCell>{" "}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ data }) {
  const pickedCurrency = useSelector((state) => state.pickedCurrency);
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead style={{ backgroundColor: "rgb(63, 81, 181)" }}>
          <TableRow>
            <TableCell />
            <TableCell style={{ color: "white" }}>
              <b>Store</b>
            </TableCell>
            <TableCell align='left' style={{ color: "white" }}>
              <b>Quantity</b>
            </TableCell>
            <TableCell align='left' style={{ color: "white" }}>
              <b>Total Price {pickedCurrency > 1 ? "₪" : "$"}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
