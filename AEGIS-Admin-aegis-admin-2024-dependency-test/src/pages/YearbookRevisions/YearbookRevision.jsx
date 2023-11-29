import React, { useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import { store } from "react-notifications-component";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Table from "../../components/Table";
import TableStatus from "../../components/Status";
import styled from "styled-components";
import Spinner from "../../components/Spinner";

import { format, parseISO } from "date-fns";
import { useQuery } from 'react-query';
import { Users } from "../../services";

const Section = styled.section``;
const TableSection = styled.section``;
const TagContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    max-width: 200px;
    overflow-Y: auto;

    /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
`;
const Id = styled.p`
    font-weight: 700;
`;
const Slug = styled(Link)`
    font-weight: 700;
    color: #001196;
    text-decoration: none;
    transition: all 0.4s ease;

    :hover {
        color: #000A59;
    }
`;
const Tag = styled.div`
    height: auto;
    width: auto;
    padding: 0.4rem 0.8rem;
    margin: 0 0.4rem;
    border: 1.5px solid #D5A76B;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 1.2rem;
    text-align: center;
    text-transform: uppercase;
    color: #D5A76B;
`;

const sortOptions = [
    { value: "yearbook.date_submitted", label: "Date Submitted"},
    { value: "academic_information.school", label: "School"},
    { value: "username", label: "ID Number"},
    { value: "last_name", label: "Name"},
    { value: "academic_information.primary_course_string", label: "Year & Course"},
    { value: "yearbook.status", label: "Status"}
]

const IDs = ({ value }) => {
    return (
        <TagContainer>
            <Id>{value}</Id>
        </TagContainer>
    )
}

const Links = ({ value }) => {
    return (
        <TagContainer>
            <Slug to={`/yearbook/${value}`}>{value}</Slug>
        </TagContainer>
    )
}

const Course = ({ value }) => {
    return (
        <TagContainer>
            <p>{value.year_level} {value.primary_course}</p>
        </TagContainer>
    )
}

const Date = ({ value }) => {
    return (
        <TagContainer>
            <p>{format(parseISO(value), "MMMM dd, yyyy")}</p>
        </TagContainer>
    )
}

const Tags = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
        <TagContainer>
            {values.map((tag, id) => {
            return (
                <Tag key={id}>
                {tag}
                </Tag>
            );
            })}
        </TagContainer>
    );
};

const Status = ({ value }) => {
    if (value.toLowerCase() == 'pending') {
        return (
            <TagContainer>
                <TableStatus type="default" text={value} />
            </TagContainer>
        )
    } else if (value.toLowerCase() == 'approved') {
        return (
            <TagContainer>
                <TableStatus type="success" text={value} />
            </TagContainer>
        )
    } else if (value.toLowerCase() == 'rejected') {
        return (
            <TagContainer>
                <TableStatus type="failure" text={value} />
            </TagContainer>
        )
    } else if (value.toLowerCase() == 'empty') {
        return (
            <TagContainer>
                <TableStatus type="failure" text={value} />
            </TagContainer>
        )
    } else if (value.toLowerCase() == 'draft') {
        return (
            <TagContainer>
                <TableStatus type="failure" text={value} />
            </TagContainer>
        )
    }
}

const tableData = (
    () => [
        {
            "yearbook": {
                "date":"Sept. 21, 2020",
                "school": "SOM",
                "id_number": "173854",
                "submitter": {
                    "name":"Katrina Louise D. Santos",
                    "slug":"/yearbook/173854/"
                },
                "year_course": "4 BFA ID",
                "status": "Approved"
            }
        },
        {
            "yearbook": {
                "date":"Sept. 22, 2020",
                "school": "SOSE",
                "id_number": "173855",
                "submitter": {
                    "name":"Phoebe Ysabelle D. Villafuerte",
                    "slug":"/yearbook/173855/"
                },
                "year_course": "4 BFA ID",
                "status": "Pending"
            }
        },
        {
            "yearbook": {
                "date":"Sept. 22, 2020",
                "school": "SOM",
                "id_number": "174864",
                "submitter": {
                    "name":"Joshua P. Taningco",
                    "slug":"/yearbook/174864/"
                },
                "year_course": "4 BS ITE",
                "status": "Declined"
            }
        },
        {
            "yearbook": {
                "date":"Sept. 22, 2020",
                "school": "SOM",
                "id_number": "174864",
                "submitter": {
                    "name":"Joshua P. Taningco",
                    "slug":"/yearbook/174864/"
                },
                "year_course": "4 BS ITE",
                "status": "Pending"
            }
        },
    ],
    []
)

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function Yearbookyearbook() {
    const { data } = useQuery('yearbook', {queryFn: Users.index})
    
    // Search Bar
    const [searchData, setSearchData] = useState(null);

    const handleFilterChange = e => {
        const value = e.target.value;
        console.log(value)

        if (isNumeric(value)){
            const filteredData = data.filter(name => (
                name.username.includes(value)
            ))
            setSearchData(filteredData)
        } else if (isNumeric(value)===false) {
            const filteredData = data.filter(name => (
                name.full_name.toLowerCase().includes(value.toLowerCase())
            ))
            setSearchData(filteredData)
    }
    };

    // Sort
    const handleSortChange = e => {
        const value = e.value;
        console.log(`value: ${value}`)

        if (searchData) {
            const sorted = [...searchData].sort((a, b) => {
                if (value == "yearbook.date_submitted"){
                    if (a.yearbook.date_submitted < b.yearbook.date_submitted) {
                        return -1;
                    }
                    if (a.yearbook.date_submitted > b.yearbook.date_submitted) {
                        return 1;
                    }
                    return 0;
                } else if (value == "academic_information.school"){
                    if (a.academic_information.school < b.academic_information.school) {
                        return -1;
                    }
                    if (a.academic_information.school > b.academic_information.school) {
                        return 1;
                    }
                    return 0;
                } else if (value == "academic_information.primary_course_string"){
                    if (a.academic_information.primary_course_string < b.academic_information.primary_course_string) {
                        return -1;
                    }
                    if (a.academic_information.primary_course_string > b.academic_information.primary_course_string) {
                        return 1;
                    }
                    return 0;
                } else if (value == "yearbook.status"){
                    if (a.yearbook.status < b.yearbook.status) {
                        return -1;
                    }
                    if (a.yearbook.status > b.yearbook.status) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (a[value] < b[value]) {
                        return -1;
                    }
                    if (a[value] > b[value]) {
                        return 1;
                    }
                    return 0;
                }
            })
            setSearchData(sorted) 
        } else if (data) {
            const sorted = [...data].sort((a, b) => {
                if (value == "yearbook.date_submitted"){
                    if (a.yearbook.date_submitted < b.yearbook.date_submitted) {
                        return -1;
                    }
                    if (a.yearbook.date_submitted > b.yearbook.date_submitted) {
                        return 1;
                    }
                    return 0;
                } else if (value == "academic_information.school"){
                    if (a.academic_information.school < b.academic_information.school) {
                        return -1;
                    }
                    if (a.academic_information.school > b.academic_information.school) {
                        return 1;
                    }
                    return 0;
                } else if (value == "academic_information.primary_course_string"){
                    if (a.academic_information.primary_course_string < b.academic_information.primary_course_string) {
                        return -1;
                    }
                    if (a.academic_information.primary_course_string > b.academic_information.primary_course_string) {
                        return 1;
                    }
                    return 0;
                } else if (value == "yearbook.status"){
                    if (a.yearbook.status < b.yearbook.status) {
                        return -1;
                    }
                    if (a.yearbook.status > b.yearbook.status) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (a[value] < b[value]) {
                        return -1;
                    }
                    if (a[value] > b[value]) {
                        return 1;
                    }
                    return 0;
                }
            })
            setSearchData(sorted)
        }
    };

    const tableColumns = useMemo(
        () => [
            {
                Header: "Date Submitted",
                accessor: "yearbook.date_submitted", // accessor is the "key" in the data
                Cell: ({ cell: { value } }) => <Date value={value} />
            },
            {
                Header: "School",
                accessor: "academic_information.school", 
            },
            {
                Header: "ID Number",
                accessor: "username",
                Cell: ({ cell: { value } }) => <IDs value={value} />
            },
            {
                Header: "Name",
                accessor: "id",
                Cell: row => {
                    return (
                        <div>
                            <Slug to={`/writeups/${row.row.original.id}`}>{row.row.original.full_name}</Slug>
                        </div>
                    )
                }
            },
            {
                Header: "Year & Course",
                accessor: "academic_information", 
                Cell: ({ cell: { value } }) => <Course value={value} />
            },
            {
                Header: "Status",
                accessor: "yearbook.status",
                Cell: ({cell : { value } }) => <Status value={value} />
            },
        ],
        []
    );

    const [columns, setColumns] = useState(tableColumns);

    // Using useEffect to call the API once mounted and set the data
    // useEffect(() => {
    //     (async () => {
    //     const result = await axios("url");
    //     setData(result.data);
    //     })();
    // }, []);

    return (
        <>
            <Section>
                <Header dashboard={false} pageLabel="Yearbook Revisions" />
                <Filter handleSortChange={handleSortChange} sortOptions={sortOptions} onChange={handleFilterChange}></Filter>
            </Section>
            <TableSection>
            {
                data
                ?
                <>
                    <Table columns={columns} data={
                        searchData
                        ?
                        searchData
                        :
                        data
                    } />
                </>
                :
                <>
                    <Spinner/>
                </>
            }
            </TableSection>
        </>
    )
}

export default Yearbookyearbook;