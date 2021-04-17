import React from "react";
import ReactDOM from "react-dom";
// local components
// bootstrap components
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
// npm-installed component
// Read more here: https://betterstack.dev/projects/react-tag-input/
import ReactTagInput from "@pathofdev/react-tag-input";

// import misc
// styled components
import styled from 'styled-components';

const StyledCoverageFilter = styled.div`
    width: 100%;
    margin: 2rem 0 0 !important;

    .card-header {
        padding: 0.5rem 0 0.5rem 1rem;
        font-weight: 600;
    }

    .card-body {
        padding: 0.5rem 1.5rem 0.5rem 1.5rem;
        
        .card-body-input-wrapper {
            display: flex;
            margin: 1rem 0;
        
            .card-body-input-label {
                margin: 0 1rem 0 0;
            }

            .react-tag-input {
                padding: 0 0 0 0.5rem; 
                .react-tag-input__tag,
                .react-tag-input__input {
                    padding: 0 0 0 0.5rem;
                }
            }
            
            .form-check {
                margin: 0 1rem 0 0;
            }
        }
    }
`;

var CoverageFilter = () => {
    const [authors, setAuthors] = React.useState(["example author"]);
    const [tasks, setTasks] = React.useState(["example task"]);

    return (
        <StyledCoverageFilter>
            <Card>
                <Card.Header>Filter</Card.Header>
                <Card.Body>
                    <div className="card-body-input-wrapper">
                        <p className="card-body-input-label">Authors: </p>
                        <ReactTagInput className="card-body-input" tags={authors} onChange={(newAuthors) => setAuthors(newAuthors)} />
                    </div>
                    <div className="card-body-input-wrapper">
                        <p className="card-body-input-label">Tasks: </p>
                        <ReactTagInput className="card-body-input" tags={tasks} onChange={(newTasks) => setTasks(newTasks)} />
                    </div>
                    <div className="card-body-input-wrapper">
                        <p className="card-body-input-label">Paper Types: </p>
                        <div key="inline-checkbox" className="">
                            <Form.Check inline label="experiment" type="checkbox" id="inline-checkbox-experiment" />
                            <Form.Check inline label="theory" type="checkbox" id="inline-checkbox-theory" />
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
        </StyledCoverageFilter>
    );
}

export default CoverageFilter;