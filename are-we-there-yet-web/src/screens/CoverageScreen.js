// styled components
import styled from 'styled-components';
// components
import { SearchBar, CoverageFilter } from '../components';

const StyledCoverageScreen = styled.div`
    height: calc(100vh - 10rem);
    width: calc(100vw - 8rem);
    margin: 1.2rem 4rem !important;
   
`;

var CoverageScreen = () => {
    return (
        <StyledCoverageScreen>
            <SearchBar />
            <CoverageFilter />
        </StyledCoverageScreen>
    );
}

export default CoverageScreen;