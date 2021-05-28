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
    <h1>Visualizaciones</h1>
    
    <Container>
      <Col xs="auto">
        <Card class="mb-3">
        <CardHeader class="bg-secondary">
            <CardTitle><h2>Analíticas</h2></CardTitle>
        </CardHeader>
        </Card>
        <div class="row">
          <div class="col-sm-3">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Highcharts</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <a href="#/grmys/grmysGraphic"><Button color="warning"><strong>grmysGraphic</strong></Button></a>
              </CardBody>
            </Card>
          </div>
          <div class="col-sm-3">
            <Card class="mb-3">
              <CardHeader class="bg-secondary">
                <CardTitle><h2>Amchart</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <a href="#/grmys/grmysAmchart"><Button color="warning" ><strong>AmChart</strong></Button></a>
              </CardBody>
            </Card>
          </div>
        </div>
      </Col>
    </Container>
</main>
<style>
    h1 {
    color: #ff9900;
    text-align: center;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  h2 {
    text-align: center;
  }
  
</style>