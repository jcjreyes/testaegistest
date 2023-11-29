import React, { useState } from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const Check = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const StyledCheckbox = styled.div`
    cursor: pointer;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${props => props.checked ? '#219653' : '#DADADA'};
    border: ${props => props.checked ? '2px solid #219653' : '2px solid #DADADA'};
    transition: all 0.3s ease;

    ${Check} {
        visibility: 'visible';
    }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

// Types to choose from: default, success, and failure
const Checkmark = ({
    checked,
    onChange,
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked)
    const changeHandler = () => {
        setIsChecked(!isChecked);
        onChange();
    }
    return (
        <CheckboxContainer>
            <HiddenCheckbox checked={isChecked} {...props} />
            <StyledCheckbox checked={isChecked} onClick={changeHandler} >
                <Check viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Check>
            </StyledCheckbox>
        </CheckboxContainer>
    )
}

export default Checkmark;