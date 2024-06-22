import catchAsyncError from "../middelwares/catchAsyncError.js";
import { Product } from "../models/Product.js"
import ErrorHandler from "../utils/errorHandler.js";

export const insertAllData = catchAsyncError(async (req, res, next) => {
    const data = await fetch(`${process.env.THIRD_PATY_API}`);
    const response = await data.json();
    if (!response) {
        return next(new ErrorHandler("Error in data insertion:insertAllData", 401));
    }
    await Product.insertMany(response)
    res.status(200).json({
        success: true,
        response
    })
});



export const getTransactionStatistics = catchAsyncError(async (req, res, next) => {
    const month = req.query.month || "";
    const year = req.query.year || new Date().getFullYear();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);


    const transactions = await Product.find({
        dateOfSale: {
            $gte: startDate,
            $lt: endDate
        }
    });

    const specificMonth = {
        sale: 0,
        soldItem: 0,
        notSoldItem: 0,
        totalItems: 0,
        startFrom: startDate,
        toEnd: endDate
    }

    transactions.forEach(element => {
        specificMonth.totalItems += 1;
        if (element.sold) {
            specificMonth.sale += element.price;
            specificMonth.soldItem += 1;
        }
        else {
            specificMonth.notSoldItem += 1;
        }
    });

    res.status(200).json({
        success: true,
        data: specificMonth
    });
});





export const getTransactionBarChart = catchAsyncError(async (req, res, next) => {
    const month = req.query.month || "";
    const year = req.query.year || new Date().getFullYear();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const transactions = await Product.find({
        dateOfSale: {
            $gte: startDate,
            $lt: endDate
        }
    });

    const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Number.POSITIVE_INFINITY },
    ];


    const priceRangeCounts = Array(priceRanges.length).fill(0);

    transactions.forEach(product => {
        const price = product.price;
        for (let i = 0; i < priceRanges.length; i++) {
            if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
                priceRangeCounts[i]++;
                break;
            }
        }
    });
    const responseData = priceRanges.map((range, index) => ({
        range: `${range.min} - ${range.max}`,
        count: priceRangeCounts[index]
    }));

    const data = {
        responseData,
        totalItems: transactions.length,
        startDate,
        endDate
    }


    res.status(200).json({
        success: true,
        data
    });
});



// access this route using this Url
// http://localhost:5000/api/v1/combinealldata?month=5&year=2022&page=""&perPage=""
export const getTransactionTable = catchAsyncError(async (req, res, next) => {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        }
        : {};


    const totalCount = await Product.countDocuments(query);


    const transactions = await Product.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);


    const responseData = {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
        currentPage: page,
        perPage: perPage,
        transactions: transactions,
    };


    res.status(200).json({
        success: true,
        data: responseData,
    });
});


export const combineAllData = catchAsyncError(async (req, res, next) => {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const month = req.query.month || "";
    const year = req.query.year || new Date().getFullYear();

    let data = await fetch(`${process.env.BACKEND_URL}/gettransactionbarchart?month=${month}&year=${year}`);
    const getTransactionBarChart = await data.json();
    data = await fetch(`${process.env.BACKEND_URL}/gettransactionStatistics?month=${month}&year=${year}`);
    const getTransactionStatistics = await data.json();
    data = await fetch(`${process.env.BACKEND_URL}/gettansactiontable?search=${search}&page=${page}&perPage=${perPage}`);
    const getTransactionTable = await data.json();

    res.status(200).json({
        success: true,
        getTransactionBarChart,
        getTransactionStatistics,
        getTransactionTable
    });
});




// http://localhost:5000/api/v1/gettransactionpiechart?month=8&year=2022
export const getTransactionPieChart = catchAsyncError(async (req, res, next) => {
    const month = parseInt(req.query.month) || 0;  // Default to 0 if not provided
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const startDate = new Date(year, month - 1, 1);  // Start of the month
    const endDate = new Date(year, month, 1);  // Start of the next month

    // Find all products sold within the specified date range
    const transactions = await Product.find({
        dateOfSale: {
            $gte: startDate,
            $lt: endDate
        }
    });

    // Count the number of items in each category
    const categoryCounts = {};
    transactions.forEach(product => {
        if (categoryCounts[product.category]) {
            categoryCounts[product.category]++;
        } else {
            categoryCounts[product.category] = 1;
        }
    });

    // Format the response data
    const responseData = Object.keys(categoryCounts).map(category => ({
        category,
        count: categoryCounts[category]
    }));

    // Send the response
    res.status(200).json({
        success: true,
        data: responseData
    });
})