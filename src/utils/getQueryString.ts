export function getQueryStr(data: { email: string; number: string }) {

	const query = new URLSearchParams();
	data.email && query.append('email', data.email);
	data.number && query.append('number', data.number.replace(/\-/g, ''));
	console.log(query.toString())

	return query.toString();
}
