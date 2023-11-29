import styled from 'styled-components';

// Available Types: primary (Blue Dominant) and secondary (Blue Outline)
// Available Lengths: small (92x40), big (132x48), or fixed (100% width)

const StyledButton = styled.button.attrs(props => ({
    width: props.width || "auto",
    height: props.height || "auto",
    paddingTop: props.paddingY || "0.6rem",
    paddingBottom: props.paddingY || "0.6rem",
    paddingRight: props.paddingX || "1.5rem",
    paddingLeft: props.paddingX || "1.5rem"
}))`
    color: ${props => props.theme.fg};
    border: 1.5px solid ${props => props.theme.border};
    background: ${props => props.theme.bg};

    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 8px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    padding: ${props => props.paddingTop} ${props => props.paddingRight} ${props => props.paddingBottom} ${props => props.paddingLeft};
    width: ${props => props.width};
    height: ${props => props.height};
    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
        color: ${props => props.theme.hoveredFg};
        border: 1.5px solid ${props => props.theme.hoveredBorder};
        background: ${props => props.theme.hoveredBg};
    }

    :focus {
        color: ${props => props.theme.pressedFg};
        border: 1.5px solid ${props => props.theme.pressedFg};
        background: ${props => props.theme.pressedBg};
        outline: none;
    }

    :disabled {
        color: ${props => props.theme.disabledFg};
        border: 1.5px solid ${props => props.theme.disabledBg};
        background: ${props => props.theme.disabledBg};
    }

    &&.comment {
        color: #8C8C8C;
        border: 1.5px solid #8C8C8C;
        background: transparent;
    }

    &&.comment:hover {
        color: #4C4C4C;
        border: 1.5px solid #4C4C4C;
    }
`;

const AddButton = styled.button.attrs(props => ({
    width: props.width || "auto",
    height: props.height || "auto",
    paddingTop: props.paddingY || "0.6rem",
    paddingBottom: props.paddingY || "0.6rem",
    paddingRight: props.paddingX || "1.5rem",
    paddingLeft: props.paddingX || "1.5rem"
}))`
    color: #BEBEBE;
    border: none;
    background: #F1F1F1;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    padding: ${props => props.paddingTop} ${props => props.paddingRight} ${props => props.paddingBottom} ${props => props.paddingLeft};
    width: ${props => props.width};
    height: ${props => props.height};
    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
        cursor: pointer;
        background: #E1E1E1;
    }
`;

const Icon = styled.img`
    width: auto;
    max-height: 100%;
    padding-right: 1rem;
`

// Define our `primary` and `secondary` buttons on the theme
const theme = {
    fg: "#fff",
    bg: "#001196",
    border: "#001196",
    hoveredFg: "#fff",
    hoveredBg: "#000E77",
    hoveredBorder: "#000E77",
    pressedBg: "#000A59",
    pressedFg: "#fff",
    disabledBg: "#C4C4C4",
    disabledFg: "#828282"
};
  
// This theme swaps `primary` and `secondary`
const invertTheme = {
    fg: "#001196",
    bg: "#fff",
    border: "#001196",
    hoveredFg: "#000E77",
    hoveredBg: "#fff",
    hoveredBorder: "#000E77",
    pressedBg: "#F0F0F0",
    pressedFg: "#000A59",
    disabledBg: "#C4C4C4",
    disabledFg: "#C4C4C4",
};

const Button = ({
    add,
    reverse,
    paddingX,
    paddingY, 
    height, 
    width,
    label, 
    type,
    icon,
    onClick,
    className
}) => {
    return (
        <>
            {
                add
                ?
                <>
                    <AddButton theme={invertTheme} disabled={false} type={type} onClick={onClick} paddingX={paddingX} paddingY={paddingY} width={width} height={height}>
                        {icon ? <Icon src={icon} /> : null}
                    </AddButton>
                </>
                :
                <>
                    {
                        reverse
                        ?
                        <>
                            <StyledButton theme={invertTheme} type={type} onClick={onClick} paddingX={paddingX} paddingY={paddingY} width={width} height={height} className={className}>
                                {icon ? <Icon src={icon} /> : null}
                                {label}
                            </StyledButton>
                        </>
                        :
                        <>
                            <StyledButton theme={theme} type={type} onClick={onClick} paddingX={paddingX} paddingY={paddingY} width={width} height={height} className={className}>
                                {icon ? <Icon src={icon} /> : null}
                                {label}
                            </StyledButton>
                        </>
                    }
                </>
            }
        </>
    )
}

export default Button;