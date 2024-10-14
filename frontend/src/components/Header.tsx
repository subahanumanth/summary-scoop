const Header = () => {
  return (
    <div className="flex items-center space-x-1 mb-20">
      <img src="/logo.png" alt="ice-cream" className="w-5 h-5" />
      <h1
        className="text-transparent bg-clip-text bg-gradient-to-r
          from-[#C07EFF] via-[#FF729F] to-[#F5B867] font-bold text-1xl"
      >
        Summary Scoop
      </h1>
    </div>
  );
};

export default Header;
