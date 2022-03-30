export function mapValueTo(fn) {
  return (event) => {
    return fn(event.target.value)
  }
}
