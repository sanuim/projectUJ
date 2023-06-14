import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Container, Row, Col } from 'react-bootstrap';

const ParallaxScrolling = () => {
  const parallaxContainerStyle = {
    position: 'relative',
    height: '150vh',
    background: 'url("back.jpg") no-repeat center center fixed',
    backgroundSize: 'cover',
    padding: '20px'
  };

  const parallaxSectionStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: '40px',
    margin: '40px',
  };

  const contentSectionStyle = {
    backgroundColor: '#f8f8f8',
    padding: '40px',
    margin: '40px',
  };

  return (
    <div style={parallaxContainerStyle}>
      <Parallax y={[-20, 20]}>
        <div style={parallaxSectionStyle}>
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col>
                <h2 className="text-center">Parallax Scrolling Example</h2>
                <p className="text-center">
                  Parallax scrolling is a technique where the background
                  content moves at a different speed than the foreground
                  content, creating an illusion of depth and adding visual
                  interest to the page.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </Parallax>

      <div style={contentSectionStyle}>
        <Container>
          <Row>
            <Col>
              <h3>Section 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque rutrum tellus quis nunc tempor rutrum. Nunc gravida
                ligula in odio tempus, at laoreet quam suscipit. Integer
                iaculis diam vel orci aliquet, at finibus sapien suscipit.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Parallax y={[-40, 40]}>
        <div style={parallaxSectionStyle}>
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col>
                <h3>Section 2</h3>
                <p>
                  Sed maximus auctor risus, auctor molestie lacus hendrerit
                  ut. Quisque id est velit. Nam commodo sem ac turpis cursus,
                  ut ullamcorper dui malesuada. Duis hendrerit quam ut
                  vehicula finibus. Aliquam dapibus hendrerit enim vel
                  interdum. In id consequat leo. Sed eu quam sit amet ex
                  efficitur laoreet. Nulla facilisi.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </Parallax>

      <div style={contentSectionStyle}>
        <Container>
          <Row>
            <Col>
              <h3>Section 3</h3>
              <p>
                Phasellus at dui sed enim vulputate sollicitudin. Morbi
                gravida, urna nec malesuada suscipit, neque lorem cursus
                magna, in malesuada est ipsum id lacus. Nullam convallis
                lobortis neque, sit amet fermentum enim placerat et. Nam
                ullamcorper odio at justo finibus, sed dapibus sapien
                facilisis. In non neque ullamcorper, suscipit lectus a,
                semper sem.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ParallaxScrolling;
