const express = require('express');
const router = express.Router();
const Person = require('./../Person');
// Post route to add a person
router.post('/', async (req, res)=>{
    try{
        const data = req.body

        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(error){
        console.log('error');
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(error){
        console.log('error');
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // update data from the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true, // return the updated document
            runValidators: true, // run mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        // assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data delete');
        res.status(200).json({message: 'Prson Deleted Successfully'});

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;