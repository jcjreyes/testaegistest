import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from "react-switch";

// Available Types: primary (Blue Dominant) and secondary (Blue Outline)
// Available Lengths: small (92x40), big (132x48), or fixed (100% width)

const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

const ToggleSwitch = ({
    toggle,
    onChange
}) => {
    const [toggled, setToggled] = useState(toggle)

    return (
        <>
            <SwitchContainer>
                <Switch 
                    checked={toggled}
                    onChange={() => setToggled(!toggled)}
                    offColor="#BDBDBD"
                    onColor="#001196"
                    offHandleColor="#FBFBFB"
                    onHandleColor="#FBFBFB"
                    // height={64}
                    // width={32}
                    // borderRadius={100}
                />
            </SwitchContainer>
        </>
    )
}

export default ToggleSwitch;