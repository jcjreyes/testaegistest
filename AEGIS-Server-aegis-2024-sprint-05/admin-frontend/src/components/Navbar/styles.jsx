import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../theme/global.css';

export const Nav = styled.nav`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  width: 17.5vw;
  position: fixed;
  left: 0;
  background-color: #001196;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0 3rem;
  z-index: 99;
`
export const NavContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`

export const NavHeader = styled.div`
  flex-basis: 50%;
  width: calc(100% + 3rem);
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  @media screen and (max-width: 768px) { flex-basis: 55%; }
  @media screen and (max-width: 375px) { flex-basis: 40%; }
`

export const NavProfile = styled.div`
  padding: 0 -3rem;
  display: flex;
`

export const NavProfileContent = styled.div`
  margin-left: 18px;
  position: relative;
  top: -4px;
`

export const NavProfileName = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 16px;
`

export const NavProfilePosition = styled.h2`
  color: white;
  font-weight: 500;
  font-size: 13px;
`

export const NavMenu = styled.div`
  width: 100%;
  margin-top: 31px;
`

export const NavItem = styled.div`
  width: calc(100% + 3rem);
  position: relative;
  right: 1.5rem;
  padding-left: 1.5rem;
  height: 48px;
  cursor: pointer;
  
  &:hover{
    background: #1022B5;
  }
`

export const NavItemIcon = styled.img`
  width: 20px;
  height: 20px;
  position: relative;
  top: 10px;
`

export const NavLink = styled(Link)`
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  padding-left: 12px;
  color: white;
  transition: all 0.4s ease;
  position: relative;
  top: 6px;
`

export const NavHeaderContent = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #FFFFFF;
`

export const NavLogos = styled.div`
  flex-basis: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: center;
`

export const AegisLogo = styled.img`
  max-width: 180px;
`

export const LogoContent = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #FFF;
`

export const UXSLogo = styled.img`
  max-width: 104px;
  margin-top: -4px;
`