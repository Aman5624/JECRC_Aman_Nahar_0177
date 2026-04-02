import { useParams, NavLink, Outlet } from 'react-router-dom';

const products = {
  1: { name: 'Wireless Headphones', price: '$49.99', description: 'High quality audio with noise cancellation.' },
  2: { name: 'Mechanical Keyboard', price: '$89.99', description: 'Tactile switches for a premium typing experience.' },
  3: { name: 'USB-C Hub', price: '$34.99', description: '7-in-1 hub with HDMI, USB-A, and SD card reader.' },
  4: { name: 'Webcam HD', price: '$59.99', description: '1080p webcam with built-in microphone.' },
};

function ProductDetail() {
  const { productId } = useParams();
  const product = products[productId];

  if (!product) {
    return <div style={{ padding: '40px' }}><h2>Product not found.</h2></div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p style={styles.price}>{product.price}</p>
      <p>{product.description}</p>

      <div style={styles.tabs}>
        <NavLink to="reviews" style={tabStyle}>Reviews</NavLink>
        <NavLink to="specs" style={tabStyle}>Specifications</NavLink>
      </div>

      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

const tabStyle = ({ isActive }) => ({
  padding: '8px 20px',
  textDecoration: 'none',
  borderBottom: isActive ? '2px solid #1e293b' : '2px solid transparent',
  color: isActive ? '#1e293b' : '#64748b',
  fontWeight: isActive ? 'bold' : 'normal',
  marginRight: '8px',
});

const styles = {
  price: { fontSize: '20px', color: '#64748b', marginBottom: '12px' },
  tabs: { display: 'flex', borderBottom: '1px solid #e2e8f0', marginTop: '24px' },
  content: { padding: '20px 0' },
};

export default ProductDetail;
