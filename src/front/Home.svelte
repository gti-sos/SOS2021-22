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
      Nav,
      NavItem,
      NavLink,
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
              <a href="https://github.com/josgonrod7">Jose Mª González Rodríguez </a>
            </Col>
            <Col>
              <a href="https://github.com/mansegrod">Manuel Segura Rodríguez</a>
            </Col>
            <Col>
              <a href="https://github.com/antonioparra7">Antonio Parra Diaz</a>
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
      <div class="row">
        <div class="col-md p-1">
          <a href="/#/info"><Button color="dark">+Info</Button></a>
          
          <a href="/#/about"><Button color="warning">About</Button></a>

          <a href="/#/integrations"><Button color="danger">Integrations</Button></a>
        </div>
      </div>
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
