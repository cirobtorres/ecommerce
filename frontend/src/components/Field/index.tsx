export default function Field({ type, id, label }: FieldProps) {
    // This component is intended to be nested inside a flex container
    return (
        <div className={`flex-1 relative`}>
            <input type={type} id={id} required className={`
                w-full p-2 rounded outline-none focus:ring-0 border peer
                bg-theme-01 border-border-02 focus:border-green-500
            `} placeholder="" />
            <label htmlFor={id} className={`
                absolute text-sm top-2 px-2 z-10 origin-[0] -translate-y-4 scale-75 pointer-events-none transform duration-300 start-1
                text-border-02 bg-theme-01 peer-focus:text-green-500
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
                peer-focus:px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
            `}>{label}</label>
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