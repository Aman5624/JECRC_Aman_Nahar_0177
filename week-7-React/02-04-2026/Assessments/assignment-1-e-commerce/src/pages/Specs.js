const specs = [
  { label: 'Brand', value: 'ShopCo' },
  { label: 'Warranty', value: '1 Year' },
  { label: 'Weight', value: '250g' },
  { label: 'Connectivity', value: 'Bluetooth 5.0 / USB' },
  { label: 'Battery Life', value: '20 hours' },
];

function Specs() {
  return (
    <div>
      <h3>Specifications</h3>
      <table style={styles.table}>
        <tbody>
          {specs.map(s => (
            <tr key={s.label}>
              <td style={styles.label}>{s.label}</td>
              <td style={styles.value}>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: { borderCollapse: 'collapse', width: '100%', maxWidth: '400px' },
  label: {
    padding: '10px 14px',
    fontWeight: 'bold',
    color: '#64748b',
    borderBottom: '1px solid #e2e8f0',
    width: '160px',
  },
  value: {
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
  },
};

export default Specs;
