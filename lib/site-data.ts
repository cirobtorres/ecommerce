export const contact = {
  phone: "(11) 4878-6500",
  phoneHref: "tel:+551148786500",
  whatsapp: "+55 11 97678-3859",
  whatsappHref: "https://wa.me/5511976783859",
  email: "suporte@totalcad.com.br",
};

export const navLinks = [
  { id: "softwares", label: "Softwares", href: "#softwares" },
  { id: "solucoes", label: "Soluções", href: "#solucoes" },
  { id: "sobre", label: "Sobre", href: "#sobre" },
  { id: "cursos", label: "Cursos", href: "#cursos" },
  { id: "clientes", label: "Clientes", href: "#clientes" },
  { id: "duvidas", label: "Dúvidas", href: "#duvidas" },
];

export const brands = [
  { id: "zwcad", name: "ZWCAD" },
  { id: "sketchup", name: "SketchUp" },
  { id: "vray", name: "V-Ray" },
  { id: "enscape", name: "Enscape" },
  { id: "corona", name: "Corona" },
  { id: "archline", name: "ARCHLine.XP" },
  { id: "zw3d", name: "ZW3D" },
  { id: "veras", name: "Veras" },
  { id: "vantage", name: "Vantage" },
];

export const stats = [
  { id: "years", value: "+20", label: "anos no Brasil" },
  { id: "clients", value: "+755 mil", label: "clientes atendidos" },
  { id: "pros", value: "+16 mil", label: "profissionais de AEC" },
  { id: "official", value: "100%", label: "softwares oficiais" },
];

export type ChallengeIcon = "pen" | "box" | "sparkles" | "factory";

export const challenges: {
  id: string;
  icon: ChallengeIcon;
  title: string;
  description: string;
  products: string[];
}[] = [
  {
    id: "2d-3d",
    icon: "pen",
    title: "Desenho 2D e 3D",
    description:
      "Detalhamento técnico em DWG, totalmente compatível com AutoCAD®.",
    products: ["ZWCAD"],
  },
  {
    id: "bim",
    icon: "box",
    title: "Modelagem e BIM",
    description:
      "Modelos 3D e projetos arquitetônicos conectados em um só fluxo.",
    products: ["SketchUp", "ARCHLine.XP"],
  },
  {
    id: "render",
    icon: "sparkles",
    title: "Render realista",
    description: "Imagens e animações fotorrealistas em tempo real ou com IA.",
    products: ["V-Ray", "Enscape", "Veras"],
  },
  {
    id: "industry",
    icon: "factory",
    title: "Projeto industrial",
    description: "CAD/CAM 3D para peças, moldes, montagens e usinagem CNC.",
    products: ["ZW3D"],
  },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  maker: string;
  title: string;
  description: string;
  image: string;
  layout: "feature" | "wide" | "tall" | "small";
};

export const products: Product[] = [
  {
    id: "zwcad",
    name: "ZWCAD",
    category: "CAD",
    maker: "ZWSOFT",
    title: "DWG nativo para desenho técnico",
    description:
      "Abre e salva arquivos do AutoCAD®, aceita LISP e APIs. Licença permanente, sem mensalidade.",
    image: "/images/product-cad.png",
    layout: "feature",
  },
  {
    id: "vray",
    name: "V-Ray",
    category: "Render",
    maker: "Chaos",
    title: "O padrão dos estúdios de visualização",
    description: "Render fotorrealista para arquitetura, interiores e produto.",
    image: "/images/product-render.png",
    layout: "wide",
  },
  {
    id: "sketchup",
    name: "SketchUp",
    category: "Modelagem 3D",
    maker: "Trimble",
    title: "Modelagem 3D direta",
    description: "Ideal para arquitetura e interiores.",
    image: "/images/product-model.png",
    layout: "small",
  },
  {
    id: "enscape",
    name: "Enscape",
    category: "Render",
    maker: "Chaos",
    title: "Render em tempo real",
    description: "Visualize direto no seu modelo.",
    image: "/images/ecosystem-house.png",
    layout: "small",
  },
  {
    id: "archline",
    name: "ARCHLine.XP",
    category: "BIM",
    maker: "CADLine",
    title: "BIM para arquitetura e interiores",
    description: "Plantas, cortes, documentação e modelo 3D em um fluxo único.",
    image: "/images/hero-bim.png",
    layout: "wide",
  },
  {
    id: "veras",
    name: "Veras",
    category: "Render IA",
    maker: "Chaos",
    title: "Render com IA generativa",
    description: "Novas ideias a partir do seu modelo 3D.",
    image: "/images/product-render.png",
    layout: "small",
  },
  {
    id: "zw3d",
    name: "ZW3D",
    category: "Engenharia",
    maker: "ZWSOFT",
    title: "CAD/CAM 3D industrial",
    description: "Licença permanente para a indústria.",
    image: "/images/product-industry.png",
    layout: "small",
  },
  {
    id: "corona",
    name: "Corona",
    category: "Render",
    maker: "Chaos",
    title: "Fotorrealismo sem complicação",
    description: "Para 3ds Max® e Cinema 4D®.",
    image: "/images/product-model.png",
    layout: "small",
  },
  {
    id: "vantage",
    name: "Chaos Vantage",
    category: "Render",
    maker: "Chaos",
    title: "Cenas pesadas em tempo real",
    description: "Explore cenas V-Ray sem esperar.",
    image: "/images/ecosystem-house.png",
    layout: "small",
  },
];

