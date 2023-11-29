import styled from 'styled-components';

const StyledChip = styled.div.attrs(props => ({
    width: props.width || "auto",
    height: props.height || "auto",
}))`
    color: ${props => props.theme.color};
    border: 1.5px solid ${props => props.theme.color};
    background: transparent

    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.8rem;
    border-radius: 4px;
    display: flex;
    text-transform: capitalize;

    padding: 6px 12px;
    width: ${props => props.width};
    height: ${props => props.height};
`;

const theme = {
    color: "#F2C94C"
};
  
const successTheme = {
    color: "#219653"
};

const failedTheme = {
    color: "#EB5757"
}; 

// Types to choose from: default, success, and failure
const Chip = ({
    type,
    text
}) => {
    if (type === 'default') {
        return (
            <>
                <StyledChip theme={theme}>{text}</StyledChip>
            </>
        )
    } else if (type === 'success') {
        return (
            <>
                <StyledChip theme={successTheme}>{text}</StyledChip>
            </>
        )
    } else if (type === 'failure') {
        return (
            <>
                <StyledChip theme={failedTheme}>{text}</StyledChip>
            </>
        )
    }
}

export default Chip;