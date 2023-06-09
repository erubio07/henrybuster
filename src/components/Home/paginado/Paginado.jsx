import style from "./Paginado.module.css";

function Paginado({ pages, currentPage, split }) {
  // console.log(pages);
  // console.log(currentPage);
  const handleButtonClick = (e) => {
    const pageNumber = parseInt(e.target.value);
    split(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      split(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < 17) {
      split(currentPage + 1);
    }
  };

  return (
    <div className={style.container}>
      <button onClick={handlePrevClick} className={style.button}>
        Prev
      </button>
      {pages &&
        pages.map((number) => (
          <button
            key={number}
            value={number}
            onClick={handleButtonClick}
            className={`${style.button} ${
              currentPage === number ? style.selectedButton : ""
            }`}
          >
            {number}
          </button>
        ))}
      <button onClick={handleNextClick} className={style.button}>
        Next
      </button>
    </div>
  );
}

export default Paginado;
