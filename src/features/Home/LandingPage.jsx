import React from 'react'
import { Container, Header, Segment } from "semantic-ui-react";
import "pure-react-carousel/dist/react-carousel.es.css";
import ImageCarousel from "../../app/common/utils/ImageCarousel";

const LandingPage = () => {
    return (
        <Container style={{ margin: 20 }}>
            <Segment attached="top">
                <Header as="h2" content="E2ISA Your on stop Solution for All" />
                <p>
                    Welcome to E2ISA App You can login here to see and add your data.
                look into <code>Developed By Nirav Joshi</code> Data Walker.
            </p>
            </Segment>
            <Segment attached="bottom">
                <ImageCarousel />
            </Segment>
        </Container >


    )
}

export default LandingPage;