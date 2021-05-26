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
            <NavLink href="/">Volver</NavLink>
        </NavItem>
    </Nav>

    <h1>Integraciones SOS2021-22</h1>

    <Container>
        <Col xs="auto">
          <Card class="mb-3">
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
                          <a href="/#/integrations/API-11-Smoking"><Button color="danger"><strong>Integracion Api smoking</strong></Button></a>
                          <a href="/#/integrations/API-21-Temperatures"><Button color="danger"><strong>Integracion Api temperaturas</strong></Button></a>
                          <a href="/#/integrations/API-28-awards"><Button color="danger"><strong>Integracion awards</strong></Button></a>
                          <a href="/#/grmys"><Button color="danger"><strong>Integracion 4</strong></Button></a>
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
                            <a href="/#/integrations/integrationsRichpp"><Button color="danger"><strong>Integracion 1</strong></Button></a>
                            <a href="/#/grmys"><Button color="danger"><strong>Integracion 2</strong></Button></a>
                            <a href="/#/grmys"><Button color="danger"><strong>Integracion 3</strong></Button></a>
                            <a href="/#/grmys"><Button color="danger"><strong>Integracion 4</strong></Button></a>
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
                            <a href="/#/integrations/integrationsPaawardsANDFireStats"><Button color="danger"><strong>Fire-Stats</strong></Button></a>
                            <br><br>
                            <a href="/#/grmys"><Button color="danger"><strong>Integracion 2</strong></Button></a>
                            <br><br>
                            <a href="/#/grmys"><Button color="danger"><strong>Integracion 3</strong></Button></a>
                            <br><br>
                            <a href="/#/grmys"><Button color="danger"><strong>Integracion 4</strong></Button></a>
                            <br><br>
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