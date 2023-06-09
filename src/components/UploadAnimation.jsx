import Lottie from 'react-lottie'
import styled from 'styled-components'

export const UploadAnimation = ({ uploadFiles, animation, height, width }) => {
  const uploadPhotoData = {
    loop: true,
    autoplay: true,
    animationData: animation
  }

  return (
    <AnimationContainer onClick={uploadFiles}>
      <Lottie options={uploadPhotoData} height={height} width={width} />
    </AnimationContainer>
  )
}

const AnimationContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`
