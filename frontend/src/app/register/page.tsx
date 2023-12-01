import Field from '@/components/Field'
import Link from 'next/link'

export default function Register (): JSX.Element {
  return (
		<main className={'flex flex-col justify-center mx-auto text-center max-w-[720px] h-[100vh]'}>
			<Link href='/' className={'border border-border-02 rounded p-1 w-fit hover:shadow-shadow-01'}>
				<span className={''}>&lt;-</span> Home
			</Link>
			<h2 className={'mb-8 uppercase'}>Criar Conta</h2>
			<div className={'flex flex-row justify-center gap-1'}>
				<button className={'p-2 flex-1 rounded text-white bg-[#0165E1]'}>Facebook</button>
				<button className={'p-2 flex-1 rounded text-white bg-[#db4437]'}>Google</button>
				<button className={'p-2 flex-1 rounded text-white bg-[#1db954]'}>Spotify</button>
			</div>
			<div className={'relative'}>
				<hr className={'my-4 border-border-02'} />
				<span className={'absolute top-0 left-1/2 -translate-x-1/2 bg-theme-01 w-12 text-center'}>ou</span>
			</div>
			<form>
				<div className={'flex flex-col gap-2'}>
					<div className={'flex flex-row gap-1'}>
						<Field type='text' id='floating_name_label' label='Nome Completo' />
						<Field type='email' id='floating_email_label' label='E-mail' />
					</div>
					<div className={'flex flex-row gap-1'}>
						<div className={'w-full flex flex-col'}>
							<Field type='password' id='floating_pass_label' label='Criar Senha' />
							<div className={'my-2 grid grid-cols-2 gap-1 text-base'}>
								<span className={'text-red-500 bg-red-200 rounded border border-red-500'}>8 caracteres</span>
								<span className={'text-red-500 bg-red-200 rounded border border-red-500'}>1 maiúscula</span>
								<span className={'text-red-500 bg-red-200 rounded border border-red-500'}>1 minúscula</span>
								<span className={'text-red-500 bg-red-200 rounded border border-red-500'}>1 número</span>
								<span className={'text-red-500 bg-red-200 rounded border border-red-500'}>1 caractere especial</span> {/* col-span-2 */}
							</div>
						</div>
						<div className={'w-full flex flex-col h-full'}>
							<Field type='password' id='floating_pass_conf_label' label='Confirmar Senha' />
							<div className={'my-2 text-base'}>
								<span className={'text-red-500'}>Senha não confere</span>
							</div>
						</div>
					</div>
				</div>
				<button className={'m-2 p-2 w-60 text-white bg-rose-500 rounded hover:shadow-shadow-01'}>Confirmar</button>
			</form>
			<span>Já possui cadastro? <Link href="/login" className={'hover:underline font-bold'}>Entrar</Link></span>
		</main>
  )
}
