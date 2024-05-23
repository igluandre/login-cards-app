import styled from "styled-components";

const SpinnerWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CustomLoader = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #4d869c);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;

  @keyframes s3 {
    to {
      transform: rotate(1turn);
    }
`;

export const Spinner = () => {
    return (
      <>
        <SpinnerWrapper className="spinner-wrapper flex">
          <CustomLoader className="custom-loader"></CustomLoader>
        </SpinnerWrapper>
      </>
    );
  };
  