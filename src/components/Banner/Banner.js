import { Container, Typography, makeStyles, Grid } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 300,
    display: "flex",
    flexDirection: "row",
    paddingTop: 25,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: -125,
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <Grid
          container
          spacing={1}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          <Grid item xs={12} sm={2}>
            <Carousel></Carousel>
          </Grid>
          <Grid item sm={5}>
            <div className={classes.tagline}>
              <Typography
                variant="h3"
                style={{
                  fontWeight: "500",
                  color: "rgba(221,221,221,255)",
                  marginBottom: 15,
                  fontFamily: "Montserrat",
                }}
              >
                Crypto Tracker
              </Typography>
              <Typography
                variant="h5"
                style={{
                  fontWeight: 400,
                  fontSize: "1.4rem",
                  color: "rgba(221,221,221,255)",
                  marginBottom: 10,
                  fontFamily: "Montserrat",
                }}
              >
                Details on the market's leading cryptocurrencies
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Carousel></Carousel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
