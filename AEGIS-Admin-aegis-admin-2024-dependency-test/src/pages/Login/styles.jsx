import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../theme/global.css';

export const Container = styled.div`
    width: 90%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background: #FBFBFB;
`

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
`

export const LockImg = styled.img`
    width: auto;
    margin: 0;
`
    
export const HeaderTitle = styled.h1`
    margin: 0;
    padding: 1.5rem 0 1rem 0;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.5rem;
    color: #8C8C8C;
`

export const SubHeader = styled.p`
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.5rem;
`

export const CardWrapper = styled.div`
    min-width: 30%;
    margin-top: 4rem;
    display: flex; 
    flex-direction: column; 
    justify-content: center; align-items: flex-start; align-content: center;
    padding: 2.5rem;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
`
export const LoginBtns = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between; align-items: center; align-content: center;
    padding-bottom: 2rem;
`

export const ForgotPass = styled(Link)`
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1rem;
    color: #828282;
    text-decoration: none;
`