import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
import logo from '../logo.png';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "rgba(221,221,221,255)",
    fontFamily: "Montserrat",
    fontWeight: "600",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar style={{ background: "rgba(33,37,41,255)" }} position="static">
        <Container>
          <Toolbar>
            <img
              src={logo}
              width="40px"
              height="40px"
              alt="Logo"
              style={{ marginRight: "5px" }}
            />
            <Typography
              onClick={() => history.push("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto Dashboard
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "#dddddd",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"} style={{ color: "#dddddd" }}>
                USD
              </MenuItem>
              <MenuItem value={"EUR"} style={{ color: "#dddddd" }}>
                EUR
              </MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header