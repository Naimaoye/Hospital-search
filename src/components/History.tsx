import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";
// import { HistoryProps } from "./Interfaces";

// interface Props {
//   history:{
//     id: string;
//     type: string;
//     radius: string | number;
//     results: {
//       geometry: { Location: object; ViewPort?: object };
//       icon: string;
//       id: string;
//       name: string;
//       opening_hours: OpenNow;
//       photos: Photos[];
//       place_id: string;
//       reference: string;
//       types: string[];
//       vicinity: string;
//     }[];
//   };
//   renderHistory: (id: string) => void;
// }

const useStyles = makeStyles({
  input: {
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    width: "49%",
    // marginTop: "50px",
    alignSelf: "center",
  },
  input_details: {
    // display: "flex",
    // flexDirection: "column",
    // paddingBottom: "40px",
  },
  dropdown: {
    padding: "10px 10px",
    fontSize: "13.5px",
    fontWeight: 400,
    lineHeight: 1.5,
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    width: "55%",
    alignSelf: "center",
  },
  search_places: {
    textAlign: "center",
    color: "#195e96"
  },
  select_type: {
    margin: 0,
    marginLeft: "78px",
    marginTop: "20px",
  },
  select_radius: {
    margin: 0,
    marginLeft: "78px",
  },
  default_radius: {
    margin: 0,
    marginLeft: "78px",
    fontSize: "13px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    margin: "0 auto",
    marginTop: "40px",
    marginBottom: "40px",
  },
  button: {
    width: "49%",
    alignSelf: "center",
    margin: "24px 20px",
  },
  box: {
    // height: "20px",
    width: "75%",
    border: "1px solid #195e96",
    margin: "15px 25px",
  },
  icon: {
    color: "red",
    fontSize: "20px",
    paddingTop: "1px",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  scroll: {
    height: "300px",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  p: {
    cursor: "pointer",
  },
});

const Search: React.FC<any> = ({ history, renderHistory }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.input_details}>
        <div className={classes.card}>
          <h4 className={classes.search_places}>Previous Search Results</h4>
          <div className={classes.scroll}>
            { history.map(
              (h: {
                searchType: React.ReactNode;
                distance: React.ReactNode;
                location: React.ReactNode;
                id: string;
              }) => {
                return (
                  <div key={h.id} className={classes.box} onClick={() => renderHistory(h.id)}>
                    <p
                      className={classes.p}
                    >
                      <span>
                        <RoomIcon className={classes.icon} />
                      </span>
                      <span>{h.searchType}, </span>
                      <span>{h.distance}km Away </span>
                      <span>{h.location}</span>
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
