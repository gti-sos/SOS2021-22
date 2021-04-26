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

  <h2>Team</h2>
  <Container>
    <Col>
      <a href="https://github.com/josgonrod7">Jose Mª González Rodríguez</a>
    </Col>
    <Col>
      <a href="https://github.com/mansegrod">Manuel Segura Rodríguez</a>
    </Col>
    <Col>
      <a href="https://github.com/antonioparra7">Antonio Parra Diaz</a>
    </Col>
  </Container>

  <h2>Project description</h2>
  <p>
    Grupos de musica con mas grammys de la historia, personas más ricas del
    mundo en el último lustro y ganadores del premio princesa de Asturias desde
    el año 2000
  </p>

  <Container>
    <Col>
      <a href="http://github.com/gti-sos/SOS2021-22"><b>Repository: </b>http://github.com/gti-sos/SOS2021-22</a>
    </Col>
    <Col>
      <a href="http://sos2021-22.herokuapp.com"><b>URL: </b>http://sos2021-22.herokuapp.com</a>
    </Col>
  </Container>

  <h2>APIs</h2>
  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Grmys</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText />
          <a href="https://sos2021-22.herokuapp.com/api/v1/grmys">
            <Button color="primary">Backend</Button>
          </a>
          <Button color="primary">Frontend</Button>
          <a href="https://documenter.getpostman.com/view/15364149/TzJoFgNA">
            <Button color="info">Postman Documentation</Button>
          </a>
        </CardBody>
        <CardFooter >developed by
          <a href="https://github.com/josgonrod7">Jose Mª González Rodríguez</a>
        </CardFooter>
      </Card>
    </Col>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Paawards</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText />
          <a href="https://sos2021-22.herokuapp.com/api/v1/paawards">
            <Button color="primary">Backend</Button>
          </a>
          <a href="/#/paawards">
            <Button color="primary">Frontend</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/9778361/TzJvdGUf">
            <Button color="info">Postman Documentation</Button>
          </a>
        </CardBody>
        <CardFooter> developed by
          <a href="https://github.com/antonioparra7">Antonio Parra Diaz</a>
        </CardFooter>
      </Card>
    </Col>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Richpp</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText />
          <a href="https://sos2021-22.herokuapp.com/api/v1/richpp">
            <Button color="primary">Backend</Button>
          </a>
          <a href="/#/richpp">
            <Button color="primary">Frontend</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/15457127/TzJu9cgP">
            <Button color="info">Postman Documentation</Button>
          </a>
        </CardBody>
        <CardFooter> developed by
          <a href="https://github.com/mansegrod">Manuel Segura Rodríguez</a>
        </CardFooter>
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
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  b {
    color: #00c1ff;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
