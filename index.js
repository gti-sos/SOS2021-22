var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');

var app = express();

var port = (process.env.PORT || 10000);

app.use('/', express.static(path.join(__dirname, 'public')));
/*
app.get('/cool', (request, response) => {
    response.send(cool());
    console.log('New request to /cool has arrived');
});
*/
app.get('/index', (request, response) => {
    response.send(express());
    console.log('New request to /idex has arrived');
});

app.get('/info/paawards', (request, response) => {
    response.send(`<!DOCTYPE html>
	</html>

	<head>
        <title>PAAWARDS</title>
    </head>
	`);
    console.log('New request to /idex has arrived');
});
app.get('/info/richpp', (request, response) => {
    response.send(`<!DOCTYPE html>
    <html>
    
    <head>
        <title>RICHPP</title>
    </head>
    
    <body>
        <table>
            <col class="col0">
            <col class="col1">
            <col class="col2">
            <col class="col3">
            <col class="col4">
            <col class="col5">
            <col class="col6">
            <col class="col7">
            <tbody>
              <tr class="row0">
                <td>top</td>
                <td>name</td>
                <td>fortune (billions of dollars)</td>
                <td>age</td>
                <td>country</td>
                <td>year</td>
                <td>company</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row1">
                <td>1</td>
                <td>Jeff Bezos</td>
                <td>113 $</td>
                <td>56</td>
                <td>EEUU</td>
                <td>2020</td>
                <td>Amazon</td>
                <tdç>&nbsp;</td>
              </tr>
              <tr class="row2">
                <td>2</td>
                <td>Bill Gates</td>
                <td>98 $</td>
                <td>64</td>
                <td>EEUU</td>
                <td>2020</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row3">
                <td>3</td>
                <td>Bernard Arnault</td>
                <td>76 $</td>
                <td>71</td>
                <td>France</td>
                <td>2020</td>
                <td>LVMH</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row4">
                <td>1</td>
                <td>Jeff Bezos</td>
                <td>131 $</td>
                <td>55</td>
                <td>EEUU</td>
                <td>2019</td>
                <td>Amazon</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row5">
                <td>2</td>
                <td>Bill Gates</td>
                <td>96,5 $</td>
                <td>63</td>
                <td>EEUU</td>
                <td>2019</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row6">
                <td>3</td>
                <td>Warren Buffett</td>
                <td>82,5 $</td>
                <td>88</td>
                <td>EEUU</td>
                <td>2019</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row7">
                <td>1</td>
                <td>Jeff Bezos</td>
                <td>112 $</td>
                <td>54</td>
                <td>EEUU</td>
                <td>2018</td>
                <td>Amazon</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row8">
                <td>2</td>
                <td>Bill Gates</td>
                <td>90 $</td>
                <td>62</td>
                <td>EEUU</td>
                <td>2018</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row9">
                <td>3</td>
                <td>Warren Buffett</td>
                <td>84 $</td>
                <td>87</td>
                <td>EEUU</td>
                <td>2018</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row10">
                <td>1</td>
                <td>Bill Gates</td>
                <td>86 $</td>
                <td>61</td>
                <td>EEUU</td>
                <td>2017</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row11">
                <td>2</td>
                <td>Warren Buffett</td>
                <td>75,6 $</td>
                <td>86</td>
                <td>EEUU</td>
                <td>2017</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row12">
                <td>3</td>
                <td>Jeff Bezos</td>
                <td>72,8 $</td>
                <tdÇ>53</td>
                <td>EEUU</td>
                <td>2017</td>
                <td>Amazon</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row13">
                <td>1</td>
                <td>Bill Gates</td>
                <td>75 $</td>
                <td>60</td>
                <td>EEUU</td>
                <td>2016</td>
                <td>Microsoft</td>
                <tdÇ>&nbsp;</td>
              </tr>
              <tr class="row14">
                <td>2</td>
                <td>Amancio Ortega</td>
                <td>67 $</td>
                <td>79</td>
                <td>Spain</td>
                <td>2016</td>
                <td>Inditex</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row15">
                <td>3</td>
                <td>Warren Buffett</td>
                <td>60,8 $</td>
                <td>85</td>
                <td>EEUU</td>
                <td>2016</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
        </table>
      </body>
    </html>
    
    </body>
    
    </html>`);
    console.log('New request to /idex has arrived');
});

app.listen(port, () => {
    console.log(`Server ready listenig on port ${port}`);
});
