import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Clock from 'react-live-clock';
import { format } from 'date-fns';
import './clock.css';

const HeaderWrapper = styled.div`
    width: calc(100% - 17.5vw);
    padding: 5rem 5rem 2rem 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`

const HeaderTitle = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
`

const HeaderDateTime = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    align-content: center;
`

const HeaderWelcome = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    padding-bottom: 0.2rem;
    color: #001196;
`

const HeaderLabel = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    padding-bottom: 0.2rem;
    color: #333;
`

const HeaderLink = styled(Link)`
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #001196;
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    :hover {
        color: #000E77;
    }

    :active, :visited {
        color: #001196;
        text-decoration: none;
    }
`

const HeaderDate = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #333;
`

const Header = ({
    dashboard,
    pageLabel,
    user
}) => {
    const today = format(new Date(), "MMMM dd, yyyy");
    return (
        <HeaderWrapper>
            <HeaderTitle>
                {
                    dashboard
                    ?
                        <>
                            <HeaderWelcome>Hello{user && user.user ? `, ${user?.user.first_name} ${user?.user.last_name}` : ""}!</HeaderWelcome>
                            <HeaderDate>Welcome back to the Admin Dashboard</HeaderDate>
                        </>
                    :
                        <>
                            <HeaderLabel>{pageLabel}</HeaderLabel>
                            <HeaderLink to="/">Back to Dashboard</HeaderLink>
                        </>
                }
            </HeaderTitle>
            <HeaderDateTime>
                <Clock
                    format="hh:mm:ss A"
                    interval={1000}
                    ticking={true}
                />
                <HeaderDate>{today}</HeaderDate>
            </HeaderDateTime>
        </HeaderWrapper>
    )
}

export default Header;