// require db server
var models = require('./crowdfunding_db')
var express = require('express') // express
var router = express.Router()
var mysql = require('mysql') // mysql
var $sql = require('./sqlMap') // sql

// start connect database
var conn = mysql.createConnection(models.mysql)
conn.connect()

function formatDate(d) {
    const date = new Date(d);
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
                conn.query($sql.search.getDonationList, [params.FUNDRAISER_ID], function(err, donationResult) {
                    if (donationResult) {
                        donationResult.forEach(item => {
                            item.DATE = formatDate(item.DATE);
                        });
                        donationResult.sort((a, b) => {
                            return new Date(a.DATE) - new Date(b.DATE);
                        });
                        const data = {
                            ...result[0],
                            donationList: donationResult
                        }
                        res.send(data);
                    }
                });
            }
        });
    })
    .post('/donation', (req, res) => {
        var sql = $sql.insert.donation;
        const params = req.body;
        for (const key in params) {
            params[key] = params[key] || '';
        }
        params.DATE = formatDate(new Date());
        params.GIVER = params.GIVER || 'Anonymity';
        conn.query(sql, [params.DATE, params.AMOUNT, params.GIVER, params.FUNDRAISER_ID], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                conn.query($sql.search.updateCurrentFunding, [params.AMOUNT, params.FUNDRAISER_ID], function(err, result) {
                    if (err) {
                        console.log('错误', err)
                    }
                    if (result) {
                        console.log('成功的结果', result)
                        res.send(result[0]);
                    }
                });
            }
        });
    })
    // admin: Get all the data in the Fundraiser
    .get('/admin/getDataList', (req, res) => {
        var sql = $sql.admin.searchFundRaiserList;
        const params = req.query;
        for (const key in params) {
            params[key] = params[key] || null;
        }
        console.log(params);
        conn.query(sql, [params.CATEGORY_ID, params.CATEGORY_ID, params.ORGANIZER, params.ORGANIZER, params.CITY, params.CITY, params.ACTIVE, params.ACTIVE], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                result = result.filter(o => o.CAPTION.toLowerCase().includes(params.CAPTION?.toLowerCase() || ''));
                result.reverse();
                res.send(result)
            }
        });
    })
    // admin: add Fundraiser
    .post('/admin/addFundraiser', (req, res) => {
        var sql = $sql.admin.addFundraiser;
        const params = req.body;
        for (const key in params) {
          params[key] = !!params[key] || params[key] == 0 ? params[key] : '';
        }
        params.CURRENT_FUNDING = 0.00;
        conn.query(sql, [params.CAPTION, params.ORGANIZER, params.CITY, params.TARGET_FUNDING,params.CURRENT_FUNDING,  params.CATEGORY_ID, params.ACTIVE], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result);
            }
        });
    })
    // admin: update Fundraiser
    .put('/admin/updateFundraiser/:id', (req, res) => {
        console.log(req.url);
        var sql = $sql.admin.updateFundraiser;
        const params = req.body;
        for (const key in params) {
            params[key] = !!params[key] || params[key] == 0 ? params[key] : '';
        }
        const id = req.url.slice(req.url.lastIndexOf('/') + 1);
        conn.query(sql, [params.CAPTION, params.ORGANIZER, params.CITY, params.TARGET_FUNDING,  params.CATEGORY_ID, params.ACTIVE, id], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result);
            }
        });
    })
    // admin: delete Fundraiser
    .delete('/admin/deleteFundraiser/:id', (req, res) => {
        var sql = $sql.admin.deleteFundraiser;
        const id = req.url.slice(req.url.lastIndexOf('/') + 1);
        conn.query(sql, [id], function(err, result) {
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
