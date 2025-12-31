type Props = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
};
const Pagination = ({ page, pages, onChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center pb-5">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}>
            <button
              onClick={() => onChange(number)}
              className="flex justify-center items-center cursor-pointer"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
