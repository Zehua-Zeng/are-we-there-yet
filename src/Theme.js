import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        box-sizing: border-box;
        /* font-size: 62.5%; */
    }
    *,
    ::before,
    ::after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }
    body {
        width:100%;
        min-width: 28rem;
        font-family: 'Kumbh Sans', sans-serif;
        overflow-x: hidden;
        transition: background-color ease-in-out 0.3s;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
                                    
    }
    a {
        text-decoration: none;
    }
    /* width */
    ::-webkit-scrollbar {
        width: 1rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: darkgray;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 1rem;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(84, 84, 84);
    }
`;

export default GlobalStyle;
