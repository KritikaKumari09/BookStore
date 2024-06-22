import express from "express";
import {Book} from '../models/bookModels.js'

const router = express.Router()


// Route for save a new book/ route to add a new book
router.post('/', async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).send({
                message:'Send all required fiels: title, author , publishYear',
            });
        }
        const newBook= {
            title:req.body.title,
            author:req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await  Book.create(newBook)
        return res.status(201).send(book)

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message});
    }
})

// Route for getall books from database
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({});
        return res.status(200).json({
           count:books.length,
            data:books
        }
        );
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})


// Route to get one book from database through id
router.get('/:id',async(req,res)=>{
    // in above route ':id' means that here we will be having 
    // the value stored in id and not word id
    // e.g. 'books/66759664b951f0a54897d3f6
    // in above id = 66759664b951f0a54897d3f6
    // for one of the books
    try{
        const {id}=req.params
        const book=await Book.findById(id);

        return res.status(200).json(book) ;
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

// route for update/edit a book
router.put('/:id', async(req,res) =>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:"Send all required fields: title,author,publishYear"
            })
        }
        const {id} = req.params
        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).json({
                message:"book not found"
            })
        }
        return res.status(200).send({message:"Book updated successfully"})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

// route to delete a book
router.delete('/:id',async(req,res)=>{
    try{
const {id} = req.params
const result=await Book.findByIdAndDelete(id)
if(!result){
    return res.status(404).json({message:"Book not found"})
}
return res.status(200).send({message:"Book deleted successfully"})
    }
    catch(error){
console.log(error.message)
    res.state(500).send({message:error})
    }
})

export default router; 