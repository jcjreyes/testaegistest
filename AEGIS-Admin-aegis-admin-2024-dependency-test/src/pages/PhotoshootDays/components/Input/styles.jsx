import styled from 'styled-components';

export const FormElement = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
`

export const FormLabel = styled.label`
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: #001196;
    margin-bottom: 8px;

    & span {
        color: red;
    }
`

export const FormInput = styled.input`
    width: 100%;
    background: #fbfbfb;
    border: 1.5px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    min-height: 2.5rem;
    appearance: none !important;
        -moz-appearance: none !important;
        -webkit-appearance: none !important;
    transition: all 0.3s ease-in-out;

    :focus {
        outline: none;
        border: 1.5px solid #001196;
    }

    :disabled {
        background: #ddd;
        user-select: none;
    }

    &&.modal__input {
        width: 80%;
    }
`

export const SpanHeight = styled.div`
    width: 100% !important;
    min-height: 1rem;
    margin-bottom: 1rem;
`