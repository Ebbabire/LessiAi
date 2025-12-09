const Navbar = () => {
  return (
    <nav className="bg-[#1A1D21] border-b border-[#2A2F33] px-6 py-3 shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-[#F2C94C] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-[#0D0F12] font-bold text-sm">V</span>
          </div>
          <span className="font-bold text-[#F2F2F2] text-lg tracking-tight">
            VetFlow
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
