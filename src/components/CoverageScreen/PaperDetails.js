import React from "react";
// styled components
import styled from 'styled-components';

const StyledPaperDetails = styled.div`
   background-color: rgb(227, 227, 227);
   padding: 1rem;
   border-radius: 0.5rem;
   margin-bottom: 1rem;
   
   .details-top-container {
       display: flex;
       min-height: 2rem;
       font-weight: bold;

        .details-tag {
            border-radius: 0.3rem;
            padding: 0.3rem 0.4rem;
            margin: 0 1rem 0 0;
            width: fit-content;
            height: 2rem;
        }
        .details-tag-experiment {
            background-color: lightblue;
        }
        .details-tag-theory {
            background-color: rgb(250, 224, 152);
        }
        .details-tag-hybrid {
            background-color: rgb(181, 237, 152);
        }

       .details-title {
           margin: 0.3rem 0 0 0;
       }
   }

   .details-mid-container {
        display:flex;
        font-weight: bold;
        margin: 0.8rem 0 0.8rem 0;

        .details-title {
            margin: 0.2rem 0 0 0;
        }
        .details-tag-task {
            border-radius: 0.3rem;
            padding: 0.3rem 0.4rem;
            margin: 0 1rem 0 0;
            width: fit-content;
            height: 2rem;
            margin: 0 0 0 0.5rem;
            background-color: rgb(201, 201, 201);
        }
   }

   .details-bot-container {
        display:flex;
        font-weight: bold;
        .details-title {
            margin: 0.2rem 0 0 0;
        }
        .fas {
            display: flex;
            margin: 0.4rem 0 0 1rem;
            p {
                margin: 0 0 0 0.4rem;
                font-family: 'Kumbh Sans',sans-serif;
                font-weight: 500;
            }
        }
   }

`;

var PaperDetails = ({data}) => {
    return (
        <StyledPaperDetails>
            <div className="details-top-container">
                <div className={`details-tag details-tag-${data.category.toLowerCase()}`}>{data.category}</div>
                <p className="details-title">{data.title}</p>
            </div>
            <div className="details-mid-container">
                    <p className="details-title">Tasks:</p>
                    {
                        data.tasks.length === 0 ?
                            <p>No tasks available</p>
                            :
                            data.tasks.map(t => 
                                <div className="details-tag-task" key={t}>{t}</div>)
                    }
            </div>
            <div className="details-bot-container">
                    <p className="details-title">Ranked:</p>
                    {
                        data.ranked ?
                        <i className="fas fa-check"> <p>True</p></i>  : <i className="fas fa-times"><p> False</p></i>
                    }
            </div>

        </StyledPaperDetails>
    );
}

export default PaperDetails;