import React, { useState } from 'react';
// import ReactDOM from "react-dom";
// local components
import CoverageCell from './CoverageCell';
// bootstrap components
import Button from 'react-bootstrap/Button';
// npm-installed component
// Read more here: https://www.npmjs.com/package/react-tag-autocomplete

// import misc
// styled components
import styled from 'styled-components';

const StyledCoverageSelection = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .coverage-selection-list-wrapper {
        margin-right: 100px;
    }
    .coverage-selection-lable {
        font-weight: 600;
        font-size: 18;
        margin-bottom: 5px;
    }
    .coverage-selection-list {
        display: flex;
        flex-direction: column;
        
        .coverage-selection-item {
            display: flex;
            flex-direction: row;
            align-items: center;

            .tag-styled-text {
                margin: 5px;
                padding: 5px 10px;
                background-color: lightgray;
                border-radius: 5px;
                font-size: 12px;
            }
            
            i {
                padding: 0 10px 0 10px;
                color: darkgray;
                cursor: pointer;
            }

            i:hover {
                color: gray;
            }

        }
        

    }
 
    .coverage-selection-matrix-row {
        display: flex;
        min-width: 600px;
        width: 50%;

        .coverage-selection-top-lable {
            padding-top: 40px;
            font-size: 16px;
            font-weight: 600;
        }
        .coverage-selection-lable {
            font-size: 16px;
            align-self: center;
            font-weight: 600;
        }
    }
`;

const StyledCoverageContainer = styled.div`
    
    width: min-content;
    padding: 1rem 0rem;
    margin: auto;

    .matrix-1d {
        display: grid;
        grid-template-columns: repeat(12, 2.2rem);
    }

    .matrix-2d {
        display: grid;
        grid-template-columns: repeat(13, 2.2rem);
    }

    .grid-titles {
        justify-self: center;
        align-self: center;
    }
`;

const CoverageSelection = ({types, coverage_data, modPapers}) => {
    let gridStatus = {};
    // variables tracks which are selected on each row
    const [selectedFirstEncoding, setSelectedFirstEncoding] = useState("");
    const [selectedSecondEncoding, setSelectedSecondEncoding] = useState("");
    const [selectedThirdEncoding, setSelectedThirdEncoding] = useState("");
    // a list that record all selected encoding combinations
    // it's an object with 
    //    keys = sorted,concatenated encoding,
    //    values = sorted array of non-emplty selection
    const [encodingList, setEncodingList] = useState({});

    // toggle selection for encodings
    const handleClick = (num, name) => {
        if (num === 1) {
            if (selectedFirstEncoding === name) setSelectedFirstEncoding('');
            else setSelectedFirstEncoding(name);
        } else if (num === 2) {
            if (selectedSecondEncoding === name) setSelectedSecondEncoding('');
            else setSelectedSecondEncoding(name);
        } else if (num === 3) {
            if (selectedThirdEncoding === name) setSelectedThirdEncoding('');
            else setSelectedThirdEncoding(name);
        }
    };

    const addToEncodingList = (combination) => {
        // ignore unselected fields
        let arr = combination.filter( e => e !== '');
        // sort in alphabetical order
        arr.sort();
        
        // create key
        var k =  arr.join();

        // if such key doesn't exist in the list, 
        // create a new object with new k-v pair and update old list.
        if (encodingList[k] === undefined) {
            let newList = JSON.parse(JSON.stringify(encodingList));
            newList[k] = arr;
            setEncodingList(newList);
            let lst = getData(arr.length, k.replace(',',''));
            // add related papers
            modPapers(true, lst);
        } else {
            console.log(`Error: the key '${k}' already exists in the list.`);
        }
    };

    const removeFromEncodingList = (combination) => {
        // ignore unselected fields
        let arr = combination.filter( e => e !== '');
        // sort in alphabetical order
        arr.sort();
        
        // create key
        var k =  arr.join();
        // if such key exists in the list, 
        // create a new object without such k-v pair and update old list.
        if (encodingList[k] !== undefined) {
            let newList = JSON.parse(JSON.stringify(encodingList));
            delete newList[k];
            setEncodingList(newList);
            let lst = getData(arr.length, k.replace(',',''));
            // remove related papers
            modPapers(false, lst);
        } else {
            console.log(`Error: Cant remove key '${k}', it does not exist exists in the list.`);
        }
    };

    let getData = (num, key) => {
        let coverage = coverage_data[`${num}-encoding`];
        if (coverage !== undefined && Object.keys(coverage).includes(key) && coverage[key].data.length > 0) {
            return coverage[key].data;
        } else {
            return [];
        }
    };


    return (
        <StyledCoverageSelection>
            {Object.values(encodingList).length === 0 ?
                ''
                :
                <div className="coverage-selection-list-wrapper">
                    <p className="coverage-selection-lable">Selected Encodings Designs:</p>
                    <div className="coverage-selection-list">
                        {
                            Object.values(encodingList).map( item => {
                                return (
                                    <div className="coverage-selection-item">
                                        {item.map( e => (<p key={`${e}-1`} className="tag-styled-text">{e}</p>))}
                                        <i className="fas fa-times-circle" onClick={() => removeFromEncodingList(item)}></i>
                                    </div>
                                );
                            })
                        }
                        
                    </div>
                </div>
            }
            <div className="coverage-selection-select-matrix">
            <p className="coverage-selection-lable">Add an Encodings Design:</p>
                <div className="coverage-selection-matrix-row">
                    <p className="coverage-selection-top-lable">1st Encoding</p>
                    <StyledCoverageContainer>
                        <div className="matrix-1d">
                            {types.map((t) => 
                                (<div className="grid-titles" key={`title-${t}`}>{t}</div>))}
                            {types.map((t) => {
                                gridStatus[t] = false;
                                return (
                                <CoverageCell key={`${t}-2`} category='coverage-none' name={t} 
                                handleClick={() => handleClick(1,t)} isActive={selectedFirstEncoding === t} type="filter"/>);
                            })}
                        </div>
                    </StyledCoverageContainer>
                </div>
                <div className="coverage-selection-matrix-row">
                    <p className="coverage-selection-lable">2nd Encoding</p>
                    <StyledCoverageContainer>
                        <div className="matrix-1d">
                            {types.map((t) =>{
                                gridStatus[t] = false;
                                return (
                                <CoverageCell key={`${t}-3`} category='coverage-none' name={t} 
                                handleClick={() => handleClick(2,t)} isActive={selectedSecondEncoding === t} type="filter" />);
                            })}
                        </div>
                    </StyledCoverageContainer>
                </div>
                <div className="coverage-selection-matrix-row">
                    <p className="coverage-selection-lable">3rd Encoding</p>
                    <StyledCoverageContainer>
                        <div className="matrix-1d">
                            {types.map((t) =>{
                                gridStatus[t] = false;
                                return (
                                <CoverageCell key={`${t}-4`} category='coverage-none' name={t} 
                                handleClick={() => handleClick(3,t)} isActive={selectedThirdEncoding === t} type="filter" />);
                            })}
                        </div>
                    </StyledCoverageContainer>
                </div>
                <Button variant="outline-primary" block onClick={() => addToEncodingList([selectedFirstEncoding, selectedSecondEncoding, selectedThirdEncoding])}>Add</Button>
            </div>
        </StyledCoverageSelection>
    );
};

export default CoverageSelection;
