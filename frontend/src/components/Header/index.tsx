'use client';

import Link from 'next/link';

import useTheme from '@/hooks/useTheme';
import { glass, heart, menuBars, shoppingCart, userProfile } from '@/icons';

export default function Header() {
  const theme = useTheme();

  return (
    <header className={`text-white bg-theme-07-dark-blue`}>
      <div className={`h-8 bg-theme-04-medium-gray`}></div>
      <div className={`grid grid-cols-12 h-16 max-w-7xl mx-auto gap-4`}>
        <div className={`flex flex-row items-center justify-center gap-4 col-span-8`}>
          <button>{menuBars(20, 20)}</button>
          <div>Logo</div>
          <div className={`w-full bg-theme-01-light-gray h-full`}>
            <form className={`relative flex flex-row w-full h-full`}>
              <button className={`absolute top-1/2 left-4 -translate-y-1/2 text-theme-07-dark-blue`}>{glass(20, 20, 2.5)}</button>
              <input type='text' placeholder='Search' className={`w-full h-full py-4 px-12 bg-transparent`} />
            </form>
          </div>
        </div>
        <div className={`flex flex-row items-center col-span-4 gap-4 text-xs h-full`}>
          <div className={`flex flex-row gap-2 flex-1`}>
            <input id='theme_switcher' type='checkbox' onClick={theme.alternateTheme} className={`cursor-pointer`}/>
            <label htmlFor='theme_switcher' className={`cursor-pointer`}>Tema</label>
          </div>
          <div className={`flex flex-row items-center h-full gap-1 flex-2`}>
            {userProfile(20, 20)}
            <div className={`flex flex-col justify-center items-start h-full gap-1 flex-[2_2_0%]`}>
              <Link href='/login' className={`hover:underline`}>Entrar</Link>
              <Link href='/register' className={`hover:underline`}>Crie sua conta</Link>
            </div>
          </div>
          <Link href='/' className={`flex items-center h-full gap-1 flex-1 justify-center px-2`} title='Favoritos'>{heart(20, 20)} Favoritos</Link>
          <Link href='/' className={`flex items-center h-full gap-1 flex-1 justify-center px-2`} title='Carrinho'>{shoppingCart(20, 20)} Carrinho</Link>
        </div>
      </div>
      <div className={`h-12 bg-theme-08-light-green`}>
        <ul className={`flex flex-row h-full gap-4 max-w-7xl mx-auto`}>
          <li><Link href='/' className={`flex items-center h-full`} title='Departamentos'>Departamentos</Link></li>
          <li><Link href='/' className={`flex items-center h-full`} title='Geladeiras'>Geladeiras</Link></li>
          <li><Link href='/' className={`flex items-center h-full`} title='Lavadoras'>Lavadoras</Link></li>
          <li><Link href='/' className={`flex items-center h-full`} title='Fogões'>Fogões</Link></li>
          <li><Link href='/' className={`flex items-center h-full`} title='Freezers'>Freezers</Link></li>
          <li><Link href='/' className={`flex items-center h-full`} title='Peças'>Peças</Link></li>
        </ul>
      </div>
    </header>
  )
}