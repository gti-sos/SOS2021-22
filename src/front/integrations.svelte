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
                          <a href="/#/integrations/API-11-Smoking"><Button style="margin-bottom: 10px; border-radius: 1em; border-width: 2px;" color="danger"><strong>Integracion Api smoking</strong></Button></a>
                          <a href="/#/integrations/API-21-Temperatures"><Button style="margin-bottom: 10px; border-radius: 1em; border-width: 2px;" color="danger"><strong>Integracion Api temperaturas</strong></Button></a>
                          <a href="/#/integrations/API-28-awards"><Button style="margin-bottom: 10px; border-radius: 1em; border-width: 2px;" color="danger"><strong>Integracion awards</strong></Button></a>
                          <a href="/#/integrations/Api-externa1"><Button style="margin-bottom: 10px; border-radius: 1em; border-width: 2px;" color="danger"><strong>Integracion API externa 1</strong></Button></a>
                          <a href="/#/integrations/Api-Externa2"><Button style="margin-bottom: 10px; border-radius: 1em; border-width: 2px;" color="danger"><strong>Integracion API externa 2</strong></Button></a>
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
                          <row>
                            <a href="/#/integrations/integrationLifeStats">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API LifeStats</strong>
                              </Button>
                            </a>
                          </row>
                          <row>
                            <a href="/#/integrations/integrationPBISP">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API PBISP</strong>
                              </Button>
                            </a>
                          </row>
                          <row>
                            <a href="/#/integrations/integrationExt1">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API Externa Estadisticas de futbol (Aldosivi)</strong>
                              </Button>
                            </a>
                          </row>
                          <row>
                            <a href="/#/integrations/integrationExt2">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API Externa Covid-19 Paises Europa</strong>
                              </Button>
                            </a>
                          </row>
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
                          <row>
                            <a href="/#/integrations/integrationsPaawardsANDFireStats">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API Fire-Stats</strong>
                              </Button>
                            </a>
                          </row>
                          <row>
                            <a href="/#/integrations/integrationsPaawardsANDPlatforms">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API Platforms</strong>
                              </Button>
                            </a>
                          </row>
                          <row>
                            <a href="/#/integrations/integrationsPaawardsANDFootball">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API Goleadores</strong>
                              </Button>
                            </a>
                          </row>
                          <row>
                            <a href="/#/integrations/integrationsPaawardsANDSeries">
                              <Button style="margin-bottom: 10px; border-color: darkorange; border-radius: 1em; border-width: 2px;" color="danger">
                                <strong>Integración API Series IMDB</strong>
                              </Button>
                            </a>
                          </row>
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