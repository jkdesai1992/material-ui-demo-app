import React, { useState, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import CustomSlider from "../components/CustomSlider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SwitchButton from "../components/SwitchButton";

const startingRegion = [
  { label: "Poke Ball", price: 5 },
  { label: "Great Ball", price: 10 },
  { label: "Super Potion", price: 10 },
  { label: "Hyper Potion", price: 20 },
  { label: "Bag", price: 2 },
];

const initialState = {
  isNeedBag: false,
  quantity: 5,
  pokemonType: "",
};

const PlaceYourOrder = ({ isOpen, handleClose, handleAddToCart, fillData }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (fillData.pokemonType) {
      setFormData(fillData);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: event.target.type === "checkbox" ? checked : value,
    }));
  };

  const activeRegion = startingRegion.find(
    (p) => p.label === formData.pokemonType
  );

  const countRegion = useCallback(() => {
    if (formData.pokemonType && formData.quantity) {
      return Number(activeRegion.price) * Number(formData.quantity);
    }
  }, [formData.pokemonType, formData.quantity]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll="body"
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "60px",
          maxWidth: "488px",
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
        Place Your Order
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            color: "#889296",
            fontSize: "18px",
            fontWeight: "bold",
            paddingBottom: "24px",
            textAlign: "center",
          }}
        >
          We'll use this info to dominate the poke world! Muhahahahah
        </Typography>

        <FormControl
          variant="filled"
          fullWidth
          sx={{
            margin: "25px 0px",
          }}
        >
          <InputLabel>Choose Item</InputLabel>
          <Select
            name="pokemonType"
            value={formData.pokemonType}
            onChange={handleChange}
            placeholder="Choose Item"
          >
            {startingRegion.map((p) => (
              <MenuItem value={p.label} key={p.label}>
                {p.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CustomSlider
          min={0}
          max={10}
          name="quantity"
          value={formData.quantity}
          handleChange={handleChange}
        />
        <Typography fontSize="14px" textAlign="left">
          Select Quantity
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="20px 0px"
        >
          <Typography fontSize="16px" color="#00000099">
            I need a bag for that!
          </Typography>
          <SwitchButton
            name="isNeedBag"
            checked={formData.isNeedBag}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="18px" fontWeight="bold" color="#889296">
            Cost:
          </Typography>
          <Typography fontSize="18px" fontWeight="bold">
            $ {countRegion()}
          </Typography>
        </Stack>
        <Box textAlign="center">
          <Button
            variant="contained"
            disabled={!formData.pokemonType}
            onClick={() =>
              handleAddToCart({ ...formData, price: activeRegion.price })
            }
            sx={{
              fontSize: "14px",
              backgroundColor: "#FE5454",
              marginTop: "25px",
            }}
          >
            ADD TO CART
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default PlaceYourOrder;
