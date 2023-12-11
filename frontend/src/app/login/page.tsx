"use client";

import ConfirmationButton from "@/components/ConfirmationButton";
import Field from "@/components/Field";
import { facebook, google, spotify } from "@/icons";
import Link from "next/link";
import { useState } from "react";

export default function Login(): JSX.Element  {
	const [loginCredentials, setLoginCredentials] = useState();
	const [password, setPassword] = useState();

	return (
		<div className={"flex flex-col max-w-md h-full justify-center text-center mx-auto"}>
			<h2 className={"mb-8 uppercase text-theme-07-dark-blue dark:text-theme-01-light-gray"}>Fazer Login</h2>
			<div>
				<form className={"flex flex-col gap-4 mb-4"}>
					<Field type='text' id='login_input_field' label='Login' onChange={setLoginCredentials} />
					<Field type='password' id='password_input_field' label='Senha' onChange={setPassword} />
					<ConfirmationButton text='Entrar' padding='p-3' width='w-full' onClick={() => {}} />
				</form>
				<Link href='' className={"dark:text-theme-01-light-gray"}>Esqueci minha senha</Link>
			</div>
			<hr className={"my-4 dark:border-theme-03-medium-gray"} />
			<div className={"mb-4"}>
				<span className={"dark:text-theme-01-light-gray"}>Acessar com redes sociais</span>
				<div className={"flex flex-row justify-center gap-1"}>
					<button className={"flex flex-row gap-1 text-xs items-center justify-center p-4 flex-1 rounded text-theme-01-light-gray bg-[#0165E1]"}>
						{facebook(20, 20, "#fff")} Facebook
					</button>
					<button className={"flex flex-row gap-1 text-xs items-center justify-center p-4 flex-1 rounded text-theme-01-light-gray bg-[#db4437]"}>
						{google(20, 20, "#fff")} Google
					</button>
					<button className={"flex flex-row gap-1 text-xs items-center justify-center p-4 flex-1 rounded text-theme-01-light-gray bg-[#1db954]"}>
						{spotify(20, 20, "#fff")} Spotify
					</button>
				</div>
			</div>
			<Link href='/register' className={"text-lg font-bold text-theme-07-dark-blue dark:text-theme-01-light-gray"}>Crie uma conta</Link>
		</div>
	);
}