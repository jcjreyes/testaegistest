import styled from "styled-components";
import searchIcon from "./assets/search.png";
import Button from "../../components/Button";

const Input = styled.input`
    width: 100%;
    max-width: 566px;
    max-height: 48px;
    padding: 0.75rem 3.5rem;
    background: url(${searchIcon}) no-repeat;
    background-position: 5% 45%;
    border: 1.5px solid #bdbdbd;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    color: #333;

    :focus,
    :active {
        background-color: #fff;
        border-color: #bdbdbd;
        outline: none;
    }

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #bcbcbc;
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #bcbcbc;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #bcbcbc;
    }
`;

const Search = ({
    placeholder,
    searchData,
    setSearchData,
    handleSearchChange,
}) => {
    return (
        <>
            <Input
                placeholder={placeholder}
                onChange={(e) => setSearchData(e.target.value)}
                id="id_searchbar"
                value={searchData}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSearchChange();
                    }
                }}
            />
            <Button
                label="Search"
                className={"ms-3"}
                onClick={handleSearchChange}
            />
        </>
    );
};

export default Search;
