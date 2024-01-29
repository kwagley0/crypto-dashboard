import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    padding: "25px",
  },
  carouselItem: {
    display: "flex",
    backgroundColor: "rgba(33,37,41,255)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    padding: "5px 10px",
    borderRadius: "50%",
    height: "150px",
    border: "2px solid #757575",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      const shuffledData = shuffleArray(data);
      setTrending(shuffledData);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const items = trending.map((coin) => (
    <div
      key={coin.id}
      className={classes.carouselItem}
      onClick={() => history.push(`/coins/${coin.id}`)}
    >
      <img
        src={coin?.image}
        alt={coin.name}
        height="40"
        style={{ marginBottom: 10 }}
      />
      <span
        style={{
          color: "rgba(221,221,221,255)",
          fontSize: 22,
          fontWeight: "bold",
          marginTop: "-4px",
          marginBottom: "2px",
        }}
      >
        {coin?.symbol}
      </span>

      <span
        style={{
          fontWeight: 500,
          color: "#b0b1b3",
          marginBottom: "2px",
        }}
      >
        {symbol}
        {numberWithCommas(coin?.current_price.toFixed(2))}
      </span>
      <span
        style={{
          color:
            coin.price_change_percentage_24h >= 0 ? "rgb(14, 203, 129)" : "red",
          fontWeight: 500,
        }}
      >
        {coin.price_change_percentage_24h >= 0 && "+"}
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </span>
    </div>
  ));

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 1,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        infinite
        autoPlayInterval={3000}
        animationType="fadeout"
        animationDuration={300}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
