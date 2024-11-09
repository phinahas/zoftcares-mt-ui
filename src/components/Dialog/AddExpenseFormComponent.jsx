"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";

// components
import Autocomplete from "../Textfields/Autocomplete";
import SimpleButton from "../Buttons/SimpleButton";
import SimpleTextField from "../Textfields/TextField";
import FormDialog from "./formDialog";

export default function MaxWidthDialog({
  openState = false,
  changeOpenState,
  categories,
  labels,
  addEntryActn,
  addNewCategory,
}) {
  const [createdCategoryName, setCreatedCategoryName] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [date, setDate] = React.useState(null);

  const [formDialogState, setFormState] = React.useState(false);

  const openFormDialog = () => {
    setFormState(true);
  };

  const closeFormDialog = () => {
    setFormState(false);
  };

  const addExepnseBtn = () => {
    const expenseData = {
      category: selectedCategory,
      label: selectedLabel,
      title: title,
      remarks: description,
      date: date,
      amount: amount,
    };
    addEntryActn(expenseData);
  };

  const createANewCategoryFn = () => {
    addNewCategory({ category: createdCategoryName });
    setFormState(false);
  };

  return (
    <React.Fragment>
      <FormDialog
        openState={formDialogState}
        closeFn={closeFormDialog}
        textFieldLabel={"Category"}
        title="Add New Category"
        textFieldType={"text"}
        formSubmtFn={createANewCategoryFn}
        onChangeTextfield={setCreatedCategoryName}
      />
      <Dialog
        fullScreen
        fullWidth={true}
        maxWidth={"lg"}
        open={openState}
        onClose={changeOpenState}
        sx={{ fontFamily: "Poppins !important" }}
      >
        <DialogTitle
          marginBottom={1}
          sx={{
            fontFamily: "Poppins !important",
            fontSize: "16px",
            background: "#303737",
            color: "white",
          }}
        >
          <Typography>Add Expense</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                optionValues={categories}
                displayKey="name"
                label="Categories"
                onChangeFn={setSelectedCategory}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "15px",
              }}
            >
              <SimpleButton buttonName="Add new" onClickActn={openFormDialog} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <SimpleTextField label="Title" onChangeFn={setTitle} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                optionValues={labels}
                displayKey="name"
                label="Label"
                onChangeFn={setSelectedLabel}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <SimpleTextField label="Remarks" onChangeFn={setDescription} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <SimpleTextField label="Expense" onChangeFn={setAmount} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "15px",
              }}
            >
              <SimpleButton buttonName="Save" onClickActn={addExepnseBtn} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOpenState}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
