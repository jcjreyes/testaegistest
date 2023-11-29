import React, { useMemo, useState } from "react";
import { store } from "react-notifications-component";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Table from "../../components/Table";
import Tag from "../../components/Tag";
import TableStatus from "../../components/Status";
import Spinner from "../../components/Spinner";

import { useQuery } from 'react-query';
import { ReschedulingRequestsDetail } from "../../services";
import { format, parseISO } from "date-fns";

import {
    Section,
    TableSection,
    TableContainer,
    TagContainer,
    Id,
    Slug,
} from "./styles"

const sortOptions = [
    { value: "date_submitted", label: "Date Submitted"},
    { value: "photoshoot.individual_photoshoot.id_number", label: "Request #"},
    { value: "photoshoot.individual_photoshoot.name", label: "Name"},
    { value: "photoshoot.photoshoot_type", label: "Category"},
    { value: "tags", label: "Tags"},
    { value: "photoshoot.status", label: "Status"}
]

const IDs = ({ value }) => {
    return (
        <TagContainer>
            <Id>{value}</Id>
        </TagContainer>
    )
}

const Links = ({ value }) => {
    var id = value.rescheduling_photoshoot
    var name = value.photoshoot_type === "Individual" ? value.individual_photoshoot.name : value.group_photoshoot.name
    return (
        <TagContainer>
            <Slug to={`/rescheduling/${id}`}>{name}</Slug>
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
            {/* <Tag tag={tag} /> */}
        </TagContainer>
    );
};

const Status = ({ value }) => {
    var status = value && value ? value : "approved"
    if (status.toLowerCase() == 'pending') {
        return (
            <TagContainer>
                <TableStatus type="default" text={status} />
            </TagContainer>
        )
    } else if (status.toLowerCase() == 'approved') {
        return (
            <TagContainer>
                <TableStatus type="success" text={status} />
            </TagContainer>
        )
    } else if (status.toLowerCase() == 'declined') {
        return (
            <TagContainer>
                <TableStatus type="failure" text={status} />
            </TagContainer>
        )
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function ReschedulingRequests() {
    
    const { data } = useQuery('resched', {queryFn: ReschedulingRequestsDetail.index})

    // const { data: requests } = useQuery(
    //     'requests', 
    //     ReschedulingRequestsDetail.index,
    // )

    // Search Bar
    const [searchData, setSearchData] = useState(null);

    const handleFilterChange = e => {
        const value = e.target.value;

        if (isNumeric(value)){
            const filteredData = data.filter(datum => (
                String(datum.id).includes(value)
            ))
            setSearchData(filteredData)
        } else if (!isNumeric(value)) {
            const filteredData = data.filter(datum => (
                datum.photoshoot.individual_photoshoot.name.toLowerCase().includes(value.toLowerCase())
            ))
            setSearchData(filteredData)
    }
    };

    // Sort
    const handleSortChange = e => {
        const value = e.value;

        if (searchData) {
            const sorted = [...searchData].sort((a, b) => {
                if (value == "photoshoot.individual_photoshoot.id_number"){
                    if (a.user.id < b.user.id) {
                        return -1;
                    }
                    if (a.user.id > b.user.id) {
                        return 1;
                    }
                    return 0;
                } else if (value == "photoshoot.individual_photoshoot.name"){
                    if (a.user.last_name < b.user.last_name) {
                        return -1;
                    }
                    if (a.user.last_name > b.user.last_name) {
                        return 1;
                    }
                    return 0;
                } else if (value == "photoshoot.photoshoot_type"){
                    if (a.photoshoot.photoshoot_type < b.photoshoot.photoshoot_type) {
                        return -1;
                    }
                    if (a.photoshoot.photoshoot_type > b.photoshoot.photoshoot_type) {
                        return 1;
                    }
                    return 0;
                } else if (value == "photoshoot.status"){
                    if (a.photoshoot.status < b.photoshoot.status) {
                        return -1;
                    }
                    if (a.photoshoot.status > b.photoshoot.status) {
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
                if (value == "photoshoot.individual_photoshoot.id_number"){
                    if (a.user.id < b.user.id) {
                        return -1;
                    }
                    if (a.user.id > b.user.id) {
                        return 1;
                    }
                    return 0;
                } else if (value == "photoshoot.individual_photoshoot.name"){
                    if (a.user.last_name < b.user.last_name) {
                        return -1;
                    }
                    if (a.user.last_name > b.user.last_name) {
                        return 1;
                    }
                    return 0;
                } else if (value == "photoshoot.photoshoot_type"){
                    if (a.photoshoot.photoshoot_type < b.photoshoot.photoshoot_type) {
                        return -1;
                    }
                    if (a.photoshoot.photoshoot_type > b.photoshoot.photoshoot_type) {
                        return 1;
                    }
                    return 0;
                } else if (value == "photoshoot.status"){
                    if (a.photoshoot.status < b.photoshoot.status) {
                        return -1;
                    }
                    if (a.photoshoot.status > b.photoshoot.status) {
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
                accessor: "date_submitted", // accessor is the "key" in the data
                Cell: ({ cell: { value } }) => <Date value={value && value} />
            },
            {
                Header: "Request #",
                accessor: "id",
                Cell: ({ cell: { value } }) => <IDs value={value && value} />
            },
            {
                Header: "Name",
                accessor: "photoshoot",
                Cell: ({ cell: { value } }) => <Links value={value && value} />
            },
            {
                Header: "Category",
                accessor: "photoshoot.photoshoot_type",
            },
            {
                Header: "Tags",
                accessor: "reschedule.tags",
                Cell: ({ cell: { value } }) => <Tags values={value && value} />
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({cell : { value } }) => <Status value={value && value} />
            },
        ],
        []
    );

    const [columns, setColumns] = useState(tableColumns);

    return (
        <>
            <Section>
                <Header dashboard={false} pageLabel="Rescheduling Requests" />
                <Filter handleSortChange={handleSortChange} onChange={handleFilterChange} sortOptions={sortOptions}></Filter>
            </Section>
            <TableSection>
                <TableContainer>
                    {
                        data && data
                        ?
                        <>
                            <Table columns={columns} data={
                                searchData && searchData
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
                </TableContainer>
            </TableSection>
        </>
    )
}

export default ReschedulingRequests;
