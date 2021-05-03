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
  <h1>SOS2021-22</h1>
  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader class="bg-secondary">
          <CardTitle><h2>Equipo</h2></CardTitle>
        </CardHeader>
        <CardBody>
          <Col>
            <a href="https://github.com/josgonrod7">Jose Mª González Rodríguez</a>
          </Col>
          <Col>
            <a href="https://github.com/mansegrod">Manuel Segura Rodríguez</a>
          </Col>
          <Col>
            <a href="https://github.com/antonioparra7">Antonio Parra Diaz</a>
          </Col>
          <Col> <a href="/#/info">
            <Button color="dark">info</Button>
          </a>
          </Col>
         
        </CardBody>
      </Card>
    </Col>
  </Container>

  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader class="bg-secondary">
          <CardTitle><h2>Descripcion Proyecto</h2></CardTitle>
        </CardHeader>
        <CardBody>
          <ul>
            <li>Grupos de musica con mas grammys de la historia</li>
            <li>Personas más ricas del mundo en el último lustro</li>
            <li>Ganadores del premio princesa de Asturias desde el año 2000</li>
          </ul>
        </CardBody>
      </Card>
    </Col>
  </Container>

  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader class="bg-secondary">
          <CardTitle><h2>Repositorio</h2></CardTitle>
        </CardHeader>
        <CardBody>
          <a href="http://github.com/gti-sos/SOS2021-22">http://github.com/gti-sos/SOS2021-22</a>
        </CardBody>
      </Card>
    </Col>
  </Container>

  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader class="bg-secondary">
          <CardTitle><h2>Heroku</h2></CardTitle>
        </CardHeader>
        <CardBody>
          <a href="http://sos2021-22.herokuapp.com">http://sos2021-22.herokuapp.com</a>
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
                      <a href="https://sos2021-22.herokuapp.com/api/v1/grmys">
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
                        <Button color="danger">Documentacion Postman</Button>
                      </a>
                    </div>
                  </div>
                </CardBody>
                <CardFooter >desarrollado por
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
                      <a href="https://sos2021-22.herokuapp.com/api/v1/richpp">
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
                        <Button color="danger">Documentacion Postman</Button>
                      </a>
                    </div>
                  </div>
                </CardBody>
                <CardFooter>desarrollado por
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
                <CardFooter>desarrollado por
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
