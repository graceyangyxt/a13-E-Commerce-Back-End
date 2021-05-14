const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
 try{
    let categoryData = await Category.findAll({
      include:[
        Product
      ]
    })
    if(!categoryData){
      res.status(404).json({message: 'category not found!'});
      return;
    }
    res.status(200).json(categoryData);
 }catch(err){
   res.status(500).json(err)
 }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    let categoryData = await Category.findOne({
      where: {
        id : req.params.id,
      },
      include:[
        Product
      ]
    })
    if (!categoryData){
      res.status(404).json({message:`category not found`});
    } else {
      res.status(200).json(categoryData);
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body)
  try {
     let categoryData = await Category.create(req.body)
     res.status(200).json(categoryData);
  } catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let categoryData = await Category.update(req.body,{
      where:{
        id: req.params.id,
      },
    })
    console.log(categoryData[0])
    if(categoryData[0]=== 0){
      res.status(400).json({message: `not change the category`});
    } else{
      res.status(200).json(categoryData);
    }  
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    let categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData){
      res.status(404).json({message: 'category not found!'});
      return;
    }
    res.status(200).json({message: 'product deleted!'});
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
