import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RequestSection = styled.section``;
export const RequestContainer = styled.div`
    width: calc(100% - 17.5vw);
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: align-items;
    align-content: center;
    background: #F5F5F5 !important;
`;

export const RequestNav = styled.div`
    width: 100%;
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`;

export const RequestNavLink = styled(Link)`
    width: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    font-size: 10px;
    line-height: 20px;
    text-decoration: none;
`;

export const PrevLink = styled(Link)``
export const NextLink = styled(Link)``

export const PrevArrow = styled.img`
    margin-right: 0.75rem;
    transition: transform 0.3s ease;

    :hover {
        transform: translateY(-5%);
    }
`;
export const NextArrow = styled.img`
    transition: transform 0.3s ease;

    :hover {
        transform: translateY(-5%);
    }
`

export const ArrowLabel = styled.p`
    font-weight: bold;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #001196;
    transition: all 0.4s ease;

    :hover {
        color: #000A59;
    }
`;

export const RequestNavBtns = styled.div`
    width: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

export const RequestNavBtnLabel = styled.p`
    padding-right: 1rem;
`;

export const RequestNumber = styled.span`
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #333333;
`;

export const RequestCard = styled.div`
    min-height: 80vh;
    height: auto;
    max-width: 100%;
    padding: 3rem 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    background: #FFFFFF !important;
`;

export const CardHeader = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;
export const CardHeaderText = styled.h1`
    font-weight: bold;
    font-size: 20px;
    line-height: 32px;
    padding-right: 60px;
`;
export const CardContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    align-content: center;
`;
export const CardContentLeft = styled.div`
    width: 47.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
`;
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin: 1rem 0;
`;
export const GroupInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`;

export const GroupInfoColumn = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
`;
export const CardContentRight = styled.div`
    width: 52.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
`;
export const CardContentRightCentered = styled.div`
    width: 52.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;
export const FileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
`;
export const FileLabelWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`;
export const FileLabel = styled.h2`
    font-size: 1rem;
`;
export const FileFrame = styled.iframe`
    width: 100%;
    min-height: 40vh;
    max-height: 50vh;
    overflow: auto;
    align-self: stretch;
    background: #F5F5F5;
    border: 0;
`;

export const CardContentLabel = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 1.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #001196;
`;
export const CardContentLabelGold = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 1.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #D5A76B;
`;
export const CardContentText = styled.p`padding: 4px 0;`;
export const CardContentTextBold = styled.p`font-weight: 700; padding: 4px 0;`;
export const CardContentTextItalic = styled.p`font-style: italic; padding: 4px 0;`;

export const Line = styled.div`
    width: 80%;
    display: block;
    height: 2px;
    background: #F1F1F1;
`

export const CardFooter = styled.div`
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

export const CardButtons = styled.div`
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`;

export const RequestFooter = styled.div`
    width: 100%;
    padding: 1.5rem 0 3rem 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    background: #F1F1F1;
`;

export const RequestFooterContent = styled.div`
    padding-right: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export const RequestFooterText = styled.p`
    padding-right: 2rem;
    color: #8C8C8C;
`;

export const RequestFooterLink = styled(Link)`
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #001196;
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    :hover {
        color: #000A59;
    }
`;