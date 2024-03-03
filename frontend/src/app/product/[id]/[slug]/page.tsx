"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, wrap } from "framer-motion";

import { BiSolidLike } from "react-icons/bi";
import { IoMdShare, IoMdHeartEmpty } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  IoHeart,
  IoCartSharp,
  IoChevronUpSharp,
  IoChevronDownSharp,
  IoShareSocialOutline,
  IoDocumentTextSharp,
} from "react-icons/io5";
import {
  FaCartArrowDown,
  FaStar,
  FaShippingFast,
  FaInfoCircle,
} from "react-icons/fa";
import { BiSolidChevronLeft } from "react-icons/bi";

import { Field } from "@/components/Field";
import { COMMENTARIES } from "@/constants/commentaryConstants";
import { CARD_SLIDER_CONSTANTS } from "@/constants/cardSliderConstants";

const name = "Venda de Peças no Varejo";
const product = CARD_SLIDER_CONSTANTS[0][0];

export default function ProductPage() {
  return (
    <main>
      <article>
        <section>
          <Breadcrumbs />
          <div className="bg-white py-16 mb-12 text-theme-04">
            <div className="mx-auto w-full max-w-webpage">
              <div className="grid grid-cols-2 gap-4">
                <ImageCarousel />
                <div>
                  <h1 className="text-3xl">
                    Geladeira Consul Frost Free Duplex 340 litros Branca com
                    Prateleiras Altura Flex - CRM39AB
                  </h1>
                  <ProductHeader />
                  <ProductPrices />
                  <PaymentMethods />
                  <Voltage />
                  <ShippingPrice />
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProductDescription
          icon={IoDocumentTextSharp}
          title="Descrição do Produto"
        />
        <ProductTechnicalDetails
          icon={FaInfoCircle}
          title="Especificações Técnicas"
        />
        <UsersReviews icon={FaStar} title="Avaliação dos Usuários" />
      </article>
    </main>
  );
}

const Breadcrumbs = () => {
  return (
    <div className="py-4 mb-6 border-b border-light-gray">
      <div className="flex mx-auto w-full max-w-webpage">
        <span className="font-bold">Você está em:</span>
        <Link href="/" className="ml-1 hover:text-theme-08">
          Home
        </Link>
        <span className="flex items-center">
          <MdChevronRight size="1.25rem" />
          <Link href="/" className="hover:text-theme-08">
            Eletrodomésticos
          </Link>
        </span>
        <span className="flex items-center">
          <MdChevronRight size="1.25rem" />
          <Link href="/" className="hover:text-theme-08">
            Refrigeradores
          </Link>
        </span>
        <span className="flex items-center">
          <MdChevronRight size="1.25rem" />
          <Link href="/" className="hover:text-theme-08">
            Refrigerador Consul CRM39AB
          </Link>
        </span>
      </div>
    </div>
  );
};

const slideImageVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
    };
  },
};

const ImageCarousel = () => {
  const [[currentImage, direction], setCurrentImage] = useState([0, 0]);
  const imagesCarousel = useRef<HTMLDivElement>(null);

  const navToImage = (newDirection: number) => {
    setCurrentImage([currentImage + newDirection, newDirection]);
  };

  const handleImagesCarousel = (direction: number) => {
    if (imagesCarousel.current) {
      if (direction > 0) {
        if (
          imagesCarousel.current.scrollLeft >=
          imagesCarousel.current.scrollWidth -
            imagesCarousel.current.offsetWidth
        ) {
          imagesCarousel.current.scrollLeft = 0;
          return;
        } else {
          imagesCarousel.current.scrollLeft +=
            imagesCarousel.current.offsetWidth;
        }
      } else {
        if (imagesCarousel.current.scrollLeft <= 0) {
          imagesCarousel.current.scrollLeft =
            imagesCarousel.current.scrollWidth -
            imagesCarousel.current.offsetWidth;
          return;
        } else {
          imagesCarousel.current.scrollLeft -=
            imagesCarousel.current.offsetWidth;
        }
      }
    }
  };

  const imageIndex = wrap(0, product.images.length, currentImage);

  return (
    <div className="flex flex-col">
      <div className="relative h-[40rem]">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={() => navToImage(-1)}
        >
          <MdChevronLeft className="text-7xl" />
        </button>
        {product.images && (
          <div className="relative h-full w-[80%] mx-auto overflow-x-hidden">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentImage}
                variants={slideImageVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="absolute w-full h-full"
              >
                <Image
                  src={product.images[imageIndex].src}
                  alt={product.images[imageIndex].alt}
                  fill
                  sizes="100%" // TODO: Change-me
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          onClick={() => navToImage(1)}
        >
          <MdChevronRight className="text-7xl" />
        </button>
      </div>
      <div className="relative px-8">
        <motion.button
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-full"
          onClick={() => handleImagesCarousel(-1)}
        >
          <MdChevronLeft className="text-5xl" />
        </motion.button>
        <div
          ref={imagesCarousel}
          className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none"
        >
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`relative min-w-28 min-h-28 rounded border cursor-pointer hover:border-theme-08 ${
                imageIndex === index ? "border-theme-08" : "border-light-gray"
              }`}
              onClick={() =>
                setCurrentImage([index, imageIndex > index ? -1 : 1])
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100%" // TODO: Change-me
                className="object-cover p-1"
              />
            </div>
          ))}
        </div>
        <motion.button
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-5xl z-10 h-full"
          onClick={() => handleImagesCarousel(1)}
        >
          <MdChevronRight className="text-5xl" />
        </motion.button>
      </div>
    </div>
  );
};

