import styled from 'styled-components';

const StyledTag = styled.div`
    height: auto;
    width: auto;
    padding: 0.25rem 0.75rem;
    margin: 0 0.4rem;
    border: 1.5px solid #D5A76B;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 1.2rem;
    text-align: center;
    text-transform: uppercase;
    color: #D5A76B;
`;

const Tag = ({id, tag}) => (
    <StyledTag key={id}>
        {tag}
    </StyledTag>
)

export default Tag;