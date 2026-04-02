function Analytics() {
  const data = [
    { month: 'Jan', sales: 320 },
    { month: 'Feb', sales: 450 },
    { month: 'Mar', sales: 390 },
    { month: 'Apr', sales: 520 },
  ];

  return (
    <div>
      <h1>Analytics</h1>
      <p>Monthly sales overview.</p>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Month</th>
            <th style={styles.th}>Sales ($)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.month}>
              <td style={styles.td}>{row.month}</td>
              <td style={styles.td}>{row.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: { borderCollapse: 'collapse', marginTop: '20px', width: '300px' },
  th: { padding: '10px 20px', backgroundColor: '#1e293b', color: 'white', textAlign: 'left' },
  td: { padding: '10px 20px', borderBottom: '1px solid #e2e8f0' },
};

export default Analytics;
