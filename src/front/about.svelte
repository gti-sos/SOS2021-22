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
    <Nav>
        <NavItem>
            <NavLink id="nav-back" href="/">Volver</NavLink>
        </NavItem>
    </Nav>

    <h1>About-SOS2021-22</h1>

    <Container>
        <Col xs="auto">
          <Card class="mb-3">
            <CardHeader class="bg-secondary">
              <CardTitle><h2>Videos explicativos</h2></CardTitle>
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
                          <a href="https://youtu.be/UZ2jTmndHT8"><Button color="danger"><strong>Gramys</strong></Button></a>
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
                          <a href="https://youtu.be/yp9eH6HL0QQ"><Button color="danger"><strong>Richpp</strong></Button></a>
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
                          <a href="https://youtu.be/iQYu6oz0au0"><Button color="danger"><strong>Paawards</strong></Button></a>
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