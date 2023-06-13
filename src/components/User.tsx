import { UserType } from "../types/user";

export function User (user: UserType) {
   return (
      <li className="user">
         <span>email</span>
         <p>{user.email}</p>
         <span>number</span>
         <p>{user.number}</p>
      </li>
   )
}