//1st step
const router = require('express').Router();
const Listing = require('../models/Listings')
const verifyToken = require('../routes/verifyToken');

// add new all listing
router.post('/', verifyToken, async (req,res) =>{
    const Listing1 = new Listing({
        title:req.body.title,
        mainTitle:req.body.mainTitle,
        desc:req.body.desc
    })
    try {
        const saveListing = await Listing1.save();
        res.send(saveListing)
    } catch (error) {
        res.status(400).send(error);
    }
})

// get all listing
router.get('/', async (req,res)=>{
try {
    const listingss = await Listing.find();
    res.send(listingss);
} catch (error) {
    res.send({message:error})
}
})
// get single listing
router.get('/:listingId', async (req,res) =>{
try {
    const listingsID = await Listing.findById(req.params.listingId)
    res.send(listingsID);
} catch (error) {
    res.send({message:error})
}
}) 
// delete single id 
router.delete('/:listingId',  verifyToken, async (req,res) =>{
  try {
    const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
    res.json(removeListing+' Delete Success')
  } catch (error) {
    res.send({message:error});
  }
})
// update single id
router.put('/:listingId',  verifyToken, async (req,res) =>{
   try {
    
    const listingUpdate = {
        title:req.body.title,
        mainTitle:req.body.mainTitle,
        desc:req.body.desc
    };

    const udateListing = await Listing.findByIdAndUpdate({_id: req.params.listingId}, listingUpdate )
res.json(udateListing)
   } catch (error) {
       res.json({message:error})
   }
})

// 2nd step
module.exports = router;