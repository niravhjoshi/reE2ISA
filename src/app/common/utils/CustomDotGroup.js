import { Dot } from "pure-react-carousel";
import React from "react";
import {  Container, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const CustomDotGroup = ({ slides, size }) => (
    <Container textAlign="center">
      <Button.Group size={size}>
        {[...Array(slides).keys()].map(slide => (
          <Button as={Dot} key={slide} icon="circle" slide={slide} />
        ))}
      </Button.Group>
    </Container>
  );
  
  CustomDotGroup.defaultProps = {
    size: "mini"
  };
  
  CustomDotGroup.propTypes = {
    slides: PropTypes.number.isRequired,
    size: PropTypes.string
  };
  
  export default CustomDotGroup;