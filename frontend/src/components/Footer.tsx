const Footer = () => {
  return (
    <div className="mt-28 border-t border-gray-500 flex flex-col items-center space-y-4">
      <p className="mt-4 text-sm text-white">
        Made by <span className="font-semibold">Subahanumanth</span>
      </p>
      <div className="flex space-x-4">
        <a
          href="https://www.linkedin.com/in/subahanumanth-sekar-5abb69187"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#0077B5] transition duration-200"
        >
          <img
            src="../../public/linkedin.png"
            alt="LinkedIn"
            className="w-4 h-4"
          />
        </a>
        <a
          href="https://github.com/subahanumanth"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#0077B5] transition duration-200"
        >
          <img src="../../public/github.png" alt="GitHub" className="w-4 h-4" />
        </a>
        <a
          href="mailto:subahanu1999@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#0077B5] transition duration-200"
        >
          <img src="../../public/gmail.png" alt="Gmail" className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
