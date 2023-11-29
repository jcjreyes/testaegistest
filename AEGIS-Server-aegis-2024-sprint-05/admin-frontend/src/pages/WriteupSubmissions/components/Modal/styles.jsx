import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: absolute;
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
    height: 70vh;
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
    overflow-y: auto;
`;
export const ModalHeader = styled.div`
    width: 100%;
    height: auto;
    padding: 2.5rem 3rem 0.5rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    align-content: center;
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
export const ModalHeaderTitle = styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    padding-right: 1rem;
`;
export const ModalHeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin-right: 2.5rem;
`;
export const ModalHeaderLabel = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 1.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #001196;
`;
export const ModalHeaderText = styled.p`
    padding: 4px 0;

    &&.capitalize {
        text-transform: capitalize;
    }
`;
export const ModalHeaderTextBold = styled.p`font-weight: 700; padding: 4px 0;`;
export const ModalHeaderTextItalic = styled.p`font-style: italic; padding: 4px 0;`;

export const ModalBody = styled.div`
    width: 100%;
    padding: 0 3rem;
`;

export const WriteupWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 1rem 0;
`;

export const WriteupLabel = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 18px;
    letter-spacing: 0.1em;
    color: #8C8C8C;
    text-transform: uppercase;
`;

export const WriteupContent = styled.div`
    width: 100%;
    height: 200px;
    overflow-y: auto;
    margin-top: 0.25rem;
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    border: 2px solid #BDBDBD;
    border-radius: 4px;
`;

export const WriteupBody = styled.p`width: 100%; color: #8C8C8C;`;

export const Line = styled.div`
    width: 100%;
    display: block;
    height: 2px;
    background: #BDBDBD;
`

export const Comment = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 1rem 0;
`;
export const CommentHeader = styled.h1`padding: 0.25rem 0;`;
export const CommentDateTime = styled.p`color: #8C8C8C; padding-bottom: 0.5rem;`;
export const CommentText = styled.p`padding: 0.5rem 0;`;
export const CommentRow = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 1rem 0;

    button:first-child {
        margin-right: 1rem;
    }
`;

export const ModalFooter = styled.div`
    width: 100%;
    height: auto;
    padding: 1.5rem 3rem;
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