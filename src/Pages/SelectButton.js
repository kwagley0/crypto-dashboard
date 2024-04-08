import { makeStyles, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const SelectButton = ({ children, selected, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid lightgreen",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "lightgreen" : "",
      color: selected ? "black" : "#dddddd",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "lightgreen",
        color: "black",
      },
      width: "22%",
      textAlign: "center",
      fontSize: isMobile ? "0.7rem" : "1rem",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
