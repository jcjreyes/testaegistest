import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Section = styled.section``;
export const TableSection = styled.section``;

export const TableContainer = styled.div`
    width: calc(100% - 17.5vw);
    height: auto;
    padding: 0 5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

export const TagContainer = styled.div`
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

export const Id = styled.p`
    font-weight: 700;
`;

export const Slug = styled(Link)`
    font-weight: 700;
    color: #001196;
    text-decoration: none;
    transition: all 0.4s ease;

    :hover {
        color: #000A59;
    }
`;