export function getPhone(value: string) {
   value = value.replace(/\D/g, "");
   value = value.replace(/^(\d{2})(\d)/g, "$1-$2");
   value = value.replace(/(\d)(\d{2})$/, "$1-$2");
   return value;
 }