var sqlMap = {
    search: {
        searchFundRaiserList: `select f.*, c.NAME AS CATEGORY_NAME
                                FROM fundraiser f
                                JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
                                WHERE (f.CATEGORY_ID = ? OR ? IS NULL) AND (f.ORGANIZER = ? OR ? IS NULL) AND (f.CITY = ? OR ? IS NULL) AND (f.ACTIVE = 1)`,
        searchOrganizer: 'select ORGANIZER from fundraiser',
        searchCity: 'select CITY from fundraiser',
        searchCategoryList: 'select * from category',
        getDetail: `select f.*, c.NAME AS CATEGORY_NAME
                                FROM fundraiser f
                                JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
                                WHERE (f.FUNDRAISER_id = ?)`,
        getDonationList: `select * from donation d WHERE (d.fundraiser_id = ?)`
    },
    insert: {
        donation : `insert into donation (date, amount, giver, fundraiser_id) values(?,?,?,?)`
    }
}
module.exports = sqlMap