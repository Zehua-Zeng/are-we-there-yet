import React from "react";
// import ReactDOM from "react-dom";
// local components
import CoverageMatrix from "./CoverageMatrix";
// bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
// styled components
import styled from 'styled-components';

const StyledCoverageTab = styled.div`
    .coverage-toggle {
        font-weight: 600;
        padding: .5rem 1rem.5rem;
        width: 100%;
        text-align: start;
    }
    .card-body {
        padding: 0;
    }
`;

var CoverageTab = (props) => {
    // let encodingTypes = ["PX", "PY", "L", "An", "Ar", "T", "V", "D", "S", "CS", "CH", "O"]; 
    return (
        <StyledCoverageTab>
            <Card>
                <Card.Header>
                <Accordion.Toggle className="coverage-toggle" as={Button} variant="link" eventKey={props.eventKey}>
                    {props.title}
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                    <CoverageMatrix eventKey={props.eventKey} types={props.encodingTypes} data={props.coverage_data} modPapers={props.modPapers}/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            
        </StyledCoverageTab>
    );
}

export default CoverageTab;