export function validatePassword(password: string) {
	const errors = [] as any[];
	if (password.length < 8) {
		errors.push(["8 caracteres", 1]);
	} else {
		errors.push(["8 caracteres", 0]);
	}
	if (!password.match(/[A-Z]/)) {
		errors.push(["1 maiúscula", 1]);
	} else {
		errors.push(["1 maiúscula", 0]);
	}
	if (!password.match(/[a-z]/)) {
		errors.push(["1 minúscula", 1]);
	} else {
		errors.push(["1 minúscula", 0]);
	}
	if (!password.match(/[0-9]/)) {
		errors.push(["1 número", 1]);
	} else {
		errors.push(["1 número", 0]);
	}
	if (!password.match(/[^A-Za-z0-9]/)) {
		errors.push(["1 caractere especial", 1]);
	} else {
		errors.push(["1 caractere especial", 0]);
	}
	return errors;
}