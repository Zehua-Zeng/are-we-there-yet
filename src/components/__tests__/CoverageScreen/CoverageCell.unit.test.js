import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CoverageCell from '../../CoverageScreen/CoverageCell';
import renderer from 'react-test-renderer';
// Do not remove, used in the file
import {toBeInTheDocument} from '@testing-library/jest-dom';

afterEach(() => {
    cleanup();
});

test('should render unselected cell matches snapshot', () => {
    // key={`${t}-2`} category='coverage-none' name={t} 
    // handleClick={() => handleClick(1,t)} 
    // isActive={selectedFirstEncoding === t} type="filter"
    let key = 'somekey';
    let category = 'coverage-none';
    let name = "PX";
    let handleClick= () => {};
    let isActive = false;
    let type = "filter";

    let cell = <CoverageCell key={key} category={category} name={name} handleClick={handleClick} isActive={isActive} type={type}/>;
    render(cell);

    const cellElement = screen.getByTestId(name);
    // expect it to be rendered in DOM
    expect(cellElement).toBeInTheDocument();

    const tree = renderer.create(cell).toJSON();
    expect(tree).toMatchSnapshot();
});

test('should render selected cell matches snapshot', () => {
    let key = 'somekey';
    let category = 'coverage-none';
    let name = "PY";
    let handleClick= () => {};
    let isActive = true;
    let type = "filter";

    let cell = <CoverageCell key={key} category={category} name={name} handleClick={handleClick} isActive={isActive} type={type}/>;
    render(cell);

    const cellElement = screen.getByTestId(name);
    // expect it to be rendered in DOM
    expect(cellElement).toBeInTheDocument();

    const tree = renderer.create(cell).toJSON();
    expect(tree).toMatchSnapshot();
});