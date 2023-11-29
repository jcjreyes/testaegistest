import styled from 'styled-components';

export const FormElement = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const FormLabel = styled.label`
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: #333;
    margin-bottom: 8px;

    & span {
        color: red;
    }
`

export const FormInput = styled.input`
    background: #fbfbfb;
    border: 0.5px solid #828282;
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
    }

    :disabled {
        background: #ddd;
        user-select: none;
    }
`

export const SpanHeight = styled.div`
    width: 100% !important;
    min-height: 1.5rem;
    margin-bottom: 1.5rem;
`