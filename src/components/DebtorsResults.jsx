import React from 'react'
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";

import { Colors } from "../constants/Colors";

const { secondaryBlue, primaryBlue, primaryRed } = Colors;

export const DebtorsResults = ({debtors}) => {

  console.log(debtors.length)

  return (
    <>
      {debtors.length > 0 ? (
        <DebtorsResult>
          {debtors.map((el, index) => (
            <DebtorItem key={index}>
              <DebtorInfo>
                {el.username} {el.surname} - {el.email}
              </DebtorInfo>
              <LogoContainer>
                <RiErrorWarningLine
                  fontSize="2.5rem"
                  onClick={() => handleReport(el.email)}
                />
                <Span className="tooltip">Enviar reporte a {el.email}</Span>
              </LogoContainer>
            </DebtorItem>
          ))}
        </DebtorsResult>
      ):(<TextNoData>Sin deudores.</TextNoData>)}
    </>
  )
}

const DebtorInfo = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${secondaryBlue};
`;

const DebtorItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 210, 210);
  margin: 2.5vw 5vw 0 5vw;
  padding: 0.5vw 2vw;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 3px 3px ${primaryRed};

  svg {
    position: relative;
    top: 0.8vw;
  }
`;

const DebtorsResult = styled.div``;

const LogoContainer = styled.div`
  color: rgb(255, 69, 0);

  svg {
    cursor: pointer;
    transition: all 0.6s ease;

    :hover {
      transform: scale(1.1);
    }
  }

  .tooltip {
    visibility: hidden;
    position: absolute;
    transform: translate(-2%, -75%);
    background-color: black;
    color: white;
    padding: 0.7rem;
    border-radius: 15px 15px 15px 0;
    font-size: 0.8rem;

    @media screen and (max-width: 1350px) {
      transform: translate(-120%, -90%);
      border-radius: 15px 15px 0 15px;
    }

    @media screen and (max-width: 480px) {
      transform: translate(-120%, -90%);
      border-radius: 15px 15px 0 15px;
    }
  }

  :hover .tooltip {
    visibility: visible;
  }
`;

const Span = styled.span``;

const TextNoData = styled.div`
  text-align: center;
  color: rgb(30, 30, 30);
  font-style: italic;
`;
