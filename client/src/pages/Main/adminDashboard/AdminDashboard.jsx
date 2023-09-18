import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  ThemeProvider,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { createTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    fontFamily: "Belanosima, sans-serif",
  },
}));

const theme = createTheme();

const data = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 1000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666"];

const AdminDashboard = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState("Jan"); // Default selected month

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <Toolbar />
          <Container>
            {/* ============ Header =============== */}
            <Typography
              variant="h4"
              gutterBottom
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Admin Dashboard
            </Typography>
            {/*  ==============  Select Month ================ */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "10px 20px",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                >
                  Select Month
                </Typography>
                <Select
                  label="Select Month"
                  value={selectedMonth}
                  id="date"
                  onChange={handleMonthChange}
                  style={{ width: "40%" }}
                >
                  {data.map((month) => (
                    <MenuItem key={month.name} value={month.name}>
                      {month.name}
                    </MenuItem>
                  ))}
                </Select>
              </Paper>
            </Grid>
            {/* ... */}
            <Grid container spacing={3} style={{ display: "flex" }}>
              {/* ========== left div ============= */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <ShoppingCartIcon />
                  <Typography variant="h6">Total Products</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    235
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <PeopleIcon />
                  <Typography variant="h6">Total Customers</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    1234
                  </Typography>
                </Paper>
              </Grid>
              {/* =============== Right div ============ */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6">Total Transactions</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    459
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6">Total Items Sold</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    1876
                  </Typography>
                </Paper>
              </Grid>
              {/* =============== Graph ============= */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: "10px", width: "39vw" }}>
                  <BarChartIcon />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Sales Overview
                  </Typography>
                  <Box height={300} mt={2}>
                    <AreaChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#00C2A8"
                        fill="#00C2A8"
                      />
                    </AreaChart>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "20px",
                    height: "56vh",
                    marginLeft: "1rem",
                  }}
                >
                  <PieChartRoundedIcon />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Sales Distribution
                  </Typography>
                  <Box height={400}>
                    <PieChart width={400} height={300}>
                      <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;
