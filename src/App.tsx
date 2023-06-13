import { useState, useEffect, FormEvent } from 'react';
import { Form } from './components/Form';
import { UserType } from './types/user';
import { UsersList } from './components/UsersList';
import { UserSkeleton } from './components/UserSkeleton';
import { isCorrectForm } from './utils/validate';

export interface FormState {
	email: string;
	number: string;
}

function App() {
	const [formState, setFormState] = useState<FormState>({
		email: '',
		number: ''
	});
	const [users, setUsers] = useState<UserType[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		async function setNewUsers() {
			let queryStr = '';
			if (formState.email && formState.number) {
				queryStr = `?email=${formState.email}&number=${formState.number}`;
			} else if (formState.email && !formState.number) {
				queryStr = `?email=${formState.email}`;
			} else if (!formState.email && formState.number) {
				queryStr = `?number=${formState.number}`;
			}
			try {
				const res = await fetch(`http://localhost:3001/users${queryStr}`, {
					mode: 'cors'
				});
				const newUsers: { users: UserType[] } = await res.json();
				setUsers(newUsers.users);
			} catch (e) {
				setUsers([]);
			}
			setIsFetching(false);
		}

		if (isFetching) {
			setNewUsers();
			setFormState({ email: '', number: '' });
		}
	}, [isFetching]);

	function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!isCorrectForm(formState.email, formState.number)) {
			setIsError(true);
			console.log('error')
			setTimeout(() => setIsError(false), 3000);
			return;
		}
		setIsFetching(true);
	}

	return (
		<div className='page-wrapper'>
			<Form
			isLoading={isFetching}
			isError={isError}
				{...formState}
				setFormState={setFormState}
				submit={handleSubmitForm}
			/>
			{isFetching && (
				<div className='users-list'>
					<UserSkeleton />
					<UserSkeleton />
				</div>
			)}
			{!isFetching && <UsersList users={users} />}
			{users.length === 0 && <h1>No results</h1>}
		</div>
	);
}

export default App;
