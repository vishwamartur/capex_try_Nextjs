// Import React and other dependencies
import React from "react";
import Layout from "../components/Layout";

// Define the custom App component
function MyApp({ Component, pageProps }) {
  // Return the JSX code for rendering the custom App component
  return (
    // Wrap the page component with the layout component
    <Layout title="Capex Item Reservation">
      <Component {...pageProps} />
    </Layout>
  );
}

// Export the custom App component
export default MyApp;
