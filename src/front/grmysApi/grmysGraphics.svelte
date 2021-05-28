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
    <h1>Info-SOS2021-22</h1>
    
    <Container>
      <Col xs="auto">
        <div class="row">
          <div class="col-sm-3">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Highcharts</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <a href="#/grmys/grmysGraphic"><Button color="warning"><strong>GITHUB</strong></Button></a>
              </CardBody>
            </Card>
          </div>
          <div class="col-sm-3">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Amchart</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <a href="#/grmys/grmysAmchart"><Button color="warning"><strong>HEROKU</strong></Button></a>
              </CardBody>
            </Card>
          </div>
        </div>
      </Col>
    </Container>
</main>