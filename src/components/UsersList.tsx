import { UserType } from '../types/user';
import { User } from './User';

export function UsersList({users}: {users: UserType[]}) {
	return (
		<ul className='users-list'>
			{users.map((usr) => (
				<User key={usr.email} {...usr} />
			))}
		</ul>
	);
}
