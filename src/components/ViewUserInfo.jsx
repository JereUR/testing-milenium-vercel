import styled from "styled-components";

import { UserViewInfo } from "./UserViewInfo";

export const ViewUserInfo = ({ user }) => {
  return (
    <InfoUser>
      <InfoContainer>
        <UserViewInfo user={user} />
      </InfoContainer>
    </InfoUser>
  );
};

const InfoContainer = styled.div``;

const InfoUser = styled.div``;

/* const NutritionalPlanContainer = styled.div`
  text-align: center;

  @media screen and (max-width: 1050px) {
    margin: 0vw 4vw 5vw 4vw;
  }
`;

const RutineContainer = styled.div`
  text-align: center;

  @media screen and (max-width: 1050px) {
    margin: 4vw 4vw 2vw 4vw;
  }

  @media screen and (max-width: 900px) {
    margin: 8vw 4vw 5vw 4vw;
  }
`; */
