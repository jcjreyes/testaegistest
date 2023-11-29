import styled from 'styled-components';

export const Section = styled.section``;
export const Container = styled.div`
    width: calc(100% - 12.5vw);
    min-height: 80vh;
    height: auto;
    padding: 2rem 12.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: align-items;
    align-content: center;
    background: #F5F5F5 !important;
    border-top: 1px solid #BDBDBD;
    box-sizing: border-box;
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    box-sizing: border-box;
`;

export const DateWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    align-content: center;
`;

export const DateCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export const Today = styled.p`
    font-size: 10px;
    line-height: 20px;
    text-transform: uppercase;
    color: #001196;
`;

export const Day = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    color: #001196;
`;

export const MonthYear = styled.p`
    font-size: 1.25rem;
    line-height: 2rem;
    color: #8C8C8C;
`;

export const SearchWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

export const UpperRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    grid-template-rows: auto;
    column-gap: 1.5rem;
    padding: 1rem 0;
`;

export const Row = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 1.5rem;
    padding: 1rem 0;
`;

export const SectionHeader = styled.h2`
    margin-right: 2rem;
`;