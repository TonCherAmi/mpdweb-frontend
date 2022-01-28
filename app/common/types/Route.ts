interface Route<T extends string> {
  path: string
  match: {
    param: T
    pattern: string
  }
}

export default Route
