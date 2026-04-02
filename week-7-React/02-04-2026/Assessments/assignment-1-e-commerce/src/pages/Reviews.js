const reviews = [
  { user: 'Alice', rating: 5, comment: 'Excellent product! Highly recommended.' },
  { user: 'Bob', rating: 4, comment: 'Great value for the price.' },
  { user: 'Carol', rating: 3, comment: 'Decent, but could be better.' },
];

function Reviews() {
  return (
    <div>
      <h3>Customer Reviews</h3>
      {reviews.map((r, i) => (
        <div key={i} style={styles.review}>
          <strong>{r.user}</strong>
          <span style={styles.rating}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
          <p style={{ margin: '4px 0 0' }}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  review: {
    padding: '14px',
    marginBottom: '10px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
  },
  rating: { marginLeft: '10px', color: '#f59e0b' },
};

export default Reviews;
