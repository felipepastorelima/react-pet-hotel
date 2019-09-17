import styled from 'styled-components';

const Content = styled.div`
  width: 500px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 56px 40px;
  position: relative;
  background-color: white;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Content;
