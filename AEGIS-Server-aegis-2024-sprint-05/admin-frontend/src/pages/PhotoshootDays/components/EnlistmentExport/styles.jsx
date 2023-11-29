import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    width: 85%;
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
    height: 50vh;
    min-width: 50vw;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    position: relative;
    background: #FFF;
    box-sizing: border-box;
`;
export const ModalExit = styled.img`
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 20;
    transition: all 0.4s ease-in-out;

    :hover {
        cursor: pointer;
        transform: translateY(-10%);
    }
`;

export const ModalHeader = styled.div`
    width: 100%;
    height: auto;
    padding: 3rem 3rem 1.5rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    align-content: center;
    background: #FFF;
    box-sizing: border-box;
`;

export const ModalHeaderTitle = styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
`;

export const ModalHeaderSubtitle = styled.h2`
    color: #8C8C8C;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.2rem;
    margin-top: 1rem;
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
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 0 3rem;
    width: 100%;
`

export const ModalInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin-right: 2.5rem;
`;

export const ModalInputLabel = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 1.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #001196;
`;

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