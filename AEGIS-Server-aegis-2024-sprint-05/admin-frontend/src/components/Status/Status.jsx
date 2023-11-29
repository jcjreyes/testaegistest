import styled from 'styled-components';
const StyledTableStatus = styled.div.attrs(props => ({
    width: props.width || "auto",
    height: props.height || "auto",
}))`
    color: ${props => props.theme.fg};
    border: 1.5px solid ${props => props.theme.bg};
    background: ${props => props.theme.bg};

    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 1.5rem;
    border-radius: 4px;
    display: flex;
    text-transform: uppercase;

    padding: 4px 8px;
    width: ${props => props.width};
    height: ${props => props.height};
`;

const theme = {
    fg: "#E59215",
    bg: "#EFD7B3",
};
  
const successTheme = {
    fg: "#219653",
    bg: "#CCE7D7",
};

const failedTheme = {
    fg: "#D23B2E",
    bg: "#F0CECB",
}; 

// Types to choose from: default, success, and failure
export const TableStatus = ({
    type,
    text
}) => {
    if (type === 'default') {
        return (
            <>
                <StyledTableStatus theme={theme}>{text}</StyledTableStatus>
            </>
        )
    } else if (type === 'success') {
        return (
            <>
                <StyledTableStatus theme={successTheme}>{text}</StyledTableStatus>
            </>
        )
    } else if (type === 'failure') {
        return (
            <>
                <StyledTableStatus theme={failedTheme}>{text}</StyledTableStatus>
            </>
        )
    }
}