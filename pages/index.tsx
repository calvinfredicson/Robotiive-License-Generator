import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import { FeatureSelector } from "component";

const GenerateLicense: NextPage = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Generate License</title>
      </Head>
      <FeatureSelector />
    </ThemeProvider>
  );
};

export default GenerateLicense;
