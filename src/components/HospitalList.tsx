/* eslint-disable eqeqeq */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

const useStyles = makeStyles({
  parent: {
      display: "flex",
      flexDirection: "column",
      width: "70%",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      margin: "0 auto",
      marginTop: "40px",
      marginBottom: "40px",
  },
  scroll: {
    height: "700px",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  p: {
    textAlign: "center",
  },
  list: {
    borderRadius: "9px",
    padding: "15px",
    color: "#195e96",
    border: "1px solid #195e96",
    margin: "15px 25px"
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
    fontSize: "40px",
    paddingTop: "24px",
    paddingRight: "20px",
  },
});

const HospitalList: React.FC<any> = ({ hospitals }) => {
  const classes = useStyles();
  const pharmacy = 'pharmacy';
  return (
    <div className={classes.parent}>
      <Container maxWidth="sm" className={classes.scroll}>
        { //historyData === undefined ? (
        hospitals && hospitals.length === 0 ? (
          <p className={classes.p}>Enter your search area above and choose a distance</p>
        ) : (
          hospitals &&
          hospitals.map((hospital: any) => (
            <List key={hospital.id} className={classes.list}>
              <div className={classes.cover}>
                <h3 className={classes.hospital_name}>{hospital.name}</h3>
                <span>
                  {hospital.name == pharmacy ?
                    <LocalPharmacyIcon className={classes.icon} />
                    : <LocalHospitalIcon className={classes.icon} />
                  }
                </span>
              </div>

              <p className={classes.address}>
                Address: {hospital.vicinity}
              </p>
            </List>
          ))
        )
        // ):(
        //   historyData.map((result: any) => (
        //     <List key={result.id} className={classes.list}>
        //       <div className={classes.cover}>
        //         <h3 className={classes.hospital_name}>{result.name}</h3>
        //         <span>
        //           <LocalHospitalIcon className={classes.icon} />
        //         </span>
        //       </div>

        //       <p className={classes.address}>Address: {result.vicinity}</p>
        //     </List>
        //   ))
        // )
      }
      </Container>
    </div>
  );
};

export default HospitalList;
