import { useState, useEffect, FormEvent } from 'react';
import { Form } from './components/Form';
import { UserType } from './types/user';
import { UsersList } from './components/UsersList';
import { UserSkeleton } from './components/UserSkeleton';
import { isCorrectForm } from './utils/validate';
import { getQueryStr } from './utils/getQueryString';
import { getNewUsers } from './utils/getNewUsers';

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
	const [abortController, setAbortController] = useState<AbortController>(
		new AbortController()
	);

	useEffect(() => {
		async function setNewUsers() {
			const queryStr = getQueryStr(formState);
			try {
				const newUsers = await getNewUsers({ queryStr, abortController });
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

	}, [isFetching, abortController]);

	function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!isCorrectForm(formState.email, formState.number)) {
			setIsError(true);
			console.log('error');
			setTimeout(() => setIsError(false), 3000);
			return;
		}
		abortController.abort();
		setAbortController(new AbortController());
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
			{users.length === 0 && !isFetching && <h1>No results</h1>}
		</div>
	);
}

export default App;