const ProductHeader = () => {
  return (
    <div className="flex items-center justify-between h-16">
      <div className="w-full flex justify-center">CONSUL</div>{" "}
      {/* It's gonna be an image */}
      <div className="w-[1px] h-8 bg-light-gray" />
      <Stars />
      <div className="w-[1px] h-8 bg-light-gray" />
      <div className="w-full flex justify-center items-center gap-3 text-3xl text-theme-03">
        <IoShareSocialOutline />
        <IoMdHeartEmpty />
      </div>
    </div>
  );
};

const ProductPrices = () => {
  return (
    <>
      <div className="mb-2">
        <span>
          Vendido e entregue por
          <strong className="ml-1">{name}</strong>
        </span>
        <span className="text-sm before:content-['|'] before:mx-1 before:text-theme-05 text-theme-08">
          <b>Em estoque</b>
        </span>
      </div>
      <div className="flex flex-col">
        <p className="flex text-sm">
          <span className="line-through">
            De: R$ {product.oldPrice.toFixed(2)}
          </span>
          <small className="ml-3 px-2 text-theme-01 bg-theme-07 rounded-full">
            <b>{product.discountNewPrice}% OFF</b>
          </small>
        </p>
        <span>
          <strong>R$ {product.fullPrice.toFixed(2)}</strong> em até{" "}
          <strong>
            {product.installmentNumber}x de R${" "}
            {(product.fullPrice / product.installmentNumber).toFixed(2)} sem
            juros
          </strong>
        </span>
        <div className="flex items-center gap-3">
          <h2 className="text-theme-07 font-extrabold text-4xl w-full flex-[2_2_0%]">
            R$ {product.discountPrice.toFixed(2)}
          </h2>
          <button
            type="button"
            className="flex items-center h-12 gap-1 text-2xl uppercase font-extrabold bg-theme-07 text-white px-6 rounded border-none outline-none"
          >
            Comprar <IoCartSharp />
          </button>
          <button
            type="button"
            className="flex items-center w-12 h-12 text-2xl justify-center bg-theme-07 text-white rounded border-none outline-none"
          >
            <FaCartArrowDown />
          </button>
        </div>
        <span>
          À vista no PIX ou cartão{" "}
          <b className="text-theme-07">({product.discountRate}% OFF)</b>
        </span>
      </div>
    </>
  );
};

const mouseOnHover = {
  initial: { x: 0 },
  animate: {
    x: "-2%",
    color: "var(--theme-08)",
  },
};

const chevronHover = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const PaymentMethods = () => {
  return (
    <motion.span
      className="relative py-4 left-0 flex items-center cursor-pointer font-extrabold w-fit"
      variants={mouseOnHover}
      initial="initial"
      whileHover="animate"
      transition={{ ease: "easeInOut", duration: 0.15 }}
    >
      <motion.span variants={chevronHover} className="absolute -left-5">
        <BiSolidChevronLeft />
      </motion.span>
      Formas de Pagamento
    </motion.span>
  );
};

