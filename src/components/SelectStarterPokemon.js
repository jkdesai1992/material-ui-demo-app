import React from "react";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const BpIcon = styled("span")(({ img }) => ({
  width: "100px",
  height: "100px",
  backgroundColor: "#F0F0F0",
  borderRadius: "50%",
  backgroundSize: "cover",
  backgroundImage: `url(${img})`,
}));

const BpCheckedIcon = styled(BpIcon)(({ img }) => ({
  border: "2px solid #FE5454",
  backgroundImage: `url(${img})`,
}));

const SelectStarterPokemon = ({
  handleChange,
  value,
  activePokemonDetails,
}) => {
  if (!activePokemonDetails) {
    return null;
  }

  return (
    <RadioGroup
      row
      value={value}
      name="starterPokemon"
      onChange={handleChange}
      sx={{
        justifyContent: "space-between",
      }}
    >
      {activePokemonDetails.pokemonTypes.map((item) => {
        return (
          <FormControlLabel
            key={item.name}
            sx={{
              marginRight: "0px",
            }}
            value={item.name}
            control={
              <Radio
                color="default"
                checkedIcon={<BpCheckedIcon img={item.image} />}
                icon={<BpIcon img={item.image} />}
              />
            }
          />
        );
      })}
    </RadioGroup>
  );
};
export default React.memo(SelectStarterPokemon);
