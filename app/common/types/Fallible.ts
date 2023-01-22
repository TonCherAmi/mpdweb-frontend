export interface Ok<T> {
  status: 'ok'
  data: T
}

export interface Error {
  status: 'error'
  message: string
}

type Fallible<T> = Ok<T> | Error

export default Fallible
