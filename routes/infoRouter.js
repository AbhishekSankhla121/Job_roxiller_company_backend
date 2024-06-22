import express from "express";
import { combineAllData, getTransactionBarChart, getTransactionPieChart, getTransactionStatistics, getTransactionTable, insertAllData } from "../controller/infoController.js";
const router = express.Router();

// Avoid this end point mostly 
// use this end point when need to  initialize the database with 3rd party api seed data
// use this end point "/api/v1/insertdata"
router.route("/insertdata").get(insertAllData);
// use this end point: "/api/v1/gettransactionStatistics?month=5&year=2022" 
router.route("/gettransactionStatistics").get(getTransactionStatistics);
// use this end point: "/api/v1/gettansactiontable?month=5&year=2022"     
router.route("/gettransactionbarchart").get(getTransactionBarChart);
// use this end point: ' /api/v1/gettansactiontable?page=1&perPage=15&search=Sandisk '
router.route("/gettansactiontable").get(getTransactionTable);
// use this end point: '/api/v1/combinealldata?month=5&year=2022&page=1&perPage=15&search=Sandisk' 
router.route("/combinealldata").get(combineAllData);
// use this end point: "/api/v1/gettransactionpiechart?month=5&year=2022"
router.route("/gettransactionpiechart").get(getTransactionPieChart);


export default router;