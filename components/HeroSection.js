import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center">
      
      {/* Image half */}
      <div className="w-full md:w-1/2 
                      h-[210px]      /* mobile only */
                      md:h-[450px]   /* restore desktop */
                      lg:h-[550px] 
                      2xl:h-[480px] 
                      3xl:h-[600px] 
                      relative">
        <Image
          src="/img/HS_DT.png"
          alt="De todo Market"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text half */}
      <div className="w-full md:w-1/2 
                      h-[176px]      /* mobile only */
                      md:h-[450px]   /* restore desktop */
                      lg:h-[550px] 
                      2xl:h-[480px] 
                      3xl:h-[600px] 
                      bg-[#FCD704] 
                      p-6 md:px-10 
                      flex flex-col justify-center">
        
        {/* Heading */}
        <div className="self-stretch text-Black-500 text-2xl md:text-4xl font-black font-nunito mb-4">
          Sí, tenemos eso que <br/>estás buscando.
        </div>

        {/* Subheading */}
        <div className="self-stretch md:w-96">
          <span className="text-Black-500 text-lg md:text-2xl font-semibold font-nunito leading-relaxed md:leading-9">
            Y mucho más. Bienvenido a la tienda online&nbsp;
          </span>
          <span className="text-Black-500 text-lg md:text-2xl font-black font-nunito leading-relaxed md:leading-9">
            donde hay de todo.
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
