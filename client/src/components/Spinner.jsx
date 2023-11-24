function Spinner({size}) {
  return (
    <div className="spinner-border" style={size} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  )
}
export default Spinner