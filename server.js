var express = require('express');
//Loading the body parser
var bodyParser = require('body-parser');
//Loading CORS
var cors = require('cors');

var moongooseDrv = require('mongoose');
moongooseDrv.Promise = global.Promise;


var app = express();



app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

  

app.set('port', (process.env.PORT || 5000));

moongooseDrv.connect("mongodb://mscosmosmongo:7OCD9owW22bLzq2V1rbQ8xkhUEYu3hfTlJY3ix6EuMuLKDdcGbvgxH0ZICikQdlykT1f6s9zRp105hMNGBV7qw==@mscosmosmongo.documents.azure.com:10255/?ssl=true&replicaSet=globaldb");
var db = moongooseDrv.connection;
var employeeSchema = moongooseDrv.Schema({EmpNo: String, EmpName: String, Salary: String, DeptName: String, Designation: String});
var employeeModel = moongooseDrv.model("EmployeeCollection",employeeSchema,"EmployeeCollection"); 
app.get('/api/employees',function(req,resp){
    employeeModel.find().exec(function(err,res){
        if(err){
            resp.status(500).send({success:false,data:'Internal Server Error'});
        }
        resp.status(200).send({success:true,data:res});
    });
});

app.listen(app.get('port'), function() {
    console.log('started');
});
