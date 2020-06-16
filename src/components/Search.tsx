import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  searchHospital:
    | ((event: React.FocusEvent<HTMLInputElement>) => void)
    | undefined;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  radius: string;
}

const useStyles = makeStyles({
  input: {
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    width: "40%",
    marginTop: "50px",
  },
  input_details: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "40px",
  },
});

const Search: React.FC<Props> = ({ searchHospital, onChange, radius }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.input_details}>
        <input
          type="number"
          className={classes.input}
          onChange={onChange}
          onInput={searchHospital}
          value={radius}
          placeholder="Enter your search distance here in metres"
        />
      </div>
    </div>
  );
};

export default Search;
