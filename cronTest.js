const cron =require('node-cron')

cron.schedule('*/10 * * * * *', ()=> {
    console.log('cron job working??')
})