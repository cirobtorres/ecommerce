export default function Login(): JSX.Element  {
	return (
		<main>
			<h2 className={"uppercase"}>Fazer Login</h2>
			<form>
				<input type="email" />
				<input type="password" />
			</form>
		</main>
	);
}