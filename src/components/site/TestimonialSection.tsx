"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonial";
import { motion } from "framer-motion";

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-gradient-to-r from-slate-900 to-gray-900 py-20 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[128px] -top-48 -right-24 opacity-20" />
          <div className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-[128px] -bottom-48 -left-24 opacity-20" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.3 }}
            animate={{
              y: -20,
              opacity: [0.3, 0.8, 0.3],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2 + i * 0.3,
                ease: "easeInOut",
              },
            }}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 text-center relative"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <h2 className="text-4xl font-black tracking-wider bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text">
            What People Say
          </h2>
          <p className="text-gray-400 tracking-widest">ABOUT ME</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 relative">
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className} bg-purple-500 w-2 h-2 mx-1 rounded-full opacity-50 transition-all duration-300 hover:opacity-100 hover:scale-150"></span>`;
              },
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12 bottom-12 mt-32"
          >
            {testimonialsData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[#141026] p-6 rounded-xl shadow-lg text-center transition-all duration-300 border border-transparent hover:border-purple-500/30 relative"
                >
                  {/* Card Glow Effect */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-xl"
                    initial={false}
                  />

                  {/* Image Container with Animation */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative inline-block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 mx-auto rounded-full border-4 border-purple-400 relative z-10"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    className="text-gray-300 mt-4 leading-relaxed"
                  >
                    {testimonial.text}
                  </motion.p>

                  <motion.div className="mt-4 space-y-1">
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-300 text-transparent bg-clip-text">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mx-auto">
            <div className="swiper-pagination mt-8 flex justify-center items-center gap-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
