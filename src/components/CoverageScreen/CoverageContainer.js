import React from "react";
// import ReactDOM from "react-dom";
// local components
import CoverageTab from './CoverageTab';
// bootstrap components
import Accordion from 'react-bootstrap/Accordion';
// styled components
import styled from 'styled-components';

const StyledCoverageContainer = styled.div`
    width: 30rem;
`;

var CoverageContainer = ({coverage_data, encodingTypes, modPapers}) => {
    return (
        <StyledCoverageContainer>
            <Accordion defaultActiveKey="1">
                <CoverageTab key="1" title="1-Encoding Coverage" eventKey="1" coverage_data={coverage_data.coverages["1-encoding"]} encodingTypes={encodingTypes} modPapers={modPapers}/>
                <CoverageTab key="2" title="2-Encoding Coverage" eventKey="2" coverage_data={coverage_data.coverages["2-encoding"]} encodingTypes={encodingTypes} modPapers={modPapers} />
                <CoverageTab key="3" title="3-Encoding Coverage" eventKey="3" coverage_data={coverage_data.coverages["3-encoding"]} encodingTypes={encodingTypes} modPapers={modPapers}/>
            </Accordion>
        </StyledCoverageContainer>
    );
}

export default CoverageContainer;