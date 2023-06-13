export function isCorrectForm(str: string, phone?: string) {
	return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str) || str.length === 0) && (phone?.length === 8 || phone?.length === 0);
}
