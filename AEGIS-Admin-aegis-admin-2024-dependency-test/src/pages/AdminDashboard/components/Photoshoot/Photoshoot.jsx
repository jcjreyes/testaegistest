import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "../../../../components/Button";

const Card = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 45vh;
    max-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.5rem;
    padding-bottom: 2.5rem;
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
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 1rem 0;
`;

const Info = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 0.4rem 0;
`;

const MainInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 1rem 0;
`;

const MainTitle = styled.h1`
    color: #001196;
`;

const MainLabel = styled.h3`
    padding-left: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8C8C8C;
`;

const InfoTitle = styled.p`
    font-weight: 600;
    font-size: 10px;
    line-height: 20px;
    letter-spacing: 0.1em;
    color: #BDBDBD;
    text-transform: uppercase;
`;

const InfoMarker = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #D5EBF8;
`;

const InfoLabel = styled.p`
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #333;
    padding: 0 1.5rem;
`;

const InfoText = styled.p`
    font-weight: 700;
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

const data = {
    "photoshoot_1": {},
    "photoshoot_2": {},
    "photoshoot_3": {},
    "photoshoot_4": {},
    "photoshoot_5": {},       
}

const Photoshoot = () => {
    var count = Object.keys(data).length;

    return (
        <Card>
            <Header>Today's Photoshoots</Header>
            <MainInfo>
                <MainTitle>0</MainTitle>
                <MainLabel>Photoshoots Left</MainLabel>
            </MainInfo>
            <InfoWrapper>
                <InfoTitle>Ongoing Photoshoot Period</InfoTitle>
                <Info>
                    <InfoMarker />
                    <InfoLabel>Set 1</InfoLabel>
                    <InfoText>Individuals</InfoText>
                </Info>
            </InfoWrapper>
            <InfoWrapper>
                <InfoTitle>Ongoing Enlistment</InfoTitle>
                <Info>
                    <InfoMarker />
                    <InfoLabel>None</InfoLabel>
                </Info>
            </InfoWrapper>
            <CardFooter>
                <StyledLink to="photoshoots/">
                    <Button type="button" reverse={false} width="100%" label="Go to Photoshoots" />
                </StyledLink>
            </CardFooter>
        </Card>
    )
}

export default Photoshoot;