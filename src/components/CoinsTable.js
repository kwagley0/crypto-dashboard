import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Typography,
  createTheme,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";
import { FaSearch } from "react-icons/fa";

export function numberMarketCapWithCommas(x) {
  if (x <= 999) {
    return x.toString(); // Return the original number as a string for 3 or less digits
  } else if (x >= 1000 && x <= 999999) {
    return (x / 1000).toFixed(2) + " K"; // Format in thousands form
  } else if (x >= 1000000 && x <= 999999999) {
    return (x / 1000000).toFixed(2) + " M"; // Format in millions form
  } else if (x >= 1000000000) {
    return (x / 1000000000).toFixed(2) + " B"; // Format in billions form
  }
}
const StatButton = ({ label, value, color }) => {
  const useStyles = makeStyles({
    statButton: {
      backgroundColor: color,
      transition: "all 0.2s ease-in-out",
      color: "#fff",
      padding: "5px 0",
      borderRadius: 10,
      border: "none",
      outline: "none",
      width: "100%",
      height: 40,
      marginTop: 5,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    statLabel: {
      fontSize: 12,
      fontWeight: "bold",
    },
    statValue: {
      fontSize: 14,
    },
  });

  const classes = useStyles();

  return (
    <Button className={classes.statButton}>
      <Typography className={classes.statLabel}>{label}</Typography>
      <Typography
        className={classes.statValue}
        style={{
          color: value.trim().endsWith("%")
            ? (() => {
                const numericValue = Number(value.trim().slice(0, -1));
                value =
                  numericValue > 0
                    ? `\u00a0+${value.trim()}`
                    : `\u00a0${value.trim()}`;
                return numericValue >= 0 ? "rgb(14, 203, 129)" : "red";
              })()
            : "",
        }}
      >
        {value}
      </Typography>
    </Button>
  );
};
const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor: "rgba(33,37,41,255)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#282c30",
        transform: "scale(1.05)",
        transition: "transform 0.3s ease-in-out",
      },
      borderRadius: 10,
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      flex: 1,
    },
    cardMedia: {
      objectFit: "contain",
      maxHeight: 70,
      maxWidth: "100%",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#dddddd",
      },
    },
    searchInput: {
      marginBottom: theme.spacing(2),
      width: "15%",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      marginTop: "-30px",
    },
    pages: {
      paddingBottom: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const renderCoinCards = () => {
    const filteredCoins = handleSearch();

    return (
      <Grid container spacing={5}>
        {filteredCoins.slice((page - 1) * 9, (page - 1) * 9 + 9).map((row) => (
          <Grid item xs={12} sm={12} md={4} key={row.name}>
            <Card
              className={classes.card}
              onClick={() => history.push(`/coins/${row.id}`)}
            >
              <CardMedia
                component="img"
                alt={row.name}
                height="70"
                image={row?.image}
                className={classes.cardMedia}
                style={{ marginTop: "20px" }}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  variant="subtitle1"
                  style={{
                    textTransform: "uppercase",
                    color: "rgba(221,221,221,255)",
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: "-10px",
                  }}
                >
                  {row.symbol}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: "darkgrey",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {row.name}
                </Typography>
                <StatButton
                  label="Current Price: "
                  value={`\u00a0${symbol}${numberWithCommas(
                    row.current_price.toFixed(2)
                  )}`}
                  color="rgb(48, 52, 64)"
                />
                <StatButton
                  label="24 Hour Change:"
                  value={`\u00a0
                      
                    ${row.price_change_percentage_24h.toFixed(2)}%`}
                  color="rgb(48, 52, 64)"
                />
                <StatButton
                  label="Market Cap:"
                  value={`\u00a0${symbol}${numberMarketCapWithCommas(
                    row.market_cap.toString()
                  )}`}
                  color="rgb(48, 52, 64)"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "25px",
          marginTop: "30px",
        }}
      >
        <FaSearch
          style={{
            color: "rgba(221,221,221,255)",
            fontSize: "20px",
            marginRight: "10px",
            marginBottom: "30px",
          }}
        />
        <TextField
          label="e.g. bitcoin"
          variant="outlined"
          className={classes.searchInput}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{
            style: {
              color: "rgba(117,117,117,255)",
            },
          }}
          style={{
            backgroundColor: "rgba(33,37,41,255)",
            marginBottom: "30px",
            marginTop: "10px",
            width: "175px",
          }}
        />
      </div>

      <Container className={classes.container}>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "rgba(33,37,41,255)" }} />
        ) : (
          renderCoinCards()
        )}
      </Container>
      <Pagination
        className={classes.pages}
        count={(handleSearch()?.length / 10).toFixed(0)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </ThemeProvider>
  );
};

export default CoinsTable;