export const plugins = ["ZWMech", "TOPOCAD", "OOB", "Skatter"];

export const partners = ["ZWSOFT", "Trimble", "Chaos", "CADLine"];

export const aboutHighlights = [
  { id: "certified", label: "Distribuidora oficial certificada" },
  { id: "invoice", label: "Nota fiscal e licença original" },
  { id: "support", label: "Suporte humano em português" },
  { id: "public", label: "Atendimento a licitações e setor público" },
];

export type SegmentIcon = "building" | "hardhat" | "factory" | "graduation";

export const segments: {
  id: string;
  icon: SegmentIcon;
  title: string;
  description: string;
  label: string;
  products: string;
}[] = [
  {
    id: "architecture",
    icon: "building",
    title: "Arquitetura e interiores",
    description:
      "Modelagem, BIM e render fotorrealista para transformar apresentações em aprovações de projeto.",
    label: "Recomendados",
    products: "SketchUp · ARCHLine.XP · V-Ray · Enscape",
  },
  {
    id: "construction",
    icon: "hardhat",
    title: "Construtoras e engenharia",
    description:
      "Documentação de obra em DWG com compatibilidade AutoCAD®, produtividade alta e custo previsível.",
    label: "Recomendados",
    products: "ZWCAD · ARCHLine.XP · Enscape",
  },
  {
    id: "industry",
    icon: "factory",
    title: "Indústria e manufatura",
    description:
      "Projeto de peças, montagens, moldes e usinagem CNC com licença permanente, sem assinatura mensal.",
    label: "Recomendados",
    products: "ZW3D · ZWCAD",
  },
  {
    id: "education",
    icon: "graduation",
    title: "Ensino e setor público",
    description:
      "Licenças originais com nota fiscal para universidades, institutos e órgãos públicos, com apoio em licitações.",
    label: "Atende",
    products: "Portfólio completo · licenças educacionais",
  },
];

export const clients = [
  "Honeywell",
  "Hitachi",
  "LG",
  "Gensler",
  "Zaha Hadid",
  "Foster + Partners",
  "Siemens",
  "Bosch",
];

export type BenefitIcon =
  | "badge"
  | "users"
  | "card"
  | "graduation"
  | "headset"
  | "shield";

export const benefits: {
  id: string;
  icon: BenefitIcon;
  title: string;
  description: string;
}[] = [
  {
    id: "official",
    icon: "badge",
    title: "Distribuidora oficial",
    description:
      "Mais de duas décadas representando os principais fabricantes de software de projeto.",
  },
  {
    id: "clients",
    icon: "users",
    title: "+755 mil clientes",
    description:
      "Autônomos, escritórios e construtoras que confiam no nosso atendimento.",
  },
  {
    id: "payment",
    icon: "card",
    title: "Pagamento facilitado",
    description:
      "PIX, boleto parcelado ou cartão em até 12x para caber no seu planejamento.",
  },
  {
    id: "training",
    icon: "graduation",
    title: "Treinamento incluso no ecossistema",
    description: "Plataforma EAD própria e cursos certificados de SketchUp.",
  },
  {
    id: "support",
    icon: "headset",
    title: "Suporte humano",
    description: "Gente de verdade, em português, para resolver suas dúvidas.",
  },
  {
    id: "original",
    icon: "shield",
    title: "100% original",
    description:
      "Licenciamento oficial com nota fiscal e segurança jurídica para sua empresa.",
  },
];

export type CourseIcon = "monitor" | "presentation" | "award" | "graduation";

