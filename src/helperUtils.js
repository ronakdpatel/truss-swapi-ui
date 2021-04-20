// Adds spaces every 3 digits (eg.1000 => 1 000)
export const formatNumber = (number) => {
  // Alternative approach, but doesn't actually add a space character
  // const internationalFormat = new Intl.NumberFormat('fr-FR');
  // return internationalFormat.format(number);
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export const isUnknown = (data) => {
  return data === 'unknown';
};

export const ignoreCaseStringCompare = (a, b) => {
  const aIsUnknown = isUnknown(a);
  const bIsUnknown = isUnknown(b);

  if (aIsUnknown && bIsUnknown) {
    return 0;
  }
  if (bIsUnknown) {
    return -1;
  }
  if (aIsUnknown) {
    return 1;
  }

  let aVal = a.toUpperCase();
  let bVal = b.toUpperCase();
  if (aVal < bVal) {
    return -1;
  }
  if (aVal > bVal) {
    return 1;
  }
  return 0;
};

export const compareNames = (a, b) => {
  return ignoreCaseStringCompare(a.name, b.name);
};

export const numberCompare = (a, b) => {
  const aIsUnknown = isUnknown(a);
  const bIsUnknown = isUnknown(b);
  if (aIsUnknown && bIsUnknown) {
    return 0;
  }
  if (bIsUnknown) {
    return -1;
  }
  if (aIsUnknown) {
    return 1;
  }
  return a - b;
};

export const compareResidents = (a, b) => {
  return numberCompare(a.residents.length, b.residents.length);
};

export const comparePopulations = (a, b) => {
  return numberCompare(a.population, b.population);
};

export const compareSurfaceAreas = (a, b) => {
  return numberCompare(a.surfaceArea, b.surfaceArea);
};

export const getSortedDirectionClass = (sortedColumn, columnName, direction) => {
  let className = 'sortable';
  if (sortedColumn === columnName) {
    className += ` sorted-${direction}`;
  }
  return className;
};

export const calculateWaterSurfaceArea = (diameter, percentWater) => {
  // we could technically provide some information if only one of the needed values are unknown
  // if diameter is unknown we still know what percentageWater (although not realistic in the real world)
  // if percentWater is unknown we still know the total surfaceArea of the planet so we can provide an upper bound
  if (isUnknown(diameter) || isUnknown(percentWater)) {
    return 'unknown';
  }
  const totalSurfaceArea = 4 * Math.PI * Math.pow(diameter / 2, 2);
  return Math.round(totalSurfaceArea * (percentWater / 100));
};
