import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField, Typography } from "@mui/material";
import CustomSlider from "../components/CustomSlider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlaceYourOrder from "./PlaceYourOrder";
import SelectStarterPokemon from "../components/SelectStarterPokemon";
import { Images } from "../helper/ImageHelper";
import DisplayFillData from "./DisplayFillData";

const initialState = {
  fullName: "",
  codeName: "",
  region: "",
  pokemonCenter: 60,
  packList: [],
  starterPokemon: "",
};

const PokemonJourney = () => {
  const [formData, setFormData] = useState(initialState);
  const [fillData, setData] = useState({});
  const [formError, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [openDisplayFillData, setOpenDisplayFillData] = useState(false);

  const startingRegion = [
    {
      id: "kanto1",
      name: "Kanto",
      pokemonTypes: [
        { id: "bulbasaur1", name: "Bulbasaur", image: Images.Bulbasaur },
        { id: "charmander1", name: "Charmander", image: Images.Charmander },
        { id: "squirtle1", name: "Squirtle", image: Images.Squirtle },
      ],
    },
    {
      id: "jhoto1",
      name: "Jhoto",
      pokemonTypes: [
        { id: "chikorit1", name: "Chikorita", image: Images.Chikorita },
        { id: "cyndaquil1", name: "Cyndaquil", image: Images.Cyndaquil },
        { id: "totodyle1", name: "Totodyle", image: Images.Totodyle },
      ],
    },
    {
      id: "hoenn1",
      name: "Hoenn",
      pokemonTypes: [
        { id: "treeko1", name: "Treeko", image: Images.Treeko },
        { id: "torchik1", name: "Torchik", image: Images.Torchik },
        { id: "mudkip1", name: "Mudkip", image: Images.Mudkip },
      ],
    },
  ];

  const formValidate = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value || value.trim() === "") {
          return "Full name is required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  const handleChange = useCallback((event) => {
    const { name, value, checked, type } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((formError) => ({
      ...formError,
      [name]: formValidate(name, value),
    }));
  }, []);

  const handleSubmit = async () => {
    let validationErrors = {};
    Object.keys(formData).forEach((name) => {
      const error = formValidate(name, formData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setOpenDisplayFillData(true);
  };

  const handleAddToCart = (val) => {
    const cloneData = [...formData.packList];
    const index = cloneData.findIndex((p) => p.pokemonType === val.pokemonType);
    if (index !== -1) {
      cloneData[index] = val;
      setFormData((formData) => ({
        ...formData,
        packList: cloneData,
      }));
      setData({});
    } else {
      setFormData((formData) => ({
        ...formData,
        packList: [...formData.packList, val],
      }));
    }
    setOpen(false);
  };

  const getActivePokemonDetails = useCallback(() => {
    return startingRegion.find((p) => p.name === formData.region);
  }, [formData.region]);

  const totalCost = useCallback(() => {
    return formData.packList.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  }, [formData.packList]);

  return (
    <div>
      <Dialog
        open={true}
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
            textAlign: "center",
            color: "#FE5454",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Fill This Form
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: "#889296",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: "24px",
            }}
          >
            We'll use this info to dominate the poke world! Muhahahahah
          </Typography>

          <TextField
            id="full-name"
            fullWidth
            autoFocus
            error={formError.fullName ? true : false}
            margin="dense"
            label="Full Name"
            variant="filled"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            helperText={formError.fullName}
          />

          <TextField
            id="code-name"
            fullWidth
            margin="dense"
            label="Code Name"
            variant="filled"
            name="codeName"
            value={formData.codeName}
            onChange={handleChange}
          />

          <CustomSlider
            min={0}
            max={100}
            name="pokemonCenter"
            value={formData.pokemonCenter}
            handleChange={handleChange}
          />

          <Typography fontSize="14px">
            How far is your nearest pokemon center? (In KMs)
          </Typography>

          <FormControl
            variant="filled"
            fullWidth
            sx={{
              margin: "25px 0px",
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              What's your starting region?
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.region}
              name="region"
              onChange={handleChange}
              placeholder="What's your starting region?"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {startingRegion.map((p) => (
                <MenuItem value={p.name} key={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <SelectStarterPokemon
            activePokemonDetails={getActivePokemonDetails()}
            handleChange={handleChange}
            value={formData.starterPokemon}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="25px 0px"
          >
            <Typography fontSize="16px">What do you want to pack?</Typography>
            <AddCircleIcon
              onClick={() => setOpen(true)}
              style={{ fontSize: 40, color: "#FE5454", cursor: "pointer" }}
            />
          </Stack>

          <Stack
            direction="row"
            sx={{ maxWidth: 440, overflow: "auto", display: "block" }}
          >
            {formData.packList.map((item, index) => (
              <Chip
                key={index}
                label={`${item.quantity} ${item.pokemonType}`}
                onClick={() => {
                  setData(item);
                  setOpen(true);
                }}
                sx={{ margin: "5px 5px 5px 0px" }}
                onDelete={() => {
                  let cloneList = [...formData.packList]; // make a separate copy of the array
                  cloneList.splice(index, 1);
                  setFormData((formData) => ({
                    ...formData,
                    packList: cloneList,
                  }));
                }}
              />
            ))}
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="25px 0px"
          >
            <Typography fontSize="18px" fontWeight="bold" color="#889296">
              Total Cost
            </Typography>
            <Typography fontSize="18px" fontWeight="bold">
              ${totalCost()}
            </Typography>
          </Stack>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={() => handleSubmit()}
              sx={{
                fontSize: "14px",
                backgroundColor: "#FE5454",
                marginTop: "25px",
              }}
            >
              START MY JOURNEY
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {open && (
        <PlaceYourOrder
          isOpen={open}
          handleClose={() => setOpen(false)}
          fillData={fillData}
          handleAddToCart={handleAddToCart}
        />
      )}
      {openDisplayFillData && (
        <DisplayFillData
          isOpen={openDisplayFillData}
          formData={formData}
          handleClose={() => setOpenDisplayFillData(false)}
        />
      )}
    </div>
  );
};
export default PokemonJourney;
