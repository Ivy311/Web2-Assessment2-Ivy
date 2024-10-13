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
        getDonationList: `select * from donation d WHERE (d.FUNDRAISER_ID = ?)`,
        updateCurrentFunding: `UPDATE fundraiser SET CURRENT_FUNDING = CURRENT_FUNDING + ? WHERE fundraiser.FUNDRAISER_ID = ?`
    },
    insert: {
        donation : `insert into donation (DATE, AMOUNT, GIVER, FUNDRAISER_ID) values(?,?,?,?)`
    },
    admin: {
        searchFundRaiserList: `select f.*, c.NAME AS CATEGORY_NAME
                                FROM fundraiser f
                                JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
                                WHERE (f.CATEGORY_ID = ? OR ? IS NULL) AND (f.ORGANIZER = ? OR ? IS NULL) AND (f.CITY = ? OR ? IS NULL) AND (f.ACTIVE = ? OR ? IS NULL)`,
        addFundraiser: `insert into fundraiser (CAPTION, ORGANIZER, CITY, TARGET_FUNDING, CURRENT_FUNDING, CATEGORY_ID, ACTIVE) values(?,?,?,?,?,?,?)`,
        updateFundraiser: `UPDATE fundraiser SET CAPTION = ?, ORGANIZER = ?, CITY = ?, TARGET_FUNDING = ?, CATEGORY_ID = ?, ACTIVE = ? WHERE fundraiser.FUNDRAISER_ID = ?`,
        deleteFundraiser: `DELETE FROM fundraiser WHERE fundraiser.FUNDRAISER_ID = ?`
    }
}
module.exports = sqlMap