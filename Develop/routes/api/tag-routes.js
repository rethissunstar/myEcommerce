const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products' }],
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving tags' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving tag' });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(201).json(tag))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: 'Error creating tag' });
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      if (!updatedTag[0]) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: 'Error updating tag' });
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.status(200).json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting tag' });
    });
});

module.exports = router;
