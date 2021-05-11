import React from "react";
// bootstrap components
import Card from 'react-bootstrap/Card';
// local component
import PaperDetails from './PaperDetails';
// styled components
import styled from 'styled-components';

const StyledPapersSection = styled.div`
    width: calc(100% - 32rem);
    .card {
        max-height: 45.23rem;
        overflow-y: auto;
    }
    .paper-toggle {
        font-weight: 600;
        padding: .5rem 1rem.5rem;
        width: 100%;
        text-align: start;
    }
    .card-body {
        /* padding: 0; */
    }
`;

var PapersSection = ({selected_paper, papers, render}) => {
    if(render === false) return <></>;
    return (
        <StyledPapersSection>
            <Card>
                <Card.Header>
                    Papers
                </Card.Header>
                <Card.Body>
                    {  
                        selected_paper.length === 0 ? 
                        <p className="paper-notification"> No paper selected </p> :
                        selected_paper.map( name => {
                            return <PaperDetails key={name} data={papers[name]}/>;
                        })
                    }
                </Card.Body>
            </Card>
            
        </StyledPapersSection>
    );
}

export default PapersSection;