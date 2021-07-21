import React from 'react';
// styled components
import styled from 'styled-components';

const StyledFooter = styled.div`
    height: 1.5rem;
    width: 100vw;
   color: darkgrey;
    text-align: center;
`;

var Footer = () => {
    return (
        <StyledFooter>
           Footer placeholder
           <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </StyledFooter>
    );
}

export default Footer;