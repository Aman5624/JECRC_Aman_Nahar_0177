function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to ShopCo</h1>
      <p>Your one-stop shop for everything you need.</p>
      <p>Browse our products, create an account, or contact us for support.</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px', textAlign: 'center' },
};

export default Home;
