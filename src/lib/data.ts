export type ResaleData = {
  id: string;
  month: string;
  town: string;
  flat_type: string;
  resale_price: number;
  street_name: string;
  block: string;
  floor_area_sqm: number;
};

export const towns: string[] = [
  'ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH',
  'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG',
  'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST',
  'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL',
  'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES',
  'TOA PAYOH', 'WOODLANDS', 'YISHUN'
];

const flatTypes: string[] = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE'];
const streets: string[] = ['Street', 'Avenue', 'Crescent', 'Drive', 'Walk', 'Road', 'Lane'];

function generateMockData(count: number): ResaleData[] {
  const data: ResaleData[] = [];
  for (let i = 1; i <= count; i++) {
    const town = towns[Math.floor(Math.random() * towns.length)];
    const flatType = flatTypes[Math.floor(Math.random() * flatTypes.length)];
    const year = 2023 - Math.floor(Math.random() * 5);
    const monthNum = Math.floor(Math.random() * 12) + 1;
    const month = `${year}-${String(monthNum).padStart(2, '0')}`;
    let price;

    switch(flatType) {
        case '2 ROOM': price = Math.floor(Math.random() * 50000) + 250000; break;
        case '3 ROOM': price = Math.floor(Math.random() * 100000) + 300000; break;
        case '4 ROOM': price = Math.floor(Math.random() * 150000) + 400000; break;
        case '5 ROOM': price = Math.floor(Math.random() * 200000) + 500000; break;
        case 'EXECUTIVE': price = Math.floor(Math.random() * 250000) + 650000; break;
        default: price = Math.floor(Math.random() * 100000) + 350000;
    }

    data.push({
      id: `listing-${i}`,
      month: month,
      town: town,
      flat_type: flatType,
      resale_price: price,
      street_name: `${town} ${streets[Math.floor(Math.random() * streets.length)]}`,
      block: `${Math.floor(Math.random() * 99) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 10))}`,
      floor_area_sqm: Math.floor(Math.random() * 60) + 60,
    });
  }
  return data;
}

export const resaleData: ResaleData[] = generateMockData(1000);
