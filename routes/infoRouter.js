import express from "express";
import { combineAllData, getTransactionBarChart, getTransactionPieChart, getTransactionStatistics, getTransactionTable, insertAllData } from "../controller/infoController.js";
const router = express.Router();

router.route("/insertdata").get(insertAllData);
router.route("/gettransactionStatistics").get(getTransactionStatistics);
router.route("/gettransactionbarchart").get(getTransactionBarChart);
router.route("/gettansactiontable").get(getTransactionTable);
router.route("/combinealldata").get(combineAllData);
router.route("/gettransactionpiechart").get(getTransactionPieChart);


export default router;