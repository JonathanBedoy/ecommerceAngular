export interface UserInterface {
  id:number
  password?:string
  firstName?: string
  lastName?:string
  email?:string
}

export interface UserLogin {
  email:string
  password:string
}
