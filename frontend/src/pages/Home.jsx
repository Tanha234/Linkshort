import React from 'react'


import FAQ from '../components/Faq'
import Features from '../components/Features'
import Hero from '../components/Hero'
import HowItWorks from '../components/howItWorks'
import NewsletterSection from '../components/Newsletter'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from './Footer'


export default function Home() {
  return (
    <div>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <WhyChooseUs/>
      <Pricing/>
      
      <Testimonials/>
      <NewsletterSection/>
      <FAQ/>
     
      
    </div>
  )
}
