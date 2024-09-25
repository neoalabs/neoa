// src/components/Testimonials/Testimonials.jsx
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import modules from 'swiper/modules'
import { Pagination, Autoplay } from 'swiper/modules';

const TestimonialsSection = styled.section`
  padding: 80px 20px;
  background: #0A192F;
  color: #fff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Testimonial = styled.div`
  padding: 1rem;
`;

const TestimonialQuote = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.h4`
  font-size: 1rem;
  color: #64FFDA;
`;

const Testimonials = () => {
  const testimonials = [
    {
      quote: "NEOA transformed our e-commerce platform, leading to a significant increase in sales and customer satisfaction.",
      author: "Jane Doe, CEO of ShopSmart"
    },
    {
      quote: "Their AI solutions streamlined our operations, saving us time and resources.",
      author: "John Smith, CTO of HealthPlus"
    },
  ];

  return (
    <TestimonialsSection>
      <SectionTitle>What Our Clients Say</SectionTitle>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}  // Add modules here
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Testimonial>
              <TestimonialQuote>"{testimonial.quote}"</TestimonialQuote>
              <TestimonialAuthor>— {testimonial.author}</TestimonialAuthor>
            </Testimonial>
          </SwiperSlide>
        ))}
      </Swiper>
    </TestimonialsSection>
  );
};

export default Testimonials;