const Voltage = () => {
  const [voltage, setVoltage] = useState<"110" | "220">("110");

  return (
    <div className="w-fit">
      <div className="mb-4">
        <span className="text-sm">Selecione a tensão/voltagem</span>
      </div>
      <div className="w-fit h-12 border border-light-gray rounded-full">
        <div className="flex items-center p-1 h-full">
          <div
            className={`text-center mx-1 w-12 p-1 ${
              voltage === "110"
                ? "font-extrabold text-theme-01 bg-theme-08"
                : null
            } rounded-full cursor-pointer`}
            onClick={() => setVoltage("110")}
          >
            110
          </div>
          <div
            className={`text-center mx-1 w-12 p-1 ${
              voltage === "220"
                ? "font-extrabold text-theme-01 bg-theme-08"
                : null
            } rounded-full cursor-pointer`}
            onClick={() => setVoltage("220")}
          >
            220
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingPrice = () => {
  return (
    <form className="py-4 w-3/4">
      <label htmlFor="CEP" className="flex items-center gap-2 font-bold mb-3">
        <FaShippingFast /> Calcule o valor do frete para sua região
      </label>
      <div className="flex gap-3">
        <Field.Root>
          <Field.Content.Input
            id="CEP"
            name="cep"
            mask="cep"
            bgColor="bg-white"
            placeholder="Ex. 12345-600"
          >
            <Field.Content.Label label="CEP" />
          </Field.Content.Input>
        </Field.Root>
        <button
          type="button"
          className="p-3 font-extrabold text-white bg-theme-07 rounded hover:shadow-dark"
        >
          Calcular
        </button>
      </div>
    </form>
  );
};

const chevronDownVariants = {
  initial: { rotate: 0, transition: { rotate: { duration: 0.3 } } },
  animate: { rotate: 180, transition: { rotate: { duration: 0.3 } } },
};

const openSectionVariants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        duration: 0.3,
      },
      opacity: { delay: 0.3, ease: "easeInOut", duration: 0.15 },
    },
  },
};

const NewSectionBody = ({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section>
      <div className="bg-white py-6 mb-12 text-theme-04">
        <div className="mx-auto w-full max-w-webpage">
          <motion.button
            type="button"
            className="flex items-center justify-between w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h3 className="flex items-center gap-3 uppercase font-extrabold">
              <Icon className="text-theme-07" />
              {title}
            </h3>
            <motion.div
              initial="initial"
              animate={isOpen ? "animate" : "initial"}
              variants={chevronDownVariants}
            >
              <IoChevronDownSharp className="text-3xl text-theme-07" />
            </motion.div>
          </motion.button>
        </div>
        <motion.div
          initial="initial"
          animate={isOpen ? "animate" : "initial"}
          variants={openSectionVariants}
          className="mx-auto w-full max-w-webpage"
        >
          <div className="py-8">{isOpen && children}</div>
        </motion.div>
      </div>
    </section>
  );
};

type NewSectionProps = {
  icon: React.ElementType;
  title: string;
};

const ProductDescription = (props: NewSectionProps) => {
  return (
    <NewSectionBody {...props}>
      <div>
        <p>
          <span>
            <strong>Características</strong>
          </span>
        </p>
        <p>Body</p>
      </div>
      <div>
        <p>
          <span>
            <strong>Conteúdo da Embalagem</strong>
          </span>
        </p>
        <p>Body</p>
      </div>
      <div>
        <p>
          <span>
            <strong>Garantia</strong>
          </span>
        </p>
        <p>Body</p>
      </div>
    </NewSectionBody>
  );
};

const tabSelectedVariants = {};

const ProductTechnicalDetails = (props: NewSectionProps) => {
  const [tabSelected, setTabSelected] = useState<"dimensions" | "specs">(
    "dimensions"
  );
  return (
    <NewSectionBody {...props}>
      <div>
        <motion.ul className="flex gap-3">
          <li>
            <button onClick={() => setTabSelected("dimensions")}>
              Dimensões
            </button>
          </li>
          <li>
            <button onClick={() => setTabSelected("specs")}>
              Especificações
            </button>
          </li>
        </motion.ul>
      </div>
    </NewSectionBody>
  );
};

const UsersReviews = (props: NewSectionProps) => {
  return (
    <NewSectionBody {...props}>
      <div>
        <div className="w-2/3 mx-auto flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col justify-center">
              <p className="text-center">
                <strong className="text-7xl">4.6</strong>
                <span className="font-bold text-2xl">/5</span>
              </p>
              <Stars />
            </div>
            <div className="flex justify-center">
              <CircleSVG
                percentage={87}
                header="dos clientes recomendam este produto"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MainCommentary
              positive
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                  doloribus minus quam facilis veritatis non ullam officia cum
                  illum ut saepe libero, perferendis nostrum quibusdam quisquam
                  et in architecto sequi?"
            />
            <MainCommentary
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                  doloribus minus quam facilis veritatis non ullam officia cum
                  illum ut saepe libero, perferendis nostrum quibusdam quisquam
                  et in architecto sequi? Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Eos doloribus minus quam facilis
                  veritatis?"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between my-4">
            <h4 className="text-xl">Avaliações recentes</h4>
            <label htmlFor="user-rating-select">
              <span className="mr-4">Ordenar por:</span>
              <select
                name=""
                id="user-rating-select"
                className="border border-light-gray rounded p-4 cursor-pointer" // [-webkit-appearance:none] [-moz-appearance:none]
              >
                <option value="">Mais recentes</option>
                <option value="">Positivas</option>
                <option value="">Negativas</option>
                <option value="">Mais úteis</option>
              </select>
            </label>
          </div>
          <Commentaries commentaries={COMMENTARIES} />
          <CommentariesPagination pages={9} />
        </div>
      </div>
    </NewSectionBody>
  );
};

