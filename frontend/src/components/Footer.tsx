const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 mx-1 rounded-sm">
      <div className=" container mx-auto flex  justify-between items-center">
        <span className=" text-3xl text-white font-bold tracking-tight flex gap-4">
          MernHolidays.com
        </span>
        <span>
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
