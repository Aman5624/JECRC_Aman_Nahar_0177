import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1>Home Page</h1>
      <p>Welcome to our React Router demo application!</p>
      <p>This is the home page where user lands first.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f0f8ff',
  }
};

export default Home;