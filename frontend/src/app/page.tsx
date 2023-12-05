import React from 'react'
import ProductCard from '@/components/ProductCard'

export default function Home (): JSX.Element {
  return (
    <div className={'flex justify-center items-center gap-4 p-4 h-full'}>{/* Essas classes são temporárias */}
      <ProductCard 
        title='Válvula de serviço para lavadora Consul CWE11B' 
        image='/images/valvula-de-servico.jpg'
        units={8}
        fullPrice={99.99}
        discountPrice={89.99}
        discountRate={10}
        installmentNumber={3}
        installmentValue={29.99}
      />
      <ProductCard
        title='Termostato para geladeira Consul CRM39A'
        image='/images/termostato.jpg'
        units={99}
        fullPrice={224.99}
        discountPrice={199.99}
        discountRate={10}
        installmentNumber={12}
        installmentValue={16.66}
      />
      <ProductCard
        title='Pressostato 4 níveis para lavadora facility flash wash Brastemp BWL11ABBNA 110V-220V'
        image='/images/pressostato-4-niveis.jpg'
        units={19}
        fullPrice={130}
        discountPrice={110}
        discountRate={15}
        installmentNumber={6}
        installmentValue={18.33}
      />
      <ProductCard
        title='Atuador do freio para lavadora Electrolux LAC16'
        image='/images/atuador-do-freio.jpg'
        units={11}
        fullPrice={85}
        discountPrice={75}
        discountRate={12}
        installmentNumber={4}
        installmentValue={18.75}
      />
    </div>
  )
}
