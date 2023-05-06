import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import { Colors } from '../constants/Colors';

const { backgroundText } = Colors;

export const Carousel = (images) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleNext = () => {
    if (currentImage === images.images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }

    handleButtonInteraction();
  };

  const handlePrev = () => {
    if (currentImage === 0) {
      setCurrentImage(images.images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }

    handleButtonInteraction();
  };

  useEffect(() => {
    const id = setInterval(handleNext, 5000);
    setIntervalId(id);
    return () => clearInterval(intervalId);
  }, [currentImage]);

  const handleButtonInteraction = () => {
    clearInterval(intervalId);
  };

  console.log(currentImage);

  return (
    <CarouselContainer>
      <Button type="button" onClick={handlePrev}>
        <IoIosArrowBack size={28} />
      </Button>
      <Button type="button" onClick={handleNext}>
        <IoIosArrowForward size={28} />
      </Button>
      <CarouselImages>
        <CarouselImage
          key={currentImage}
          src={images.images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
        />
      </CarouselImages>
    </CarouselContainer>
  );
};

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${backgroundText};
  border-radius: 100%;
  margin: 0 2vw;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  transition: opacity 0.5s ease-in-out;

  :first-of-type {
    left: 0;
  }

  :last-of-type {
    right: 0;
  }

  :hover {
    opacity: 0.7;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 5px 5px 5px #ccc;
  transition: opacity 0.5s ease-in-out;
`;

const CarouselImages = styled.div`
  position: relative;
  height: 800px;
  overflow: hidden;
`;
