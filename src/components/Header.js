// boostrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import misc
import logo from '../resources/imgs/favicon.ico';
// styled components
import styled from 'styled-components';

const StyledNav = styled.div`
    .navbar {
       padding: 1rem 4rem 1.5rem 4rem; 

       .nav-link {
            margin: 0.5rem 1rem 0 0;
       }
    }
   
`;

var Header = () => {
    return (
        <StyledNav>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img src={logo} alt="logo" width="35px" /> &nbsp;
                    Are-We-There-Yet
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#gettingStarted">Geeting Started</Nav.Link>
                        <Nav.Link href="#coverage"> Explore by Coverage </Nav.Link>
                        <Nav.Link href="#encodings"> Explore by Encodings </Nav.Link>
                        <Nav.Link href="#dataTypes"> Explore by DataTypes </Nav.Link>
                        <Nav.Link href="#About Us"> About Us </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </StyledNav>
    );
}

export default Header;