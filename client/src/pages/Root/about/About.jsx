import React from "react";
import {
  Typography,
  Container,
  Grid,
  Paper,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  title: {
    fontFamily: "Belanosima, sans-serif",
  },
}));

const About = () => {
  const classes = useStyles();

  const aboutSections = [
    {
      title: "Our Mission",
      content:
        "Our mission is to simplify the supermarket shopping experience by providing an efficient and user-friendly bill generating system...",
    },
    {
      title: "Our History",
      content:
        "Founded in [Year], we embarked on a journey to revolutionize the way customers interact with supermarket bills...",
    },
    {
      title: "Meet Our Team",
      content:
        "Behind the scenes, our diverse team of developers, designers, and customer support experts work tirelessly to bring our vision to life...",
    },
    {
      title: "Services",
      content:
        "We offer a comprehensive suite of tools that enable supermarkets to generate accurate and organized bills for their customers...",
    },
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className={classes.title}
        >
          About Us
        </Typography>
        <Grid container spacing={3}>
          {aboutSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.title}
                  >
                    {section.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default About;
