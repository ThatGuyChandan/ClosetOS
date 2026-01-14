import prisma from '../lib/db.js';
import { v2 as cloudinary } from 'cloudinary';

export const getWardrobeItems = async (req, res) => {
  try {
    const wardrobeItems = await prisma.clothingItem.findMany({
      where: { userId: req.user.userId },
    });
    res.json(wardrobeItems);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const addWardrobeItem = async (req, res) => {
  const { name, category, colors, season } = req.body;
  try {
    const newClothingItem = await prisma.clothingItem.create({
      data: {
        name,
        category,
        colors: colors.split(',').map(color => color.trim()),
        season,
        imageUrl: req.file.path,
        userId: req.user.userId,
      },
    });
    res.status(201).json(newClothingItem);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteWardrobeItem = async (req, res) => {
  const { id } = req.params;
  try {
    const clothingItem = await prisma.clothingItem.findUnique({ where: { id: parseInt(id) } });
    if (clothingItem) {
      const publicId = clothingItem.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await prisma.clothingItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Clothing item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
