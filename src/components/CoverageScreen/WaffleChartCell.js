import React from "react";
// styled components
import styled from 'styled-components';

const StyledChartCellContainer = styled.div`
    .grid-values {
        margin: 0.2rem;
        width: 1.2rem;
        height: 1.2rem;
        font-size: 1rem;
        cursor: default;
        position: relative;

        .tooltiptext {
            visibility: hidden;
            width: 125px;
            background-color: rgba(0,0,0,0.8);
            color: #fff;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;
            font-size: 0.8rem;
            
            position: absolute;
            top: -1rem;
            left: 2rem; 
            z-index: 2;

            p {
                margin: 0;
            }

            .tooltip-title {
                font-weight: 500;
                text-align: start;
                padding: 0.2rem 0.5rem;
            }

            .tooltip-tag {
                width: fit-content;
                padding: 0.2rem;
                border-radius: 0.2rem;
                margin: 0 auto 0.2rem;
                color: black;
                font-size: 0.5rem;
            }

            .tag-design {
                background-color: lightgray;
                color: black;
            }

            .tag-hybrid {
                /* color: rgb(181, 237, 152); */
                background-color: rgb(181, 237, 152);
            }

            .tag-experiment {
                background-color: lightblue;
            }

            .tag-theory {
                background-color: rgb(250, 224, 152);
            }
        }

        .tooltiptext::after {
            content: " ";
            position: absolute;
            top: 20%;
            right: 100%; /* To the left of the tooltip */
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent black transparent transparent;
        }
    }

    .grid-values:hover .tooltiptext {
        visibility: visible
    }

    .experiment-deactive {
        color: lightblue;
        background-color: lightblue;
    }

    .experiment-deactive:hover {
        color: #70C2E8;
        background-color: #70C2E8;
    }

    .hybrid-deactive {
        color: rgb(181, 237, 152);
        background-color: rgb(181, 237, 152);
    }

    .hybrid-deactive:hover {
        color: rgb(162, 222, 131);
        background-color: rgb(162, 222, 131);
    }

    .theory-deactive {
        color: rgb(250, 224, 152);
        background-color: rgb(250, 224, 152);
    }

    .theory-deactive:hover {
        color: rgb(245, 210, 118);
        background-color: rgb(245, 210, 118);
    }

`;

var WaffleChartCell = ({category, name}) => {
    return (
        <StyledChartCellContainer key={name} data-testid={name}>
            <div className={`grid-values ${category.toLowerCase()+"-deactive"}`} >
                <span className="tooltiptext">
                    <div>
                        <p className="tooltip-title">Coverage:</p>
                        <p className={`tooltip-tag tag-${category.toLowerCase()}`}>        {category.toLowerCase()} 
                        </p>
                    </div>
                    <div>
                        <p className="tooltip-title">Encoding Design:</p>
                        <p className={`tooltip-tag tag-design`}> 
                            {name}
                        </p>
                    </div>
                </span>
            </div>
        </StyledChartCellContainer>
    );
}

export default WaffleChartCell;