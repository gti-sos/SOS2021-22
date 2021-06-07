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
            <NavLink id="nav-back" outline color="secondary" href="#/info">Volver</NavLink>
        </NavItem>
    </Nav>
    <h1>Visualizaciones</h1>
    
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
                                    <CardTitle><h2>Highcharts v1</h2></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div class="row">
                                        <div class="col-md">
                                            <row>
                                                <a href="#/paawards/paawardsGraphic"><Button id="line-paawards" style="margin-bottom: 10px" color="warning"><strong>Highcharts Line</strong></Button></a>
                                            </row>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div class="col-sm">
                            <Card class="mb-3">
                                <CardHeader class="bg-secondary">
                                    <CardTitle><h2>Highcharts v2</h2></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div class="row">
                                        <div class="col-md">
                                            <row>
                                                <a href="#/paawards/paawardsGraphic-Highcharts"><Button id="variablepie-paawards" style="margin-bottom: 10px" color="warning"><strong>Highchart Variablepie</strong></Button></a>
                                            </row>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div class="col-sm">
                            <Card class="mb-3">
                                <CardHeader class="bg-secondary">
                                    <CardTitle><h2>Anychart</h2></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div class="row">
                                        <div class="col-md">
                                            <a href="#/paawards/paawardsGraphic-Anychart"><Button id="donut-paawards" color="warning" ><strong>Donut Chart</strong></Button></a>
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