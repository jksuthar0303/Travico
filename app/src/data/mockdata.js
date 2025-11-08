export const MOCK_DATA = {
  Jaipur: {
    places: [
      {
        id: 'p1',
        name: 'Amer Fort',
        price: 500,
        rating: 4.8,
        duration: '2 hrs',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClwXT84vTj7mmITab6_YFCM9CxstAQUhUtw&s',
        description:
          'A majestic fort located on a hilltop, known for its artistic Hindu style elements and scenic views.',
      },
      {
        id: 'p2',
        name: 'Hawa Mahal',
        price: 300,
        rating: 4.5,
        duration: '1 hrs',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLhAZNJfsAn2UwFvByU15uO7mHSdPcaMZbg&s',
        description:
          'Also called the "Palace of Winds", built with red and pink sandstone, famous for its intricate latticework windows.',
      },
      {
        id: 'p3',
        name: 'City Palace',
        price: 400,
        rating: 4.9,
        duration: '3 hrs',
        image: 'https://s7ap1.scene7.com/is/image/incredibleindia/city-palace-jaipur-rajasthan-1?qlt=82&ts=1742164664970',
        description:
          'A beautiful complex of courtyards, gardens, and buildings, blending Rajput and Mughal architecture.',
      },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Heritage Hotel A',
        perNight: 3000,
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/12345678.jpg',
        description:
          'Luxurious heritage-style hotel offering royal rooms, rooftop dining, and traditional Rajasthani decor.',
      },
      {
        id: 'h2',
        name: 'Budget Inn',
        perNight: 1200,
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/87654321.jpg',
        description:
          'Affordable stay near the city center with cozy rooms and complimentary breakfast.',
      },
    ],
    transports: [
      {
        id: 't1',
        name: 'Sedan',
        type: 'Car',
        ratePerDay: 1500,
        image:
          'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
        description:
          'Comfortable AC sedan perfect for couples or small families to explore Jaipur in style.',
      },
      {
        id: 't2',
        name: 'Tempo Traveller',
        type: 'Van',
        ratePerDay: 4000,
        image:
          'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        description:
          'Spacious vehicle suitable for groups or families, equipped with AC and pushback seats.',
      },
    ],
  },
}

export async function fetchDestinationData(destination) {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          MOCK_DATA[destination] || { places: [], hotels: [], transports: [] }
        ),
      500
    )
  )
}
