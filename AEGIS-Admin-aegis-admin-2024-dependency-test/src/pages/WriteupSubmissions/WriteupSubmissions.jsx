import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Table from "../../components/Table";
import TableStatus from "../../components/Status";
import Spinner from "../../components/Spinner";

import { format, parseISO } from "date-fns";
import { Users } from "../../services";
import Modal from "./components/Modal";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Section = styled.section``;

const TableSection = styled.section``;

const TableContainer = styled.div`
  width: calc(100% - 17.5vw);
  height: auto;
  padding: 0 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  max-width: 200px;
  overflow-y: auto;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Id = styled.p`
  font-weight: 700;
`;
const Slug = styled.p`
  cursor: pointer;
  font-weight: 700;
  color: #001196;
  text-decoration: none;
  transition: all 0.4s ease;

  :hover {
    color: #000a59;
  }
`;
const Tag = styled.div`
  height: auto;
  width: auto;
  padding: 0.4rem 0.8rem;
  margin: 0 0.4rem;
  border: 1.5px solid #d5a76b;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  color: #d5a76b;
`;

const sortOptions = [
  { value: "writeup.date_submitted", label: "Date Submitted" },
  { value: "academic_information.realschool", label: "School" },
  { value: "username", label: "ID Number" },
  { value: "last_name", label: "Name" },
  {
    value: "academic_information.primary_course_string",
    label: "Year & Course",
  },
  { value: "writeup.status", label: "Status" },
];

const IDs = ({ value }) => {
  return (
    <TagContainer>
      <Id>{value}</Id>
    </TagContainer>
  );
};

const Links = ({ value }) => {
  return (
    <TagContainer>
      <Slug to={`/writeups/${value}`}>{value}</Slug>
    </TagContainer>
  );
};

const Course = ({ value }) => {
  return (
    <TagContainer>
      <p>
        {value?.year_level} {value?.primary_course}
      </p>
    </TagContainer>
  );
};

const Comment = ({ value }) => {
  return(
    <TagContainer>
      { value ? value : null}
    </TagContainer>
  );
};

const Date = ({ value }) => {
  return (
    <TagContainer>
      {value && <p>{format(parseISO(value), "MMMM dd, yyyy")}</p>}
    </TagContainer>
  );
};

const Status = ({ value }) => {
  if (value?.toLowerCase() == "pending") {
    return (
      <TagContainer>
        <TableStatus type="default" text={value} />
      </TagContainer>
    );
  } else if (value?.toLowerCase() == "approved") {
    return (
      <TagContainer>
        <TableStatus type="success" text={value} />
      </TagContainer>
    );
  } else if (
    value?.toLowerCase() == "declined" ||
    value?.toLowerCase() == "rejected"
  ) {
    return (
      <TagContainer>
        <TableStatus type="failure" text={value} />
      </TagContainer>
    );
  } else if (value?.toLowerCase() == "empty") {
    return (
      <TagContainer>
        <TableStatus type="failure" text={value} />
      </TagContainer>
    );
  } else if (value?.toLowerCase() == "draft") {
    return (
      <TagContainer>
        <TableStatus type="failure" text={value} />
      </TagContainer>
    );
  }
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function WriteupSubmissions() {
  // const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(100);
  const [pageLoading, setPageLoading] = useState(true);
  const [limit, setLimit] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    Users.index(1, limit, 1, null, null).then((data) => {
      setData(data);
      setPageLoading(false);
    });
    Users.writeupCount().then((data) =>
      setPageCount(Math.ceil(data.length / limit))
    );
  }, []);

  const selectWriteupHandler = (id) => {
    setSelectedWriteup(data?.filter((user) => user.id == id));
    setModalActive(!modalActive);
  };

  const changeStatusHandler = (id, status) => {
    const changedData = data.map((user) => {
      if (user.writeup.id === id)
        return {
          ...user,
          writeup: { ...user.writeup, status: status },
        };
      return user;
    });
    setData(changedData);
  };

  // Search and Sort
  const [currentSort, setCurrentSort] = useState(null);
  const [searchData, setSearchData] = useState(null);

  // Sort
  const handleSortChange = (e) => {
    const value = e.value;
    setPageLoading(true);

    if (value == "writeup.date_submitted") {
      // Run query date
      Users.index(1, limit, 1, "date", searchData ? searchData : null)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched sort");
          }
        });
      setCurrentSort("date");
    } else if (value == "academic_information.realschool") {
      // Run school query
      Users.index(1, limit, 1, "realschool", searchData ? searchData : null)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched sort");
          }
        });
      setCurrentSort("school");
    } else if (value === "academic_information.primary_course_string") {
      // Run course query
      Users.index(1, limit, 1, "course", searchData ? searchData : null)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched sort");
          }
        });
      setCurrentSort("course");
    } else if (value == "writeup.status") {
      // Run writeup query
      Users.index(1, limit, 1, "writeup", searchData ? searchData : null)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched sort");
          }
        });
      setCurrentSort("writeup");
    } else if (value == "username") {
      // Run id query
      Users.index(1, limit, 1, "id_number", searchData ? searchData : null)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched sort");
          }
        });
      setCurrentSort("id_number");
    } else if (value === "last_name") {
      // Run Name query
      Users.index(1, limit, 1, "last_name", searchData ? searchData : null)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched sort");
          }
        });
      setCurrentSort("last_name");
    }
    setCurrentPage(0);
  };

  // Search
  const handleSearchChange = () => {
    //  If a sort is not set
    setPageLoading(true);
    Users.writeupCount(searchData).then((data) => {
      setPageCount(Math.ceil(data.length / limit));
    });
    if (!currentSort) {
      // search like normal
      Users.index(1, limit, 1, null, searchData)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched search");
          }
        });
    } else {
      // search with sort
      Users.index(1, limit, 1, currentSort, searchData)
        .then((data) => {
          setData(data);
          setPageLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("ditched search");
          }
        });
    }
    setCurrentPage(0);
  };

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected);
    const currentPage = data.selected + 1;
    setPageLoading(true);
    Users.index(
      currentPage,
      limit,
      1,
      currentSort ? currentSort : null,
      searchData ? searchData : null
    )
      .then((data) => {
        setData(data);
        setPageLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("ditched page click");
        }
      });
  };

  const [modalActive, setModalActive] = useState(false);
  const [selectedWriteup, setSelectedWriteup] = useState(null);

  // Stop scroll when modal is open
  useEffect(() => {
    if (modalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, modalActive);

  const ExportButtonHandler = async () => {
    process.env.NODE_ENV === "development"
      ? (window.location.href = "http://localhost:8000/api/download-writeups/")
      : (window.location.href =
          "https://aegis-dj.ateneo.edu/api/download-writeups/");
  };
  const tableColumns = useMemo(
    () => [
      {
        Header: "Date Submitted",
        accessor: "writeup.date_submitted", // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => <Date value={value} />,
      },
      {
        Header: "School",
        accessor: "academic_information.realschool",
      },
      {
        Header: "ID Number",
        accessor: "username",
        Cell: ({ cell: { value } }) => <IDs value={value} />,
      },
      {
        Header: "Name",
        accessor: "id",
        Cell: (row) => {
          // Content moved to Table.jsx due to library on click bug (hacky fix)
          return null;
        },
      },
      {
        Header: "Year & Course",
        accessor: "academic_information",
        Cell: ({ cell: { value } }) => <Course value={value} />,
      },
      {
        Header: "Comment",
        accessor: "writeup.comment",
        Cell: ({ cell: { value } }) => <Comment value={value} />,
      },
      {
        Header: "Status",
        accessor: "writeup.status",
        Cell: ({ cell: { value } }) => <Status value={value} />,
      },
    ],
    []
  );

  const [columns, setColumns] = useState(tableColumns);

  return (
    <>
      <Section>
        <Header dashboard={false} pageLabel="Writeup Submissions" />
        <Filter
          data={data}
          handleSortChange={handleSortChange}
          handleSearchChange={handleSearchChange}
          sortOptions={sortOptions}
          exportButton={ExportButtonHandler}
          setSearchData={setSearchData}
          searchData={searchData}
        ></Filter>
      </Section>

      <div style={{ marginRight: "5rem" }}>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={currentPage}
          containerClassName={"pagination justify-content-end"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>

      <TableSection>
        <TableContainer>
          {!pageLoading ? (
            <>
              <Table
                columns={columns}
                data={data}
                selectWriteupHandler={selectWriteupHandler}
              />
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </TableContainer>
      </TableSection>
      {modalActive ? (
        <Modal
          users={data}
          changeStatusHandler={changeStatusHandler}
          selectedWriteup={selectedWriteup}
          setSelectedWriteup={setSelectedWriteup}
          onExit={() => setModalActive(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default WriteupSubmissions;
