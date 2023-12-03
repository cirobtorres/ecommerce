'use client';

import { useState } from 'react';
import Link from 'next/link';

import { validatePassword } from '@/functions/validatePassword';
import Field from '@/components/Field';
import { facebook, google, spotify } from '@/icons';

export default function Register (): JSX.Element {
	const [fullName, setFullName] = useState('');
	const [cpf, setCpf] = useState('');
	const [birth, setBirth] = useState('');
	const [cel, setCel] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	function handleSubmit(event: any) {
		event.preventDefault();
		if (password !== passwordConfirmation) {
			// throw new Error('Senha e confirmação de senha não conferem!');
			console.log('Senha e confirmação de senha não conferem!');
		}
	};

  return (
		<main className={'flex flex-col justify-center mx-auto text-center w-full max-w-2xl min-w-[480px] h-full'}>
			<h2 className={'mb-8 uppercase text-theme-07-dark-blue'}>Criar Conta</h2>
			<div className={'flex flex-row justify-center gap-1'}>
				<button className={'flex flex-row gap-1 text-xs items-center justify-center p-4 flex-1 rounded text-white bg-[#0165E1]'}>Cadastrar com {facebook(20, 20, '#fff')} Facebook</button>
				<button className={'flex flex-row gap-1 text-xs items-center justify-center p-4 flex-1 rounded text-white bg-[#db4437]'}>Cadastrar com {google(20, 20, '#fff')} Google</button>
				<button className={'flex flex-row gap-1 text-xs items-center justify-center p-4 flex-1 rounded text-white bg-[#1db954]'}>Cadastrar com {spotify(20, 20, '#fff')} Spotify</button>
			</div>
			<div className={'relative'}>
				<hr className={'my-4 border-theme-02-light-gray'} />
				<span className={`
					absolute flex justify-center items-center top-0 h-full left-1/2 
					-translate-x-1/2 text-theme-02-light-gray bg-theme-01-light-gray w-12
				`}>ou</span>
			</div>
			<form>
				<div className={'flex flex-col gap-2'}>
					<Field type='text' id='floating_name_label' label='Nome Completo' required onChange={setFullName} />
					<div className={'flex flex-row gap-1'}>
						<Field type='text' id='floating_cpf_label' label='CPF' required onChange={setCpf} />
						<Field type='text' id='floating_birth_label' label='Data de Nascimento' required onChange={setBirth} />
					</div>
					<div className={'flex flex-row gap-1'}>
						<Field type='text' id='floating_cel_label' label='Telefone Celular' required onChange={setCel} />
						<Field type='email' id='floating_email_label' label='E-mail' required onChange={setEmail} />
					</div>
					<div className={'flex flex-row gap-1'}>
						<Field type='password' id='floating_pass_label' label='Criar Senha' required onChange={setPassword} errorFunction={validatePassword} />
						<Field type='password' id='floating_pass_conf_label' label='Confirmar Senha' required onChange={setPasswordConfirmation} />
					</div>
				</div>
				<div className={`flex flex-col text-left gap-4 my-4`}>
					<div className={`inline-flex gap-2 items-center`}>
						<input id='newsletter_checkbox' type='checkbox' className={`h-4 w-4 cursor-pointer`} />
						<label htmlFor='newsletter_checkbox' className={'text-theme-03-medium-gray cursor-pointer'}>Quero receber ofertas e novidades por e-mail, SMS ou WhatsApp</label>
					</div>
					<div className={`inline-flex gap-2 items-center`}>
						<input id='privacy_policies_checkbox' type='checkbox' className={`h-4 w-4 cursor-pointer`} />
						<label htmlFor='privacy_policies_checkbox' className={'text-theme-03-medium-gray cursor-pointer'}>Aceito os termos de uso e a política de privacidade</label>
					</div>
				</div>
				<button className={'m-2 p-4 w-80 text-white bg-theme-07-dark-blue rounded hover:shadow-bright'} onClick={handleSubmit}>Confirmar</button>
			</form>
			<span className={`text-theme-03-medium-gray`}>
				Já possui cadastro? <Link href="/login" className={'text-theme-07-dark-blue underline font-bold'}>Entrar</Link>
			</span>
		</main>
  )
}