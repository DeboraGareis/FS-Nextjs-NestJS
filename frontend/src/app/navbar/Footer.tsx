const Footer = () => {
  return (
    <footer className="p-8 w-start-3 flex flex-wrap items-start justify-around ">
      <ul className="list-none list-inside">
        <p className="pb-4 font-semibold">Nosotros</p>
        <li>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            ...Nosotros...
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            ...Nosotros...
          </a>
        </li>
      </ul>
      {/* C */}
      <ul className="list-none list-inside">
        <p className="pb-4 font-semibold">Contacto</p>
        <li>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            ...Contacto...
          </a>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
