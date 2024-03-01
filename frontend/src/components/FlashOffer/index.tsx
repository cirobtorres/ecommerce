import Image from "next/image";
import { AiFillThunderbolt } from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

type ProductShowcaseProps = {
  title: string;
  image: string;
  fullPrice: number;
  discountPrice: number;
  discountRate: number;
  installmentNumber: number;
};

export default function FlashOffer({
  productShowcase,
}: {
  productShowcase: ProductShowcaseProps;
}) {
  return (
    <>
      <article className="mx-auto grid grid-cols-2 justify-center items-center max-w-flash-offer h-96 text-white bg-theme-06 mt-1 rounded">
        <div className="flex flex-col justify-center items-center p-4">
          <AiFillThunderbolt size="3.5rem" className="text-theme-08" />
          <h1 className="text-white">
            <strong>
              <span className="text-theme-08">Oferta</span> Relâmpago
            </strong>
          </h1>
          <p className="text-xl">Produtos com descontos relâmpagos!</p>
          <p className="text-xl inline-flex items-center gap-2">
            Termina em: <LuAlarmClock size="1.25rem" /> DIAS 04:19:11
          </p>
        </div>
        <div className="grid grid-cols-2 w-3/4 h-3/4 rounded bg-white">
          <div className="relative m-4 overflow-hidden">
            <Image
              src={productShowcase.image}
              alt={productShowcase.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center h-full w-full text-sm p-4 gap-2">
            <h3 className="[display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis">
              {productShowcase.title}
            </h3>
            <span className={"flex justify-center text-xs"}>
              <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
              <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
              <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
              <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
              <FaStar size="0.9rem" fill="var(--like-star-color-unchecked)" />{" "}
              (46)
            </span>
            <div className={"flex flex-col text-theme-05 justify-between"}>
              <span className={"text-sm line-through"}>
                R$ {productShowcase.fullPrice.toFixed(2)}
              </span>
              <div className={"flex flex-row gap-2"}>
                <span className={"text-xl font-bold"}>
                  R$ {productShowcase.discountPrice.toFixed(2)}
                </span>
                <span className="flex items-center text-sm font-bold uppercase text-green-500">
                  {productShowcase.discountRate}% off
                </span>
              </div>
              <span className="text-xs">
                ou R$ {productShowcase.fullPrice.toFixed(2)} em{" "}
                {productShowcase.installmentNumber}x de R${" "}
                {(
                  productShowcase.fullPrice / productShowcase.installmentNumber
                ).toFixed(2)}
              </span>
            </div>
            <button className="text-xl font-bold text-white bg-theme-08 rounded p-1 hover:shadow-dark">
              Comprar
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
