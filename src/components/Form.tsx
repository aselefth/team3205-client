import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useRef
} from 'react';
import { FormState } from '../App';
import { getPhone } from '../utils/getPhone';

interface FormProps extends FormState {
	setFormState: Dispatch<SetStateAction<FormState>>;
	submit: (e: FormEvent<HTMLFormElement>) => void;
	isError: boolean;
}

export function Form({
	email,
	number,
	setFormState,
	submit,
	isError
}: FormProps) {
	const phoneRef = useRef<HTMLInputElement>(null);
	function changeEmail(e: ChangeEvent<HTMLInputElement>) {
		setFormState((prev) => ({ ...prev, email: e.target.value }));
	}

	function changeNumber(e: ChangeEvent<HTMLInputElement>) {
		setFormState((prev) => ({ ...prev, number: e.target.value }));
	}

	return (
		<form onSubmit={submit} className='form'>
			<input
				type='email'
				value={email}
				onChange={changeEmail}
				placeholder='email'
				className={isError ? 'error' : ''}
            />
			<input
				className={isError ? 'error' : ''}
				type='tel'
				value={getPhone(number)}
				onChange={changeNumber}
				placeholder='99-99-99'
				ref={phoneRef}
				maxLength={8}
            
			/>
			<button type='submit'>submit</button>
		</form>
	);
}
