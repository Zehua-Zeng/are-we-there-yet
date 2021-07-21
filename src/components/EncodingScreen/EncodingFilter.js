import React, { useState } from 'react';
// import ReactDOM from "react-dom";
// local components
import CoverageSelection from '../CoverageScreen/CoverageSelection';
// bootstrap components
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
// imgs

import pie from '../../resources/imgs/chart_types/pie-chart.png';
import bar from '../../resources/imgs/chart_types/bar-chart.png';
import column from '../../resources/imgs/chart_types/column-chart.png';
import line from '../../resources/imgs/chart_types/line-chart.png';
import area from '../../resources/imgs/chart_types/area-chart.png';
import bubble from '../../resources/imgs/chart_types/bubble-chart.png';
import scatter from '../../resources/imgs/chart_types/scatter-chart.png';

// import misc
// styled components
import styled from 'styled-components';

const StyledEncodingFilter = styled.div`
    width: 100%;
    margin: 2rem 0 2rem !important;

    .card-header {
        padding: 0.5rem 0 0.5rem 1rem;
        font-weight: 600;
    }

    .card-body {
        padding: 0.5rem 1.5rem 0.5rem 1.5rem;

        .tab-content-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 30px;

            .chart-type-container {
                margin: 0 10px;
                input {
                    display: none;
                }

                label {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    width: 105px;
                    padding: 15px;
                    border: 1px solid lightgray;
                    border-radius: 10px;

                    img {
                        width: auto;
                        height: auto;
                    }

                    .chart-type-txt {
                        height: 50px;
                        font-weight: 600;
                        padding-top: 10px;
                        margin: 0;
                    }
                }

                label:hover, input:checked + label {
                    background-color: lightgray;
                    border: 1px solid gray;
                }
            }
        }
        .card-body-input-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 1rem 0;

            .card-body-input-label {
                margin: 0 1rem 0 0;
                font-weight: 600;

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

const EncodingFilter = ({
    tasks,
    encodingTypes,
    coverage_data,
    modPapers
}) => {
    let taskSuggestions = [];
    for (const t of tasks) {
        taskSuggestions.push({
            label: t.replace('-', ' '),
            value: t,
        });
    }

    return (
        <StyledEncodingFilter>
            <Card>
                <Card.Header>Encodings Filter</Card.Header>
                <Card.Body>
                    <Tabs defaultActiveKey="filter-1" id="uncontrolled-tab-example">
                        <Tab eventKey="filter-1" title="Chart Type">
                            <div className='tab-content-container'>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="pie" name="pie"/>
                                    <label for="pie"><img className="chart-type-img" alt="pie chart" src={pie}/>
                                    <p className="chart-type-txt">Pie Chart</p></label>
                                </div>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="bar" name="bar"/>
                                    <label for="bar"><img className="chart-type-img" alt="bar chart" src={bar}/>
                                    <p className="chart-type-txt">Bar Chart</p></label>
                                </div>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="column" name="column"/>
                                    <label for="column"><img className="chart-type-img" alt="column chart" src={column}/>
                                    <p className="chart-type-txt">Column Chart</p></label>
                                </div>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="line" name="line"/>
                                    <label for="line"><img className="chart-type-img" alt="line chart" src={line}/>
                                    <p className="chart-type-txt">Line Chart</p></label>
                                </div>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="area" name="area"/>
                                    <label for="area"><img className="chart-type-img" alt="area chart" src={area}/>
                                    <p className="chart-type-txt">Area Chart</p></label>
                                </div>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="bubble" name="bubble"/>
                                    <label for="bubble"><img className="chart-type-img" alt="bubble chart" src={bubble}/>
                                    <p className="chart-type-txt">Bubble Chart</p></label>
                                </div>
                                <div className='chart-type-container'>
                                    <input type="checkbox" id="scatter" name="scatter"/>
                                    <label for="scatter"><img className="chart-type-img" alt="scatter chart" src={scatter}/>
                                    <p className="chart-type-txt">Scatter Chart</p></label>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="filter-2" title="Encoding Design">
                            <div className='tab-content-container'>
                                <CoverageSelection types={encodingTypes} coverage_data={coverage_data}  modPapers={modPapers} />
                            </div>
                        </Tab>
                    </Tabs>
                    
                </Card.Body>
            </Card>
        </StyledEncodingFilter>
    );
};

export default EncodingFilter;
