import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Theme } from "@/styled/theme";
import { Layout } from "@/page-components/layout";
import { Provider } from "@/store/tracked";
import { MotionConfig } from "framer-motion";


interface Providers {
  children: React.ReactNode
}

const Providers = ( {children}: Providers) =>{
  
  return (
    <ThemeProvider theme={Theme}>
      <MotionConfig reducedMotion="user">
        <Layout>
          <Provider>
            {children}
          </Provider>
        </Layout>
      </MotionConfig>
    </ThemeProvider>
  )
}

const customRender = ( ui: React.ReactElement, options={}) =>{
  render(ui, { wrapper: Providers, ...options});
}


export { customRender as render };