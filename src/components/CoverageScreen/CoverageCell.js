import React, { useEffect } from "react";
// styled components
import styled from 'styled-components';

const StyledCellContainer = styled.div`
    .grid-values {
        border: solid 0.5px white;
        height: 2.4rem;
    }
    
    .active-value {
        cursor: pointer;
        color: black;
        padding: 7px;
    }

    .coverage-experiment-active {
        background-color: rgb(77, 171, 214);
    }

    .coverage-experiment-deactive {
        cursor: pointer;
        color: lightblue;
        background-color: lightblue;
    }

    .coverage-experiment-deactive:hover {
        color: #70C2E8;
        background-color: #70C2E8;
    }

    .coverage-hybrid-active {
        background-color: rgb(141, 204, 108);
    }

    .coverage-hybrid-deactive {
        color: rgb(181, 237, 152);
        background-color: rgb(181, 237, 152);
    }

    .coverage-hybrid-deactive:hover {
        color: rgb(162, 222, 131);
        background-color: rgb(162, 222, 131);
    }

    .coverage-theory-active {
        background-color: rgb(235, 196, 96);
    }

    .coverage-theory-deactive {
        cursor: pointer;
        color: rgb(250, 224, 152);
        background-color: rgb(250, 224, 152);
    }

    .coverage-theory-deactive:hover {
        color: rgb(245, 210, 118);
        background-color: rgb(245, 210, 118);
    }

    .coverage-none {
        color: lightgrey;
        background-color: lightgrey;
    }

    .coverage-none:hover {
        color: #70C2E8;
        background-color: #70C2E8;
    }

    .coverage-none-active {
        background-color: rgb(77, 171, 214);
    }

    .coverage-none-deactive {
        cursor: pointer;
        color: lightgrey;
        background-color: lightgrey;
    }

    .coverage-none-deactive:hover {
        color: #70C2E8;
        background-color: #70C2E8;
    }

`;

var CoverageCell = ({category, name, handleClick, status, isActive, type}) => {
    const [active, setActive] = React.useState(status);

    let clickEvent = () => {
        setActive(!active);
        handleClick(!active, name);
    }

    useEffect(() => {
        setActive(status);
    }, [status]);

    if (category.localeCompare("coverage-none") === 0) {
        // filter matrix cell have states depends on parent component
        if (type === 'filter') {
            return (
                <StyledCellContainer>
                    <div className={`grid-values ${isActive ? "coverage-none-active active-value" : "coverage-none-deactive"}`} onClick={() => handleClick()}>
                        {isActive ? <i className="fas fa-check"></i> : <p>X</p>}
                    </div>
                </StyledCellContainer>
                
            );
        }

        return (<StyledCellContainer>
        {/* <div className={`grid-values ${category} active-value`} onClick={() => clickEvent()}>
            X
        </div> */}
        <div className={`grid-values ${active ? "coverage-none-active active-value" : "coverage-none-deactive"}`} onClick={() => clickEvent()}>
            {active ? <i className="fas fa-check"></i> : <p>X</p>}
        </div>
    </StyledCellContainer>);
    }
    
    return (
        <StyledCellContainer key={name}>
            <div className={`grid-values ${active ? category+"-active active-value" : category+"-deactive"}`} onClick={() => clickEvent()}>
               {active ?  <i className="fas fa-check"></i> : <p>X</p> }
            </div>

        </StyledCellContainer>
    );
   
}

export default CoverageCell;