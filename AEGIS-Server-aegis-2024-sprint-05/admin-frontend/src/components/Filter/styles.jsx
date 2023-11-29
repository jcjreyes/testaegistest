import styled from 'styled-components';

export const FilterContainer = styled.div`
    width: calc(100% - 17.5vw);
    height: auto;
    padding: 0 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    align-content: center;
`;

export const FilterRow = styled.div`
    width: 100%;
    height: auto;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    align-content: center;
`;

export const FilterOptions = styled.div`
    width: 75%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center; 
    align-content: center;
`;

export const FilterTags = styled.div`
    min-width: 25%;
    max-width: 50%;
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export const FilterTagsLabel = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
`;

export const FilterTagsPlaceholder = styled.button`
    width: auto; height: auto;
    padding: 0.5rem 1rem;
    border: 1.5px solid #C4C4C4;
    border-radius: 4px;
    background: transparent;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #8C8C8C;
    margin-left: 0.8rem;
    transition: all 0.3s ease;

    :hover {
        cursor: pointer;
        background: #001196;
        border-color: #001196;
        color: white;
    }
`;

export const FilterButtons = styled.div`
    width: 35%;
    min-height: auto;
    max-height: 100%;
    display: flex; flex-direction: column;
    justify-content: space-between;
    align-items: flex-end; align-content: center;
`;

export const FilterSwitch = styled.div`
    width: 100%;
    display: flex; justify-content: flex-end;
    align-items: center; align-content: center;
`;

export const SwitchLabel = styled.p`
    padding-right: 1.5rem;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #000;
`;