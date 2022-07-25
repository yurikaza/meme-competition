import * as React from "react";
import { Container, Row } from "react-bootstrap";
import "./LandingPage.css";

declare let window: any;

interface States
{
}

interface Props 
{
}

export class LandingPage extends React.Component<Props, States>
{
    render(): React.ReactNode
    {
        return (
            <div className="main">
                <h1 className="bc-text">Hola amigos, gracias no qiero una meme aqiue</h1>
                <div className="landing-page-main">
                    <Container>
                        <Row>
                            <div className="col-md-6">
                                <h1>Meme Competiton</h1>
                                <p>Hola amigos, gracias no qiero una meme aqiue</p>
                                <button>Get Started</button>
                            </div>
                            <div className="col-md-6 image-col">
                                <img src="/img/Image.png" height="500px" />
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    } 
}
