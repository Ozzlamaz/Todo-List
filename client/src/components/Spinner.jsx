function Spinner({size}) {
  return (
    <div style={size} className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  )
}
export default Spinner