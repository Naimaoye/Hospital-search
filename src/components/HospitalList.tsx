import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles({
  p: {
    textAlign: "center",
  },
  list: {
    margin: "7px",
    borderRadius: "9px",
    padding: "15px",
    color: "#195e96",
    border: "1px solid #195e96"
  },
  cover: {
    display: "flex",
    justifyContent: "space-between",
  },
  hospital_name: {
    paddingTop: "19px",
    paddingLeft: "27px",
  },
  address: {
    paddingLeft: "30px",
  },
  icon: {
    color: "red",
    fontSize: "60px",
    paddingTop: "24px",
    paddingRight: "20px",
  },
});

const HospitalList: React.FC<any> = ({ hospitals }) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm">
        {hospitals && hospitals.length === 0 ? (
          <p className={classes.p}>Enter your search distance in metres</p>
        ) : (
          hospitals &&
          hospitals.map((hospital: any) => (
            <List key={hospital.id} className={classes.list}>
              <div className={classes.cover}>
                <h3 className={classes.hospital_name}>{hospital.poi.name}</h3>
                <span>
                  <LocalHospitalIcon className={classes.icon} />
                </span>
              </div>

              <p className={classes.address}>
                Address: {hospital.address.freeformAddress},{" "}
                {hospital.address.country}
              </p>
            </List>
          ))
        )}
      </Container>
    </div>
  );
};

export default HospitalList;
