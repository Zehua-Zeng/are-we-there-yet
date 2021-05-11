import React from "react";
import CoverageCell from './CoverageCell';
// styled components
import styled from 'styled-components';

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

var CoverageMatrix = (props) => {
    let rowTemp = [""];
    let gridStatus = {};
    
    rowTemp = rowTemp.concat(props.types);
    var i = 0;
    var j = 0;

    let getCoverageCategory = (str) => {
        if (Object.keys(props.data).includes(str) && props.data[str].category.length > 0) {
            return 'coverage-' + props.data[str].category.toLowerCase();
        } else {
            return 'coverage-none';
        }
    };

    let getData = (key) => {
        if (Object.keys(props.data).includes(key) && props.data[key].data.length > 0) {
            return props.data[key].data;
        } else {
            return [];
        }
    };

    let handleClick = (add, key) => {
        // update selection
        let lst = getData(key);
        props.modPapers(add, lst);
    }

    if (props.eventKey === "1") {
        return (
            <StyledCoverageContainer>
                <div className="matrix-1d">
                    {props.types.map((t) => 
                        (<div className="grid-titles" key={`title-${t}`}>{t}</div>))}
                    {props.types.map((t) =>{
                        gridStatus[t] = false;
                        let category = getCoverageCategory(t);
                        return (
                        <CoverageCell category={category} name={t} 
                        handleClick={handleClick}/>);
                    })}
                </div>
            </StyledCoverageContainer>);
            
    } else {
        return (
            <StyledCoverageContainer>
                <div className="matrix-2d">
                    
                    { // first row title
                    rowTemp.map((t) => 
                        (<div className="grid-titles" key={`title-${t}`}>{t}</div>))}
                    {
                    rowTemp.map((t) => {
                        return rowTemp.map((t1) => {
                            if (j < rowTemp.length) {
                                let res = undefined;
                                // column titles
                                if (t1 === "") {
                                    i++;
                                    res = (<div className="grid-titles" key={`${i}-${j}`}>{rowTemp[j+1]}</div>);
                                // table contents
                                } else {
                                    if (rowTemp[i] !== undefined && rowTemp[j+1] !== undefined) {
                                        let key = rowTemp[i]+rowTemp[j+1];
                                        let category = getCoverageCategory(key);
                                        gridStatus[key] = false;

                                        res = (
                                            <CoverageCell category={category} name={key} handleClick={handleClick} />);
                                            i++;
                                    } else {
                                        res = <></>;
                                    }
                                    
                                }

                                // reset i when out of bound
                                if (i >= rowTemp.length) {
                                    i = 0;
                                    j++;
                                }
                                return res;
                            
                            // hide extra row
                            } else {
                                return null;
                            }
                        });
                    })}
                </div>
            </StyledCoverageContainer>
        );
    }
   
}

export default CoverageMatrix;