export function getQueryStr(data: { email: string; number: string }) {
	let queryStr = '';
	const number = data.number.replace(/\-/g, '');
	if (data.email && data.number) {
		queryStr = `?email=${data.email}&number=${number}`;
	} else if (data.email && !number) {
		queryStr = `?email=${data.email}`;
	} else if (!data.email && number) {
		queryStr = `?number=${number}`;
	}

   return queryStr;
}
