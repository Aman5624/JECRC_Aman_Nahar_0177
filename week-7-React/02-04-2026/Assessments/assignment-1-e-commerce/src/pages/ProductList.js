import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Wireless Headphones', price: '$49.99' },
  { id: 2, name: 'Mechanical Keyboard', price: '$89.99' },
  { id: 3, name: 'USB-C Hub', price: '$34.99' },
  { id: 4, name: 'Webcam HD', price: '$59.99' },
];

function ProductList() {
  return (
    <div>
      <h1>Products</h1>
      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <h3>{p.name}</h3>
            <p style={styles.price}>{p.price}</p>
            <Link to={`/products/${p.id}`} style={styles.link}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' },
  card: {
    padding: '20px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    width: '180px',
  },
  price: { color: '#64748b', marginBottom: '12px' },
  link: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: '#1e293b',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '13px',
  },
};

export default ProductList;
