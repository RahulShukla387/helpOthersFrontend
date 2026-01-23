 import { Sparkles } from "lucide-react";

function Overview() {

    return ( 
        <>
    <header className="text-center mb-12 py-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex justify-center items-center">
          <Sparkles className="h-8 w-8 text-orange-600 mr-3" />
          ADI-YUVAAN FOUNDATION
        </h1>
        <p className="mt-3 text-xl font-medium text-orange-700">
           आशाओं की उड़ान, उम्मीदों की पहचान
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-lg italic text-slate-600 px-6">
          True service is not just feeding the hunger of the stomach, but also the hunger of the soul.
        </p>
      </header>
        <div className="w[100%] flex justify-center items-center" >
            <img className="w[100%]" src="/Other/banner.png" alt="" />
        </div>
      <section className=" mt-12 mb-12 text-center max-w-4xl mx-auto">
        <p className="text-lg text-slate-700 leading-relaxed">
          The ADI-YUVAAN FOUNDATION is dedicated to holistic human development, blending essential humanitarian aid with spiritual and skill-based empowerment. We strive to uplift communities and individuals by addressing both their physical needs and their inherent potential for growth and self-reliance.
        </p>
      </section>
      </>
     );
}

export default Overview;