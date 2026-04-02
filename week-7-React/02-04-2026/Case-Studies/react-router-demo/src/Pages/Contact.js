import React from "react";

function Contact() {
  return (
    <div style={styles.container}>
      <h1>Contact Page</h1>
      <p>You can reach us at: </p>
        <p>Email: support@example.com</p>
        <p>Phone: +91 1234 56780</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#d4edda',
  }
};

export default Contact;