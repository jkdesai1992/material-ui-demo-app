import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StackContainer = ({ title, value }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 0px"
    >
      <Typography fontSize="16px" color="#00000099">
        {title}
      </Typography>
      <Typography fontSize="16px" color="#00000099">
        {value}
      </Typography>
    </Stack>
  );
};

const DisplayFillData = ({ isOpen, handleClose, formData }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll="body"
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "60px",
          width: "488px",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#FE5454",
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Display data
      </DialogTitle>

      <DialogContent>
        <StackContainer title="Full Name" value={formData.fullName} />
        <StackContainer title="Code Name" value={formData.codeName} />
        <StackContainer title="Pokemon Center" value={formData.pokemonCenter} />
        <StackContainer title="Region" value={formData.region} />
        <StackContainer
          title="Starter Pokemon"
          value={formData.starterPokemon}
        />
        {formData.packList.length > 0 && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Pokemon Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Need Bag</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.packList.map((row, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{row.pokemonType}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.isNeedBag.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default DisplayFillData;
