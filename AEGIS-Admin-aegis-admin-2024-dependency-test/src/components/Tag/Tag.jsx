import styled from 'styled-components';

const StyledTag = styled.div`
    height: auto;
    width: 100px;
    padding: 0.25rem 0.75rem;
    margin: 0 0.4rem;
    border: 1.5px solid #d5a76b;
    border-radius: 4px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 1.2rem;
    text-align: center;
    text-transform: uppercase;
    color: #d5a76b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Tag = ({id, tag}) => (
    <StyledTag key={id}>
        {tag}
    </StyledTag>
)

export default Tag;