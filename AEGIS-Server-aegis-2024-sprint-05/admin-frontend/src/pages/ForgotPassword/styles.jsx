import styled from "styled-components";

export const ForgotPasswordSection = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0 0 0 180px;
  min-height: 100vh;
  @media (max-width: 1150px) {
    width: 40%;
  }
  @media (max-width: 850px) {
    width: 50%;
  }
  @media (max-width: 700px) {
    width: 60%;
  }
  @media (max-width: 540px) {
    width: 70%;
  }
  @media (max-width: 450px) {
    width: 80%;
  }
`;
export const ForgotPasswordHeading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #4f4f4f;
  margin: 0;
  @media (max-width: 1150px) {
    font-size: 28px;
  }
  @media (max-width: 850px) {
    font-size: 26px;
  }
  @media (max-width: 700px) {
    font-size: 24px;
  }
  @media (max-width: 540px) {
    font-size: 22px;
  }
  @media (max-width: 450px) {
    font-size: 20px;
  }
`;

export const ForgotPasswordSubHeading = styled.p`
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  color: #828282;
  line-height: 160%;
  margin: 16px 0 0;
  @media (max-width: 800px) {
    font-size: 14px;
  }
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

export const ForgotPasswordInputWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  input {
    margin: 0;
  }
`;

export const ForgotPasswordCTAWrapper = styled.div`
  margin-top: -5px;
  width: 100%;
  button {
    width: 100%;
  }

  &:hover {
    button {
    }
  }
`;

export const ForgotPasswordAnchor = styled.a`
  margin-top: 36px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  color: #003c93 !important;
  background-color: unset !important;
  text-decoration: underline !important;
  @media (max-width: 800px) {
    font-size: 14px;
  }
  @media (max-width: 450px) {
    font-size: 12px;
  }
  &:hover {
    color: #021229 !important;
  }
`;

// export const ForgotPasswordInput = styled.div`
// `
