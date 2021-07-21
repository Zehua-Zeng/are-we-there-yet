import React, { useState, useEffect} from "react";
// styled components
import styled from 'styled-components';
// bootstrap components
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
// local componenet
import WaffleChartCell from './WaffleChartCell';

const StyledWaffleChart = styled.div`
    width: 100%;
    margin: 0 0 2rem 0;
    .card {
        /* height: 40vh; */
        .card-body {
            max-height: 45.23rem;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
`;

var WaffleChart = ({data, encodingTypes}) => {
    const [count, setCount] = useState(0);
    var len = encodingTypes.length;
    var total = (len + Math.pow(len, 2) + Math.pow(len, 3));;

    useEffect(() => {
        var i = 0;
        for (var encoding of Object.entries(data.coverages)) {
            for (var design of Object.keys(encoding[1])) {
                i++;
            }
        }
        setCount(i);
    });

    return (
        <StyledWaffleChart>
            <Card>
                <Card.Header>
                    Encoding Coverages
                    <ProgressBar variant="info" now={count / total} />
                    <p>{`${count} out of ${total} covered`}</p>
                </Card.Header>
                <Card.Body>
                    {Object.keys(data.coverages).map(encoding => {
                        return Object.keys(data.coverages[encoding]).map(design => {
                            return <WaffleChartCell category={data.coverages[encoding][design].category} name={design} key={design}/>
                        })  
                    })}
                </Card.Body>
            </Card>
        </StyledWaffleChart>
    );
};

export default WaffleChart;