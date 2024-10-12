// require db server
var models = require('./crowdfunding_db')
var express = require('express') // express
var router = express.Router()
var mysql = require('mysql') // mysql
var $sql = require('./sqlMap') // sql

// start connect database
var conn = mysql.createConnection(models.mysql)
conn.connect()

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
}

router
    // Get all the data in the Fundraiser
    .get('/getFundraiserList', (req, res) => {
        var sql = $sql.search.searchFundRaiserList;
        const params = req.query;
        for (const key in params) {
            params[key] = params[key] || null;
        }
        conn.query(sql, [params.CATEGORY_ID, params.CATEGORY_ID, params.ORGANIZER, params.ORGANIZER, params.CITY, params.CITY], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result)
            }
        });
    })
    // Get all the organizers
    .get('/getOrganizers', (req, res) => {
        var sql = $sql.search.searchOrganizer;
        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        });
    })
    // Get all the city
    .get('/getCity', (req, res) => {
        var sql = $sql.search.searchCity;
        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        });
    })
    // Get all the data in the Fundraising Category
    .get('/getCategoryList', (req, res) => {
        var sql = $sql.search.searchCategoryList;
        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        });
    })
    .get('/getDetail', (req, res) => {
        var sql = $sql.search.getDetail;
        const params = req.query;
        for (const key in params) {
            params[key] = params[key] || null;
        }
        conn.query(sql, [params.FUNDRAISER_ID], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result[0]);
            }
        });
    })
    .post('/donation', (req, res) => {
        var sql = $sql.insert.donation;
        const params = req.body;
        for (const key in params) {
            params[key] = params[key] || '';
        }
        params.date = formatDate();
        conn.query(sql, [params.date, params.amount, params.giver, params.fundraiser_id], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result[0]);
            }
        });
    })
    .get('/getDonationList', (req, res) => {
        var sql = $sql.search.getDonationList;
        const params = req.query;
        conn.query(sql, [params.fundraiser_id], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result);
            }
        });
    })
module.exports = router