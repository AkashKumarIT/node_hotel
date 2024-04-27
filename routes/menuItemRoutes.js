const express = require('express');
const router = express.Router();

const menuItem = require('./../menuItems');

router.get('/', async (req,res)=>{
    try{
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(error){
        console.log('error');
        res.status(500).json({error: 'internal server error'});
    }
})

router.post('/', async (req,res)=>{
    try{
        const data = req.body

        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(error){
        console.log('error');
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/:tasteType', async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=='sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await menuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid taste type'})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const itemId = req.params.id;
        const updateItemData = req.body;

        const response = await menuItem.findByIdAndUpdate(itemId, updateItemData,{
            new: true,
            runValidators: true,
        })

        console.log('data updated');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const itemId = req.params.id;
        // assuming you have a person model
        const response = await menuItem.findByIdAndDelete(itemId);
        if(!response){
            return res.status(404).json({error: 'Item not found'});
        }
        console.log('data delete');
        res.status(200).json({message: 'Item Deleted Successfully'});

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;