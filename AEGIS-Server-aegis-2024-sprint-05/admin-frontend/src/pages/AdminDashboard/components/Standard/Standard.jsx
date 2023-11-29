import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "../../../../components/Button";

const Card = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.5rem;
    padding-bottom: 5rem;
    align-items: flex-start;
    align-content: center;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(189, 189, 189, 0.5);
    border-radius: 4px;
    position: relative;
`;
const Header = styled.h1``;

const InfoWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 1rem 0;
`;

const MainInfo = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 1rem 0;
`;

const MainTitle = styled.h1`
    color: #333333;
`;

const MainLabel = styled.h3`
    padding-left: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #D5A76B;
`;

const InfoText = styled.p`
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #8C8C8C;
    padding-right: 1.5rem;
`;

// const InfoSubtext = styled.p`
//     color: #8C8C8C;
// `;

export const CardFooter = styled.div`
    width: 100%;
    height: auto;
    padding: 1.5rem;
    position: absolute;
    bottom: 0; left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    background: #FFF;
    box-sizing: border-box;
`;

export const StyledLink = styled(Link)`
    width: 100%;
    text-decoration: none;
`;

const Standard = ({ header, data, link, buttonLabel }) => {
    var count = Object.keys(data).length;

    return (
        <Card>
            <Header>{header}</Header>
            <InfoWrapper>
                <InfoText>3 New Requests</InfoText>
            </InfoWrapper>
            <MainInfo>
                <MainTitle>{count}</MainTitle>
                <MainLabel>Pending</MainLabel>
            </MainInfo>
            <CardFooter>
                <StyledLink to={link}>
                    <Button type="button" reverse={false} width="100%" label={buttonLabel} />
                </StyledLink>
            </CardFooter>
        </Card>
    )
}

export default Standard;