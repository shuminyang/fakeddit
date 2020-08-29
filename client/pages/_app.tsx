import React from "react"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../src/theme"
import Header from "../src/components/header"
import { Provider, createClient } from "urql"

const urqlClient = createClient({ url: 'http://localhost:4000/graphql' });

interface IMyApp {
  Component: () => JSX.Element,
  pageProps: object,
}

export default function MyApp({ Component, pageProps }: IMyApp) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Fakeddit</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider value={urqlClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  )
}
