import styled from 'styled-components';

const ImagesUploaderWrapper = styled.div`
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-upload-list-item-info > span {
    width: 100%;
    height: 100%;
  }

  .ant-upload-list-item-thumbnail > img {
    object-fit: cover;
  }
`;

export default ImagesUploaderWrapper;
