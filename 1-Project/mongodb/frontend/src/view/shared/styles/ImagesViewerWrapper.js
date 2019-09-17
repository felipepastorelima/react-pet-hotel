import styled from 'styled-components';

const ImagesViewerWrapper = styled.div`
  .ant-carousel img {
    width: 100%;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
  }

  .ant-carousel .slick-track {
    height: inherit !important;
  }
`;

export default ImagesViewerWrapper;
