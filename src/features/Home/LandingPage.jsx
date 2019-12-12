import React from 'react'
import { Container, Header, Segment } from "semantic-ui-react";
import "pure-react-carousel/dist/react-carousel.es.css";
import ImageCarousel from "../../app/common/utils/ImageCarousel";

const LandingPage = () => {
    return (
        <Container style={{ margin: 20 }}>
            <Segment attached="top">
                <Header as="h2" content="Image carousel" />
                <p>
                    This prototype features how to create a carousel with images, take a
                look into <code>examples/ImageCarousel</code> to get more details.
            </p>
            </Segment>
            <Segment attached="bottom">
                <ImageCarousel />
            </Segment>
        </Container >


    )
}

export default LandingPage;