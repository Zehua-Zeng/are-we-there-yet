import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
// Do not remove, used in the file
import {toBeInTheDocument} from '@testing-library/jest-dom';
import WaffleChartCell from '../CoverageScreen/WaffleChartCell';

afterEach(() => {
    cleanup();
});

test('should render experiemnt cell matches snapshot', () => {
    let name= "PXPY";
    let category = "Experiment";

    let cell = <WaffleChartCell name={name} category={category} key={name}/>;
    render(cell);

    const cellElement = screen.getByTestId(name);
    // expect it to be rendered in DOM
    expect(cellElement).toBeInTheDocument();

    const tree = renderer.create(cell).toJSON();
    expect(tree).toMatchSnapshot();
});

test('should render theory cell matches snapshot', () => {
    let name= "PXPY";
    let category = "Theory";

    let cell = <WaffleChartCell name={name} category={category} key={name}/>;
    render(cell);

    const cellElement = screen.getByTestId(name);
    // expect it to be rendered in DOM
    expect(cellElement).toBeInTheDocument();

    const tree = renderer.create(cell).toJSON();
    expect(tree).toMatchSnapshot();
});

test('should render hybrid cell matches snapshot', () => {
    let name= "PXPY";
    let category = "Hybrid";

    let cell = <WaffleChartCell name={name} category={category} key={name}/>;
    render(cell);

    const cellElement = screen.getByTestId(name);
    // expect it to be rendered in DOM
    expect(cellElement).toBeInTheDocument();

    const tree = renderer.create(cell).toJSON();
    expect(tree).toMatchSnapshot();
});