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

export const IndividualModalCard = styled.div`
    height: 60vh;
    min-width: 35vw;
    max-width: auto;
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

export const GroupModalCard = styled.div`
    height: 65vh;
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
    padding: 3rem 3rem 1rem 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    background: #FFF;
    box-sizing: border-box;

    div {
        margin-left: 1rem;
    }
`;

export const ModalHeaderTitle = styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
`;

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
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 0 3rem;
    width: 100%;
`

export const ModalBodyRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;

export const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin: 0.5rem 1rem 0.5rem 0;
`;

export const GroupInfo = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    margin: 0.5rem 1rem 0.5rem 0;
`;

export const CardContentLabel = styled.p`
    font-weight: bold;
    font-size: 10px;
    line-height: 1.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #001196;
`;

export const CardContentText = styled.p`padding: 4px 0;`;
export const CardContentTextBold = styled.p`font-weight: 700; padding: 4px 0;`;
export const CardContentTextItalic = styled.p`font-style: italic; padding: 4px 0;`;

export const ModalFooter = styled.div`
    width: 100%;
    height: auto;
    padding: 1.5rem 3rem;
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

export const Input = styled.input.attrs(props => ({
    width: props.width || "auto",
    height: props.height || "auto",
}))`
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 0.5rem 2rem 0.5rem 1rem;
    background: transparent;
    border: 1.5px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 4px;
    transition: border-color 0.4s ease-in-out;

    :focus {
        border: 1.5px solid #001196;
        outline: none;
    }

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus textarea:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    }
`