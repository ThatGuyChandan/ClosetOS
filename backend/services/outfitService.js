export const generateOutfitFromRules = (wardrobeItems, { occasion, weather, season }) => {
  const outfit = [];

  // Simple rule: one top, one bottom, one shoes
  const top = wardrobeItems.find((item) => item.category === 'Top');
  const bottom = wardrobeItems.find((item) => item.category === 'Bottom');
  const shoes = wardrobeItems.find((item) => item.category === 'Shoes');

  if (top) outfit.push(top);
  if (bottom) outfit.push(bottom);
  if (shoes) outfit.push(shoes);

  // More complex rules can be added here based on occasion, weather, and season
  // For example, if it's cold, add an outerwear
  if (weather === 'cold') {
    const outerwear = wardrobeItems.find((item) => item.category === 'Outerwear');
    if (outerwear) outfit.push(outerwear);
  }

  return outfit;
};
