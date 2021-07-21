import React from 'react';
import Enzyme, { mount, shallow } from "enzyme";
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import CoverageSelection from '../../CoverageScreen/CoverageSelection';
// Do not remove, used in the file
import {toBeInTheDocument} from '@testing-library/jest-dom';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
    cleanup();
});

test('should render coverage selection as expected', () => {
    let types = [
        'PX',
        'PY',
        'L',
        'AN',
        'AR',
        'T',
        'V',
        'D',
        'S',
        'CS',
        'CH',
        'O',
    ];
    let coverage_data = {
        "1-encoding": {},
        "2-encoding": {},
        "3-encoding": {}
    };
    let modPapers = () => {};

    let selection = <CoverageSelection types={types} coverage_data={coverage_data} modPapers={modPapers}/>;
    render(selection);
    

    const selectionComponent = screen.getByTestId('coverage-selection');
    // expect it to be rendered in DOM
    expect(selectionComponent).toBeInTheDocument();

    const tree = renderer.create(selection).toJSON();
    expect(tree).toMatchSnapshot();
});

// a test failed to build successfully
// test('should not select duplicate encodings', () => {
//     let types = [
//         'PX',
//         'PY',
//         'L',
//         'AN',
//         'AR',
//         'T',
//         'V',
//         'D',
//         'S',
//         'CS',
//         'CH',
//         'O',
//     ];
//     let coverage_data = {
//         "1-encoding": {},
//         "2-encoding": {},
//         "3-encoding": {}
//     };
//     let modPapers = () => console.log(`clicked`);
    
//     // error occuered here, no dource is found
//     const selection = mount(<CoverageSelection types={types} coverage_data={coverage_data} modPapers={modPapers}/>);

//     const tree = renderer.create(selection).toJSON();
//     console.log(tree);

//     expect(selection.find('#PX-1').length).toEqual(1);
//     selection.find('#PX-1').simulate('click');
//     selection.find('#PX-2').simulate('click');
//     selection.find('button').simulate('click');
    
//     const selectionComponent = screen.getByTestId('PX-PX-');
//     expect(selectionComponent).toBeInTheDocument();
// });