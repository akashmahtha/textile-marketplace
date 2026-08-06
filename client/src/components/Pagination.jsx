const Pagination = ({ page, pages, changePage }) => {

    if (pages <= 1) return null;

    return (

        <nav className="mt-5">

            <ul className="pagination justify-content-center">

                {/* Previous */}

                <li
                    className={`page-item ${page === 1 ? "disabled" : ""}`}
                >

                    <button
                        className="page-link"
                        onClick={() => changePage(page - 1)}
                    >
                        Previous
                    </button>

                </li>

                {/* Numbers */}

                {[...Array(pages).keys()].map((x) => (

                    <li
                        key={x + 1}
                        className={`page-item ${page === x + 1 ? "active" : ""
                            }`}
                    >

                        <button
                            className="page-link"
                            onClick={() => changePage(x + 1)}
                        >
                            {x + 1}
                        </button>

                    </li>

                ))}

                {/* Next */}

                <li
                    className={`page-item ${page === pages ? "disabled" : ""
                        }`}
                >

                    <button
                        className="page-link"
                        onClick={() => changePage(page + 1)}
                    >
                        Next
                    </button>

                </li>

            </ul>

        </nav>

    );

};

export default Pagination;