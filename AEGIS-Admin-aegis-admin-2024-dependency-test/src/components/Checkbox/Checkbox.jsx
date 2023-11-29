import React, { useState } from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    // border: ${props => props.checked ? '2px solid #001196' : '2px solid #DADADA'};
    // border-radius: 3px;
    // width: 100%;
    // height: 100%;
    // background: ${props => props.checked ? '#001196' : 'white'};
    // border: ${props => props.checked ? '2px solid #001196' : '2px solid #DADADA'};
    // opacity: 1;
    // overflow: hidden;
    // padding: 0;
    // white-space: nowrap;
`;

const Checkmark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const StyledCheckbox = styled.div`
    cursor: pointer;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: ${props => props.checked ? '#001196' : 'white'};
    border: ${props => props.checked ? '2px solid #001196' : '2px solid #DADADA'};
    border-radius: 3px;
    transition: all 0.3s ease;

    ${Checkmark} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
`;

// Types to choose from: default, success, and failure
const Checkbox = ({
    checked,
    id,
    name,
    value,
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState(checked)
    
    return (
        <CheckboxContainer>
            <HiddenCheckbox id={id} name={name} value={value} onChange={onChange} />
            {/* <StyledCheckbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} >
                <Checkmark viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Checkmark>
            </StyledCheckbox> */}
        </CheckboxContainer>
    )
}

export default Checkbox;