interface MainCommentaryProps {
  text: string;
  positive?: boolean;
}

const MainCommentary = ({ text, positive = false }: MainCommentaryProps) => {
  return (
    <div className="border border-light-gray rounded">
      <div className="flex flex-col items-center p-8 gap-3">
        {positive ? (
          <>
            <BiSolidLike className="text-2xl" />
            <span>Avaliação positiva mais votada</span>
          </>
        ) : (
          <>
            <BiSolidLike className="text-2xl rotate-180" />
            <span>Avaliação negativa mais votada</span>
          </>
        )}

        <Stars />
        <p>{text}</p>
      </div>
    </div>
  );
};

const CircleSVG = ({
  header,
  percentage = 0,
}: {
  header?: string;
  percentage: number;
}) => {
  const strokeDashOffset = 264 - (264 * percentage) / 100;
  return (
    <div className="relative w-full h-24 flex flex-row gap-3 justify-center items-center">
      <div className="relative">
        <svg className="relative w-24 h-24 -rotate-90">
          <circle
            cx="48" // half the size of the svg (in pixels)
            cy="48" // half the size of the svg (in pixels)
            r="42"
            className="w-fit h-fit fill-none stroke-[8] stroke-[var(--very-light-gray)] [stroke-dasharray:264] [stroke-dashoffset:0]"
          ></circle>
          <circle
            cx="48" // half the size of the svg (in pixels)
            cy="48" // half the size of the svg (in pixels)
            r="42"
            className="w-fit h-fit fill-none stroke-[8] stroke-[var(--like-star-color-checked)] [stroke-dasharray:264]"
            style={{ strokeDashoffset: strokeDashOffset }}
          ></circle>
        </svg>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 [&_h2]:text-xl [&_span]:text-sm [&_span]:font-normal">
          <h2>
            {percentage}
            <span>%</span>
          </h2>
        </div>
      </div>
      {header && <h2 className="text-base font-normal">{header}</h2>}
    </div>
  );
};

interface CommentariesProps {
  name: string;
  date: string;
  commentary: string;
  recommended: boolean;
  helpful: number;
}

const Commentaries = ({
  commentaries,
}: {
  commentaries: CommentariesProps[];
}) => {
  return (
    <div>
      {commentaries.map(
        ({ name, date, commentary, recommended, helpful }, index) => (
          <div
            key={index}
            className="relative flex flex-row gap-3 border-t border-b border-light-gray my-[-1px] pt-14 pb-8 items-center"
          >
            <div className="min-w-80 text-center mb-auto mt-0 text-theme-03">
              <h6 className="font-extrabold">{name}</h6>
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="absolute top-4 translate-y-1/2">
                <Stars />
              </div>
              <p>{commentary}</p>
              <div className="flex justify-between">
                <span>
                  <b>
                    Eu {recommended ? " " : "não "}
                    recomendo este produto
                  </b>
                </span>
                <span className="flex gap-3 text-theme-03 text-sm items-center">
                  Esta avaliação foi útil?{" "}
                  <button className="text-lg cursor-pointer">
                    <BiSolidLike />
                  </button>
                  {helpful}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const CommentariesPagination = ({ pages }: { pages: number }) => {
  return (
    <div className="flex justify-center mb-8 mt-20">
      <ul className="flex gap-3 text-theme-03 font-extrabold">
        {[...Array(pages)].map((_, index) => (
          <li key={index}>
            <button>{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Stars = () => {
  return (
    <span className={"w-full flex justify-center text-xs text-theme-03"}>
      <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
      <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
      <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
      <FaStar size="0.9rem" fill="var(--like-star-color-checked)" />{" "}
      <FaStar size="0.9rem" fill="var(--like-star-color-unchecked)" />
      <span>(46)</span>
    </span>
  );
};