export const courses: {
  id: string;
  icon: CourseIcon;
  title: string;
  description: string;
}[] = [
  {
    id: "ead",
    icon: "monitor",
    title: "Cursos online (EAD)",
    description:
      "ZWCAD, ARCHLine.XP, SketchUp, V-Ray, Enscape, Corona e ZW3D com aulas gravadas e certificado.",
  },
  {
    id: "live",
    icon: "presentation",
    title: "Presencial ou ao vivo",
    description:
      "Na sua empresa, individual ou em turma online, com o instrutor acompanhando sua tela.",
  },
  {
    id: "sketchup",
    icon: "award",
    title: "SketchUp certificado",
    description:
      "Trilhas certificadas, do básico ao avançado, oferecidas pela distribuidora oficial.",
  },
  {
    id: "education",
    icon: "graduation",
    title: "Licenças educacionais",
    description:
      "Capacitação e licenças para universidades e institutos prepararem alunos para o mercado.",
  },
];

export const steps = [
  {
    id: "choose",
    title: "Escolha o software",
    description:
      "Encontre a ferramenta de CAD, BIM, 3D ou render certa para o seu projeto.",
  },
  {
    id: "trial",
    title: "Teste grátis",
    description:
      "Use a versão de avaliação e confirme na prática se atende o seu fluxo.",
  },
  {
    id: "talk",
    title: "Converse com um especialista",
    description:
      "Receba indicação personalizada e a melhor condição de pagamento.",
  },
  {
    id: "buy",
    title: "Compre com nota fiscal",
    description:
      "Licença oficial, nota fiscal e suporte em português no pós-venda.",
  },
];

export const faqs = [
  {
    id: "trial",
    question: "Como funciona a avaliação gratuita?",
    answer:
      'Cada software possui um período de teste gratuito. Acesse a página do produto, clique em "Avaliar grátis" e siga o passo a passo indicado.',
  },
  {
    id: "invoice",
    question: "Os softwares são vendidos com nota fiscal?",
    answer:
      "Sim. Como distribuidora oficial, todas as licenças são originais e acompanham nota fiscal emitida para você ou sua empresa.",
  },
  {
    id: "payment",
    question: "Quais formas de pagamento estão disponíveis?",
    answer:
      "PIX com desconto, boleto parcelado e cartão de crédito em até 12x. Um especialista pode indicar a melhor opção para o seu caso.",
  },
  {
    id: "license",
    question: "A licença é permanente ou por assinatura?",
    answer:
      "Varia conforme o produto. ZWCAD e ZW3D oferecem licença permanente. SketchUp e as soluções Chaos (V-Ray, Enscape, Corona, Vantage e Veras) são por assinatura.",
  },
  {
    id: "support",
    question: "Existe suporte depois da compra?",
    answer:
      "Sim. Nossa equipe atende em português e ajuda com instalação, ativação e uso do software no dia a dia.",
  },
  {
    id: "autocad",
    question: "Uso AutoCAD®. Perco meus arquivos se migrar?",
    answer:
      "Não. O ZWCAD trabalha com DWG nativo, abrindo e salvando os mesmos arquivos sem conversão. A interface é familiar e nossos cursos ajudam a equipe na transição.",
  },
  {
    id: "public",
    question: "Vocês atendem órgãos públicos e licitações?",
    answer:
      "Sim. Atendemos prefeituras, universidades, institutos federais e empresas públicas, com apoio em licitações, pregões e dispensas.",
  },
  {
    id: "courses",
    question: "Há cursos e treinamentos?",
    answer:
      "Sim. Temos plataforma EAD própria, turmas ao vivo, treinamentos presenciais e cursos certificados de SketchUp, todos com certificado.",
  },
  {
    id: "choose",
    question: "Não sei qual software escolher. E agora?",
    answer:
      "Chame um especialista no WhatsApp. Entendemos o seu tipo de projeto e indicamos a solução ideal, sem compromisso.",
  },
];

export const paymentMethods = [
  { id: "pix", label: "PIX com desconto" },
  { id: "boleto", label: "Boleto parcelado" },
  { id: "card", label: "Cartão em até 12x" },
  { id: "flags", label: "Visa, Mastercard e Amex" },
];

export const footerColumns = [
  {
    id: "softwares",
    title: "Softwares",
    links: [
      "ZWCAD",
      "SketchUp",
      "V-Ray",
      "Enscape",
      "Corona",
      "ZW3D",
      "Chaos Vantage",
    ],
  },
  {
    id: "more",
    title: "Mais",
    links: [
      "ARCHLine.XP",
      "Veras",
      "Plugins",
      "Cursos e treinamentos",
      "Setor público",
      "Blog",
    ],
  },
];
