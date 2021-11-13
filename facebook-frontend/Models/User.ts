export interface User {
  id: Number
  name: String
  username: String
  email: String
  createdAt: String
  updatedAt: String
  avatar?: {
    url: string
  }
}
