function DashboardHome() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back! Here's an overview of your store.</p>
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Orders</h3>
          <p style={styles.number}>124</p>
        </div>
        <div style={styles.card}>
          <h3>Revenue</h3>
          <p style={styles.number}>$8,430</p>
        </div>
        <div style={styles.card}>
          <h3>Customers</h3>
          <p style={styles.number}>57</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cards: { display: 'flex', gap: '20px', marginTop: '24px' },
  card: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    textAlign: 'center',
  },
  number: { fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
};

export default DashboardHome;
