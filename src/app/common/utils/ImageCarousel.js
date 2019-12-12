import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";
import CustomDotGroup from "../utils/CustomDotGroup";

const ImageCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={3}
  >
    <Slider>
    <Slide tag="a" index={0}>
        <Image src="/assets/images/cat.JPG" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="/assets/images/flower1.JPG" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="/assets/images/buddha.JPG" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;
