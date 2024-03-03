const Modal = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-side-bar-transparent" />
  );
};

const displayQuickSideBar = {
  initial: { x: "-100%" },
  animate: { x: "0%" },
};

const QuickSideBar = () => {
  return (
    <>
      <Modal />
      <motion.aside
        initial="initial"
        animate="initial"
        whileHover="animate"
        variants={displayQuickSideBar}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.25 }}
        className="z-10 absolute left-0 top-0 min-w-16 max-w-[30rem] h-full flex flex-col items-start bg-white [&_a:hover]:bg-theme-08 [&_svg]:text-theme-07 [&_svg]:text-2xl"
      >
        <Link href="/" className="w-full flex items-center gap-3 p-4">
          <IoHome />
          <span className="whitespace-nowrap overflow-hidden">
            Lorem ipsum dolor sit
          </span>
        </Link>
        <Link href="/" className="w-full flex items-center gap-3 p-4">
          <FaClipboardList />
          <span className="whitespace-nowrap overflow-hidden">
            Lorem ipsum dolor sit amet
          </span>
        </Link>
        <Link href="/" className="w-full flex items-center gap-3 p-4">
          <IoHeart />
          <span className="whitespace-nowrap overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </span>
        </Link>
        <Link href="/" className="w-full flex items-center gap-3 p-4">
          <IoCartSharp />
          <span className="whitespace-nowrap overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit abra cadabra
          </span>
        </Link>
        <Link href="/" className="w-full flex items-center gap-3 p-4">
          <MdLocalShipping />
          <span className="whitespace-nowrap overflow-hidden">
            Lorem ipsum dolor sit amet
          </span>
        </Link>
        <Link href="/" className="w-full flex items-center gap-3 p-4">
          <AiFillLike />
          <span className="whitespace-nowrap overflow-hidden">
            Lorem ipsum dolor sit
          </span>
        </Link>
      </motion.aside>
    </>
  );
};
