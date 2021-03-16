import React, { useState, useEffect } from "react";
import { get, post } from "../../network";
import { useSelector } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ItemModal from "./ItemModal";
import Table from "./Table";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import styled from "styled-components";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    paper: {
      width: "35%",
      height: "40%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 2),
    },
  })
);

export default function Home() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton
        onClick={handleOpen}
        style={{
          marginLeft: "auto",
          marginRight: "0.1vw",
          height: "fit-content",
        }}>
        Add Item
        <AddCircleIcon
          style={{ fontSize: "1.3em", marginLeft: "0.5vw" }}
        />{" "}
      </StyledButton>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <ItemModal closeModal={handleClose} />
          </div>
        </Fade>
      </Modal>
      <Table />
    </div>
  );
}

export const StyledButton = styled.div`
  /* position: absolute; */
  background-color: rgb(22, 121, 30);
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
  box-shadow: 0 4px 4px 2px rgba(10, 12, 19, 0.78);
  cursor: pointer;
  transition: 0.1s ease-in-out;

  :hover {
    transform: translate(4px, 0);
  }
`;
