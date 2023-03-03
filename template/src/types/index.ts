export interface User {
  email: string
  username?: string
  avatar?: string
} 

export interface RouterLocation {
  pathname: string,
  search: string,
  hash: string,
  key: string
}

export interface Creds {
  email: string,
  password: string,
  confirm?: string
}
