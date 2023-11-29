import styled from 'styled-components';
import searchIcon from './assets/search.png';

const Input = styled.input`
    width: 100%;
    max-width: 566px;
    max-height: 48px;
    padding: 0.75rem 3.5rem;
    background: url(${searchIcon}) no-repeat;
    background-position: 5% 45%;
    border: 1.5px solid #BDBDBD;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    color: #333;

    :focus, :active {
        background-color: #FFF;
        border-color: #BDBDBD;
        outline: none;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #BCBCBC;
        opacity: 1; /* Firefox */
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #BCBCBC;
    }
    
    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #BCBCBC;
    }
`;

const Search = ({ placeholder, onChange }) => {
    return (
        <>
            <Input placeholder={placeholder} onChange={onChange} id="id_searchbar" />
        </>
    )
}

export default Search;