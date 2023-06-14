import { UserType } from '../types/user';

interface Props {
	queryStr: string;
	abortController: AbortController;
}

export async function getNewUsers({ queryStr, abortController }: Props): Promise<{users: UserType[]}> {
	const res = await fetch(`http://localhost:3001/users${queryStr}`, {
		mode: 'cors',
		signal: abortController.signal
	});
	const newUsers: { users: UserType[] } = await res.json();

	return newUsers;
}
