import { createGlobalStyle } from 'styled-components';

import MontserratThin from './fonts/Montserrat-Thin.ttf';
import MontserratExtraLight from './fonts/Montserrat-ExtraLight.ttf';
import MontserratLight from './fonts/Montserrat-Light.ttf';
import MontserratRegular from './fonts/Montserrat-Regular.ttf';
import MontserratMedium from './fonts/Montserrat-Medium.ttf';
import MontserratBold from './fonts/Montserrat-Bold.ttf';
import MontserratExtraBold from './fonts/Montserrat-ExtraBold.ttf';
import MontserratBlack from './fonts/Montserrat-Black.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Montserrat Thin';
        src: local('Montserrat-Thin'),
        url(${MontserratThin}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat Extra Light';
        src: local('Montserrat-ExtraLight'),
        url(${MontserratExtraLight}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat Light';
        src: local('Montserrat-Light'),
        url(${MontserratLight}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat';
        src: local('Montserrat'),
        url(${MontserratRegular}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat Medium';
        src: local('Montserrat-Medium'),
        url(${MontserratMedium}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat Bold';
        src: local('Montserrat-Bold'),
        url(${MontserratBold}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat Extra Bold';
        src: local('Montserrat-ExtraBold'),
        url(${MontserratExtraBold}) format('truetype'),
    }

    @font-face {
        font-family: 'Montserrat Black';
        src: local('Montserrat-Black'),
        url(${MontserratBlack}) format('truetype'),
    }

    body {
        font-family: 'Montserrat', sans-serif;
    }
`;

export default GlobalStyle;