import React from 'react';
// local components
// bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import misc
// styled components
import styled from 'styled-components';

const StyledSearchBar = styled.div`
    width: 100%;
    position: relative;
    margin: 20px 0 20px 0;

    .search-form {
        display: flex;
        justify-content: center;

        .form-label{
            font-weight: 500;
        }

        .search-form-icon {
            position: absolute;
            font-size: 1.2rem;
            top: 0.5rem;
            left: 15.3rem;
            color: grey;
        }
        .search-form-input {
            margin: 0 1rem;
            padding: 0 0 0 2.5rem;
            width: calc(100% - 22rem);
        }

        .search-form-btn {
            width: 6rem;
        }
    }
`;

var SearchBar = ({ searchByTitle }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        searchByTitle(e.target.elements[0].value);  
    };
    return (
        <StyledSearchBar>
            <Form className='search-form' onSubmit={handleSearch}>
                <Form.Label>Query by Terms in Paper Title:</Form.Label>
                <i className='fas fa-search search-form-icon'></i>
                <Form.Control
                    className='search-form-input'
                    type='text'
                    placeholder=''
                />
                <Button
                    className='search-form-btn'
                    variant='primary'
                    type='submit'>
                    {' '}
                    Search{' '}
                </Button>
            </Form>
        </StyledSearchBar>
    );
};

export default SearchBar;
