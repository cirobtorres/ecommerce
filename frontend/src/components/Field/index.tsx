'use client';

import { useEffect, useState } from "react";

import { xMark, warning } from "@/icons";
import useTheme from "@/hooks/useTheme";

type FieldProps = {
	type: 'text' | 'date' | 'email' | 'password';
	id: string;
	label: string;
	required?: boolean;
	onChange: (event: any) => void;
	errorFunction?: (value: string) => any[];
}

export default function Field(props: FieldProps) {
	const [isEmpty, setIsEmpty] = useState(false);
	const [value, setValue] = useState('' as string);
	const [error, setError] = useState([] as string[]);

	const { theme } = useTheme();
	
	function handleOnChange(event: any) {
		setValue(event.target.value);
		props.onChange(value);
		if (props.errorFunction) {
			setError(props.errorFunction(event.target.value));
		}
	};

	function handleOnBlur(event: any) {
		if (event.target.value === '') {
			setIsEmpty(true);
		} else {
			setIsEmpty(false);
		}
	};

	function handleOnFocus(event: any) {
		setIsEmpty(false);
	};
	
	return (
		// This component is intended to be nested inside a flex container
		<div className={`flex flex-col w-full h-full`}>
			<div className={`relative`}>
				<input
					type={props.type}
					id={props.id}
					onChange={handleOnChange}
					required={props.required}
					onBlur={handleOnBlur}
					onFocus={handleOnFocus}
					placeholder=""
					className={`
						w-full p-3 rounded outline-none focus:ring-0 border peer 
						text-theme-04-medium-gray dark:text-theme-01-light-gray bg-theme-01-light-gray dark:bg-slate-800 
						${isEmpty ? 'border-red-500' : 'dark:border-theme-04-medium-gray border-theme-02-light-gray'}
						${isEmpty ? 'focus:border-red-500' : 'dark:focus:border-theme-08-light-green focus:border-theme-08-light-green'}
					`}
				/>
					<label htmlFor={props.id} className={`
						absolute text-base top-2 px-2 z-10 scale-75 origin-[0] pointer-events-none transform duration-300 start-2 -translate-y-[1.1rem] 
						peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
						peer-focus:px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.1rem]
						rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
						${isEmpty ? 'text-red-500' : 'text-theme-03-medium-gray'} bg-theme-01-light-gray dark:bg-slate-800 
						${isEmpty ? 'peer-focus:text-red-500' : 'peer-focus:text-theme-08-light-green'}
					`}>{/* duration-300 delays the background recolor from light to dark mode and vice versa */}
						{props.label}
					</label>
			</div>
			{props.required && isEmpty && (
				<span className={`flex flex-row gap-1 text-sm text-left p-1 text-red-500`}>
					{warning(20, 20)} Campo obrigatório
				</span>
			)}
			{error.length > 0 && value && (<div className={'my-2 grid grid-cols-2 gap-1 text-base'}>
				{error && error.map((errorText, index) => (
					Number(errorText[1]) === 0 ? (
						<span key={index} className={`
							flex justify-center items-center text-sm text-theme-08-light-green bg-green-100 rounded border`
						}>{errorText[0]}</span>
					) : (
						<span key={index} className={`
							flex justify-center items-center text-sm text-red-500 bg-red-200 rounded border
						`}>{xMark(20, 20)} {errorText[0]}</span>
					)
				))}
			</div>)}
		</div>
	)
}

/*
- htmlFor -> id
- input NEEDs a placeholder="" 
- Main structure is:
    div relative
        input className="peer"
        label className="absolute peer-focus:... peer-placeholder-shown:..."
    /div
- HOW THIS LOGIC WORKS:
    1. quando escrevemos no input, o placeholder é escondido pelo navegador (por mais que seu conteúdo seja uma string vazia);
    2. peer-placeholder-shown: ... -> é a lógica para quando o placeholder é vizível (ou seja, input vazio);
        2.1 quando o placeholder é vizível, peer-placeholder-shown envia o label para o centro do input;
    3. peer-focus: ... -> é a lógica para quando o input está focado;
        3.1 quando o input está focado, peer-focus envia o label para o topo do input;
        3.2 o label permanece no topo caso o input esteja preenchido, pois o placeholder não é mais vizível;
    4. pointer-events-none -> faz com que o label não seja clicável.
*/