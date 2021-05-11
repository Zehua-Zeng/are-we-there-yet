import React, { useState } from 'react';
// import ReactDOM from "react-dom";
// local components
// bootstrap components
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Autocomplete from '@celebryts/react-autocomplete-tags';
// npm-installed component
// Read more here: https://www.npmjs.com/package/react-tag-autocomplete

// import misc
// styled components
import styled from 'styled-components';

const StyledCoverageFilter = styled.div`
    width: 100%;
    margin: 2rem 0 2rem !important;

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

const CoverageFilter = ({
    tasks,
    searchByPaperType,
    selectedTasks,
    deleteSelectedTasks,
    addSelectedTasks
}) => {
    const [paperCheckbox, setPaperCheckbox] = useState([false, false, false]);
    let taskSuggestions = [];

    for (const t of tasks) {
        taskSuggestions.push({
            label: t.replace('-', ' '),
            value: t,
        });
    }

    const handleAdd = (e) => {
        addSelectedTasks(e.value);
    };
    const handleDelete = (e) => {
        deleteSelectedTasks(e[0].replace(' ', '-'));
    };
    const handlePaperCheckbox = (e, idx) => {
        let temp = { ...paperCheckbox };
        searchByPaperType(idx);
        temp[idx] = !temp[idx];
        setPaperCheckbox(temp);
    };
    return (
        <StyledCoverageFilter>
            <Card>
                <Card.Header>Filter</Card.Header>
                <Card.Body>
                    {/* <div className="card-body-input-wrapper">
                        <p className="card-body-input-label">Authors: </p>
                        <ReactTagInput className="card-body-input" tags={authors} onChange={(newAuthors) => setAuthors(newAuthors)} />
                    </div> */}
                    <div className='card-body-input-wrapper'>
                        <p className='card-body-input-label'>Tasks: </p>
                        <Autocomplete
                            allowCreateTag={false}
                            suggestions={taskSuggestions}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                        />
                    </div>
                    <div className='card-body-input-wrapper'>
                        <p className='card-body-input-label'>Paper Types: </p>
                        <div key='inline-checkbox' className=''>
                            <Form.Check
                                inline
                                label='experiment'
                                type='checkbox'
                                id='inline-checkbox-experiment'
                                onChange={(e) => handlePaperCheckbox(e, 0)}
                            />
                            <Form.Check
                                inline
                                label='theory'
                                type='checkbox'
                                id='inline-checkbox-theory'
                                onChange={(e) => handlePaperCheckbox(e, 1)}
                            />
                            <Form.Check
                                inline
                                label='hybrid'
                                type='checkbox'
                                id='inline-checkbox-hybrid'
                                onChange={(e) => handlePaperCheckbox(e, 2)}
                            />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </StyledCoverageFilter>
    );
};

export default CoverageFilter;
