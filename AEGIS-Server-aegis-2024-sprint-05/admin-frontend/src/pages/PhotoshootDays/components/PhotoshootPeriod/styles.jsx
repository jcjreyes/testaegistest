import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    width: calc(100% - 15%);
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background: rgba(51,51,51, 0.5);
    overflow: hidden;
    z-index: 10;
`;

export const ModalCard = styled.div`
    min-height: auto;
    max-height: 80vh;
    width: 50vw;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    position: relative;
    background: #FFF;
    box-sizing: border-box;
    padding-bottom: 80px;

    @media screen and (min-width: 1080px) and (max-width: 1440px) {
        height: auto;
        width: 65vw;
    }
`;

export const ModalHeader = styled.div`
    width: 100%;
    height: auto;
    padding: 1.5rem 3rem 1.25rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    background: #FFF;
    box-sizing: border-box;
    border-bottom: 1px solid #BDBDBD;
`;

export const ModalHeaderTitle = styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
`;

export const ModalHeaderActivation = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`

export const ModalHeaderActivationText = styled.p`
    padding-right: 1rem;
    font-size: 0.8rem;
    line-height: 1.5rem;
    text-align: right;
    color: #BDBDBD;
`

export const ModalHeaderSubtitle = styled.h2`
    width: 50%;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #8C8C8C;
`;

export const ModalHeaderRow = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 0.4rem 0;

    :first-child {
        padding-bottom: 0.4rem;
    }
`;

export const ModalBody = styled.div`
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 1.5rem 3rem;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
`

export const ModalBodyCol = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
`;

export const ModalBodyRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding-bottom: 0.75rem;

    :first-child {
        padding: 0 0 1rem 0;
    }

    :last-child {
        padding-top: 1.5rem;
    }
`;

export const ModalBodyTotals = styled.div`
    width: 24%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    align-content: center;
    margin-left: 1.5rem;
`;

export const ModalBodyTotalHeader = styled.p`
    font-weight: 400;
`;
export const ModalBodyTotalContent = styled.h1`color: #BDBDBD;`;
export const ModalBodyTotalContentBold = styled.h1`color: #001196;`;

export const ModalBodyRowStart = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1.25rem;
    transition: all 0.3s ease-in-out;

    :first-child {
        padding: 0 0 1rem 0;
    }

    :hover {
        cursor: pointer;
        background: #F6F6F6;
        border-radius: 4px;
    }
`;

export const ModalBodyRowStartActive = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease-in-out;
    background: #F6F6F6;
    border-radius: 4px;
    cursor: pointer;
`;

export const ModalBodyMarker = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #D5EBF8;
    margin-right: 1rem;
`;

export const ModalBodyIcon = styled.img`
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
`

export const ModalBodyText = styled.p``
export const ModalBodyAction = styled.button`
    cursor: pointer;
    color: #001196;
    padding-left: 1rem;
    transition: color 0.3s ease;
    outline: none; border: none; background: none;
    
    :hover {
        color: #000A59;
    }
`
export const ModalBodySubtitle = styled.p`
    padding: 0 0.75rem;
    color: #8C8C8C;
`

export const ModalBodyHeader = styled.h2``;

export const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin: 0 1rem 0.5rem 0;

    :first-child {
        margin: 0 1rem 1.5rem 0;
    }
`;

export const InfoIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
`

export const InfoLabel = styled.p`
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #001196;
`;

export const InfoText = styled.p`padding: 4px 0;`;

export const ModalFooter = styled.div`
    width: 100%;
    height: auto;
    padding: 1.5rem 3rem;
    position: absolute;
    bottom: 0; left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    background: #FFF;
    box-sizing: border-box;
    z-index: 10;
`;

export const ModalFooterContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;

    button {
        margin-left: 1rem;
    }
`;

export const Table = styled.table`
    width: 100%;
    margin: 1rem 0;
    border-spacing: 0;
    border-bottom: 1px solid #BDBDBD;
`;

export const TableHeaderRow = styled.tr`
    background: transparent;
`;

export const TableRow = styled.tr`
    background: transparent;
`;
export const TableHeader = styled.th`
    width: auto;
    height: auto;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 10px;
    line-height: 2.5rem;
    text-align: left;
    vertical-align: middle;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #333333;
    padding: 0 0.75rem;
    border-bottom: 1px solid #BDBDBD;
`;

// export const TableLine = styled.hr``

export const TableCell = styled.td`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    line-height: 3rem;
    padding: 0 0.75rem;
    color: #333;
    text-align: left;
    vertical-align: middle;
`;

export const TableBodyTitle = styled.p`
    width: 100%;
    padding: 0.75rem;
    font-weight: bold;
    font-size: 0.8rem;
    line-height: 1.4rem;
`;

export const TableCellEnlistment = styled.div`
    width: 100%;
    padding: 0.75rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;

export const TableCellInput = styled.div`
    width: 100%;
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export const EnlistmentImg = styled.img`
    margin-right: 1rem; 
    cursor: pointer;
    transition: filter 0.2s ease;

    :hover {
        filter: brightness(50%);
    }
`;

export const EnlistmentDate = styled.p``;

export const NumberButton = styled.img`
    cursor: pointer;
`;

export const NumberInput = styled.input`
    max-width: 40px;
    padding: 4px 12px;
    border: 1.5px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 0 1rem;
    text-align: center;

    :focus {
        outline: none;
        border: none;
    }
`;

export const FFAContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex; 
    justify-content: space-between;
    align-items: flex-start;
    align-content: center;
    margin: 1rem 0;
`;

export const FFADescription = styled.div`
    padding: 12px;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
`;

export const FFATitle = styled.h3``
export const FFAText = styled.p`
    font-weight: 400;
    font-size: 10px;
    line-height: 20px;
    color: #333;
`

export const FFAEnlistment = styled.div`
    width: 100%;
    padding: 1rem 1.75rem 1rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;