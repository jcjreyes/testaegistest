import Search from "../Search";
import Button from "../Button";
import ToggleSwitch from "../ToggleSwitch";
import Select from "react-select";
import React, { useState } from "react";

import {
    FilterContainer,
    FilterRow,
    FilterOptions,
    FilterTags,
    FilterTagsLabel,
    FilterTagsPlaceholder,
    FilterSwitch,
    SwitchLabel,
} from "./styles";

const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        "&:hover": {
            backgroundColor: "#001196",
            color: "#FFF",
        },
        color: state.isSelected ? "#FFF" : "#333",
        backgroundColor: state.isSelected ? "#001196" : "#FFF",
        fontWeight: state.isSelected ? "600" : "400",
    }),
    control: (base, state) => ({
        ...base,
        "&:hover": {
            cursor: "pointer",
            border: "1.5px solid #BCBCBC",
        },
        border: state.isFocused ? "1.5px solid #BCBCBC" : "1.5px solid #C4C4C4",
        boxShadow: "none",
    }),
    container: () => ({
        position: "relative",
        width: 240,
    }),
    menu: () => ({
        position: "absolute",
        width: 240,
    }),
};

const Filter = ({
    sortOptions,
    searchFilter,
    handleSortChange,
    handleSearchChange,
    exportButton,
    data,
    setSearchData,
    searchData,
}) => {
    // Create a state
    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        // setFilter(searchFilter, value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    return (
        <FilterContainer>
            <FilterRow>
                <Search
                    placeholder="ID, school, course, status, or name (format: John L Doe)"
                    setSearchData={setSearchData}
                    searchData={searchData}
                    handleSearchChange={handleSearchChange}
                />
                {/* <FilterSwitch>
                    <SwitchLabel>Allow Submissions</SwitchLabel>
                    <ToggleSwitch toggled={true} />
                </FilterSwitch> */}
            </FilterRow>
            <FilterRow>
                <FilterOptions>
                    <Select
                        styles={selectStyles}
                        options={sortOptions}
                        placeholder="Sort by"
                        id="sortOptions"
                        onChange={handleSortChange}
                    />
                    {/* <FilterTags>
                        <FilterTagsLabel>Filter Tags</FilterTagsLabel>
                        <FilterTagsPlaceholder>+ Add</FilterTagsPlaceholder>
                    </FilterTags> */}
                </FilterOptions>
            </FilterRow>
            <FilterRow>
                <Button
                    type="button"
                    reverse={true}
                    paddingX="16px"
                    paddingY="8px"
                    label="Export as CSV"
                    onClick={exportButton}
                />
            </FilterRow>
        </FilterContainer>
    );
};

export default Filter;
