import prisma from '../lib/db.js';
import { generateOutfitFromRules } from '../services/outfitService.js';

export const generateOutfit = async (req, res) => {
  const { occasion, weather, season } = req.body;
  try {
    const wardrobeItems = await prisma.clothingItem.findMany({
      where: { userId: req.user.userId },
    });
    const outfit = generateOutfitFromRules(wardrobeItems, { occasion, weather, season });
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
