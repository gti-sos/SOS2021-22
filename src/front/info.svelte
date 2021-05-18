<script>
    import {
      Button,
      Icon,
      Card,
      CardBody,
      CardFooter,
      CardHeader,
      CardSubtitle,
      CardText,
      CardTitle,
      Col,
      Container,
      Row,
    } from "sveltestrap";
  </script>
  
  <main>
    <h1>Info-SOS2021-22</h1>
    
    <Container>
      <Col xs="auto">
        <div class="row">
          <div class="col-sm">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Equipo</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <Col>
                  <a href="https://github.com/josgonrod7">Jose Mª González Rodríguez (GramysAPI)</a>
                </Col>
                <Col>
                  <a href="https://github.com/mansegrod">Manuel Segura Rodríguez (RichppAPI)</a>
                </Col>
                <Col>
                  <a href="https://github.com/antonioparra7">Antonio Parra Diaz (PaawardsAPI)</a>
                </Col>
              </CardBody>
            </Card>
          </div>
          <div class="col-sm-3">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Repositorio</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <a href="http://github.com/gti-sos/SOS2021-22"><Button color="warning"><strong>GITHUB</strong></Button></a>
              </CardBody>
            </Card>
          </div>
          <div class="col-sm-3">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Heroku</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <a href="http://sos2021-22.herokuapp.com"><Button color="warning"><strong>HEROKU</strong></Button></a>
              </CardBody>
            </Card>
          </div>
        </div>
      </Col>
    </Container>

    <Container>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader class="bg-secondary">
            <CardTitle><h2>Analíticas</h2></CardTitle>
          </CardHeader>
          <CardBody>
            <div class="row">
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>Grmys</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="#/grmys/grmysGraphic"><Button color="warning"><strong>Gramys</strong></Button></a>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>Richpp</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="#/richpp/richppGraphic"><Button color="warning"><strong>Richpp</strong></Button></a>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>Paawards</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="#/paawards/paawardsGraphic"><Button color="warning"><strong>Paawards</strong></Button></a>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>Común</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="#/globalGraphic"><Button color="warning"><strong>Común</strong></Button></a>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Container>
  
    <Container>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader class="bg-secondary">
            <CardTitle><h2>APIs</h2></CardTitle>
          </CardHeader>
          <CardBody>
            <div class="row">
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>API Grmys</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="https://sos2021-22.herokuapp.com/api/v2/grmys">
                          <Button color="dark">Backend</Button>
                        </a>
                        <a href="/#/grmys">
                          <Button color="dark">Frontend</Button>
                        </a>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md p-1">
                        <a href="https://documenter.getpostman.com/view/15364149/TzJoFgNA">
                          <Button color="danger">Documentacion Postman v2</Button>
                        </a>
                       
                      </div>
                      <div class="col-md p-1">
                        <a href="https://documenter.getpostman.com/view/15364149/TzRNFVj4">
                          <Button color="danger">Documentacion Postman v1</Button>
                        </a>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter >Desarrollado por
                    <a href="https://github.com/josgonrod7">Jose Mª González Rodríguez</a>
                  </CardFooter>
                </Card>
              </div>
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>API Richpp</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="https://sos2021-22.herokuapp.com/api/v2/richpp">
                          <Button color="dark">Backend</Button>
                        </a>
                        <a href="/#/richpp">
                          <Button color="dark">Frontend</Button>
                        </a>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md p-1">
                        <a href="https://documenter.getpostman.com/view/15457127/TzJu9cgP">
                          <Button color="danger">Documentacion Postman V2</Button>
                        </a>
                      </div>
                      <div class="col-md p-1">
                        <a href="https://documenter.getpostman.com/view/15457127/TzRRDTqC">
                          <Button color="danger">Documentacion Postman V1</Button>
                        </a>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>Desarrollado por
                    <a href="https://github.com/mansegrod">Manuel Segura Rodríguez</a>
                  </CardFooter>
                </Card>
              </div>
              <div class="col-sm">
                <Card class="mb-3">
                  <CardHeader class="bg-secondary">
                    <CardTitle><h2>API Paawards</h2></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="row">
                      <div class="col-md">
                        <a href="https://sos2021-22.herokuapp.com/api/v1/paawards">
                          <Button color="dark">Backend</Button>
                        </a>
                        <a href="/#/paawards">
                          <Button color="dark">Frontend</Button>
                        </a>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md p-1">
                        <a href="https://documenter.getpostman.com/view/9778361/TzJvdGUf">
                          <Button color="danger">Documentacion Postman</Button>
                        </a>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>Desarrollado por
                    <a href="https://github.com/antonioparra7">Antonio Parra Diaz</a>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Container>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      max-width: 240px;
      margin: 0 auto;
    }
    h1 {
      color: #ff9900;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
    h2 {
      color: #000000;
    }
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
  </style>