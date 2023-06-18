import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiKey = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw';
  constructor() {}

  public getReviews() {
    return [
      {
        name: 'Wilbert Hudson',
        image: 'assets/images/avatar.png',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 120,
        rating: 4.8,
        updateDate: '21 de junio de 2020',
      },
      {
        name: 'Misty Smith',
        image: 'assets/images/avatar2.jpg',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 100,
        rating: 4.5,
        updateDate: '21 de junio de 2020',
      },
      {
        name: 'Mozell Schulist',
        image: 'assets/images/avatar.png',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 150,
        rating: 4.9,
        updateDate: '21 de junio de 2020',
      },
      {
        name: 'Richard Casper',
        image: 'assets/images/avatar2.jpg',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 160,
        rating: 4.7,
        updateDate: '21 de junio de 2020',
      },
      {
        name: 'Ruby Franecki',
        image: 'assets/images/avatar.png',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 190,
        rating: 4.5,
        updateDate: '21 de junio de 2020',
      },
      {
        name: 'Helen Walker',
        image: 'assets/images/avatar2.jpg',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 200,
        rating: 4.6,
        updateDate: '21 de junio de 2020',
      },
      {
        name: 'Casa Pepa',
        image: 'assets/images/avatar.png',
        details:
          'Existen muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteraciones de alguna forma, por inyección de humor',
        totalReviews: 120,
        rating: 4.5,
        updateDate: '21 de junio de 2020',
      },
    ];
  }

  /**
   * ----------------------------------------------------
   * Obtener lista de hoteles
   * ----------------------------------------------------
   */
  public getPopularServices() {
    return [
      {
        type: 'Restaurante',
        name: 'Restaurante El Sabor',
        images: [
          'assets/images/restaurants/1.jpg',
          'assets/images/restaurants/2.jpg',
        ],
        overview:
          'Disfruta de una experiencia culinaria única en nuestro restaurante. Nuestro menú ofrece una deliciosa selección de platos locales e internacionales preparados con ingredientes frescos y sabrosos.',
        rating: 4.8,
        totalReviews: 500,
        address: 'Calle Principal, 123, 28001 Madrid, España',
        website: 'www.restauranteelsabor.com',
        phone: '+34 123 456 789',
      },
      {
        type: 'Peluquería',
        name: 'Salón de Belleza Glamour',
        images: [
          'assets/images/hairsalons/1.jpg',
          'assets/images/hairsalons/2.jpg',
        ],
        overview:
          'Déjate mimar y transforma tu estilo en nuestro salón de belleza. Nuestros estilistas expertos te ofrecen servicios de corte, peinado y coloración para que luzcas espectacular.',
        rating: 4.7,
        totalReviews: 300,
        address: 'Calle Secundaria, 456, 28002 Barcelona, España',
        website: 'www.glamourbeautysalon.com',
        phone: '+34 987 654 321',
      },
      {
        type: 'Abogado',
        name: 'Despacho Legal Justicia',
        images: ['assets/images/lawyers/1.jpg', 'assets/images/lawyers/2.jpg'],
        overview:
          'Nuestro equipo de abogados experimentados está listo para brindarte asesoramiento y representación legal en una amplia gama de áreas. Confía en nosotros para resolver tus problemas legales.',
        rating: 4.9,
        totalReviews: 200,
        address: 'Calle Principal, 123, 28001 Madrid, España',
        website: 'www.justicialeagalfirm.com',
        phone: '+34 123 456 789',
      },
      {
        type: 'Spa',
        name: 'Spa Oasis',
        images: ['assets/images/spas/1.jpg', 'assets/images/spas/2.jpg'],
        overview:
          'Relájate y rejuvenece en nuestro lujoso spa. Ofrecemos una amplia gama de tratamientos de bienestar, desde masajes terapéuticos y faciales hasta baños de hidromasaje y terapias corporales.',
        rating: 4.9,
        totalReviews: 400,
        address: 'Calle Principal, 789, 08003 Valencia, España',
        website: 'www.spa-oasis.com',
        phone: '+34 654 321 987',
      },
      {
        type: 'Tienda de Ropa',
        name: 'Boutique Fashionista',
        images: [
          'assets/images/clothingstores/1.jpg',
          'assets/images/clothingstores/2.jpg',
        ],
        overview:
          'Descubre las últimas tendencias de moda en nuestra boutique exclusiva. Ofrecemos una selección única de ropa y accesorios de diseñadores reconocidos para que te vistas con estilo.',
        rating: 4.7,
        totalReviews: 350,
        address: 'Calle Secundaria, 123, 08004 Palma de Mallorca, España',
        website: 'www.boutiquefashionista.com',
        phone: '+34 987 654 321',
      },
      {
        type: 'Gimnasio',
        name: 'FitZone Gym',
        images: ['assets/images/gyms/1.jpg', 'assets/images/gyms/2.jpg'],
        overview:
          'Ponte en forma y alcanza tus metas de acondicionamiento físico en nuestro gimnasio de alta calidad. Ofrecemos una amplia variedad de equipos de entrenamiento y clases dirigidas por entrenadores profesionales.',
        rating: 4.8,
        totalReviews: 300,
        address: 'Calle Principal, 123, 17002 Alicante, España',
        website: 'www.fitzonegym.com',
        phone: '+34 123 456 789',
      },
      {
        type: 'Clínica Dental',
        name: 'Sonrisa Perfecta',
        images: [
          'assets/images/dentalclinics/1.jpg',
          'assets/images/dentalclinics/2.jpg',
        ],
        overview:
          'Cuida de tu salud bucal en nuestra clínica dental de confianza. Nuestro equipo de dentistas calificados ofrece una amplia gama de servicios, desde limpiezas y blanqueamientos hasta implantes y ortodoncia.',
        rating: 4.9,
        totalReviews: 250,
        address: 'Calle Secundaria, 456, 28005 Bilbao, España',
        website: 'www.sonrisaperfecta.com',
        phone: '+34 987 654 321',
      },
      {
        type: 'Estudio de Tatuajes',
        name: 'InkArt Studio',
        images: [
          'assets/images/tattoostudios/1.jpg',
          'assets/images/tattoostudios/2.jpg',
        ],
        overview:
          'Expresa tu individualidad en nuestro estudio de tatuajes creativos. Nuestros artistas expertos trabajan contigo para crear obras de arte personalizadas que reflejen tu estilo y personalidad.',
        rating: 4.7,
        totalReviews: 280,
        address: 'Calle Principal, 123, 46001 Sevilla, España',
        website: 'www.inkartstudio.com',
        phone: '+34 123 456 789',
      },
      {
        type: 'Salón de Uñas',
        name: 'Nail Glam',
        images: [
          'assets/images/nailsalons/1.jpg',
          'assets/images/nailsalons/2.jpg',
        ],
        overview:
          'Pamper your nails at our glamorous nail salon. We offer a wide range of nail services including manicures, pedicures, and nail extensions to keep your nails looking fabulous.',
        rating: 4.8,
        totalReviews: 320,
        address: 'Calle Secundaria, 789, 46001 Sevilla, España',
        website: 'www.nailglam.com',
        phone: '+34 789 123 456',
      },
      {
        type: 'Cafetería',
        name: 'Café Delight',
        images: ['assets/images/cafes/1.jpg', 'assets/images/cafes/2.jpg'],
        overview:
          'Disfruta de una variedad de deliciosos cafés y pasteles en nuestra acogedora cafetería. Es el lugar perfecto para relajarte y disfrutar de un momento tranquilo con tu bebida favorita.',
        rating: 4.5,
        totalReviews: 250,
        address: 'Calle Principal, 456, 28002 Barcelona, España',
        website: 'www.cafedelight.com',
        phone: '+34 987 654 321',
      },
    ];
  }
  // public getNearbyServices() {
  //   const radius = 1000;
  //   const type = 'lodging';
  //   return this.http.get<HttpClient>(
  //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&rankby=prominence&key=${this.apiKey}`
  //   );
  // }
}
