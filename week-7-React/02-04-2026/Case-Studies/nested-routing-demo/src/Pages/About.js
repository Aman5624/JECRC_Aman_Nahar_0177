import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h1>About Page</h1>
      <p>This Application demonstrates React Router concepts.</p>
      <p>It includes navigation, routing and component rendering. </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff3cd',
  }
};

export default About;