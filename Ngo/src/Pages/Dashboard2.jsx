import React from 'react';
import { 
  Utensils, 
  Shirt, 
  HeartPulse, 
  Sun, 
  Code, // Used for Skill Teaching
  Leaf, 
  ScrollText,
  Building,
  CheckCircle,
  Users
} from 'lucide-react';

// The data structure based on the adi_yuvan_overview.md file
const SEVA_PILLARS = [
  { 
    id: 1, 
    title: "FOOD", 
    description: "Providing consistent and nutritious community meals (Annadanam) to combat hunger and ensure fundamental well-being for vulnerable populations.", 
    icon: Utensils, 
    color: "bg-emerald-50 text-emerald-600" 
  },
  { 
    id: 2, 
    title: "Vastra", 
    description: "Supplying essential clothing and relief materials to protect families, especially during challenging weather conditions.", 
    icon: Shirt, 
    color: "bg-blue-50 text-blue-600" 
  },
  { 
    id: 3, 
    title: "Medical Seva (Health Camps)", 
    description: "Organizing periodic medical check-ups and health camps to ensure basic healthcare access for underserved communities.", 
    icon: HeartPulse, 
    color: "bg-red-50 text-red-600" 
  },
  { 
    id: 4, 
    title: "Yuva", 
    description: "Focusing on spiritual growth, personal development, and mentorship to cultivate strong character, moral values, and clarity of purpose among the youth.", 
    icon: Sun, 
    color: "bg-orange-50 text-orange-600" 
  },
  { 
    id: 5, 
    title: "Skill Teaching", 
    description: "Implementing practical training programs to equip individuals with vocational skills, fostering self-sufficiency, and enabling them to secure sustainable livelihoods.", 
    icon: Code, 
    color: "bg-purple-50 text-purple-600" 
  },
  { 
    id: 6, 
    title: "Tribal Outreach", 
    description: "Dedicated initiatives focused on supporting and integrating remote and tribal communities, respecting their heritage while providing necessary infrastructure and resources.", 
    icon: Leaf, 
    color: "bg-teal-50 text-teal-600" 
  },
];

const REGISTRATION_INFO = [
  { detail: "Legal Entity", info: "ADI-YUVAAN FOUNDATION" },
  { detail: "CIN", info: "U88900UP2025NPL219548" },
  { detail: "Registered Address", info: "DEV VILLA 3/40 BAHAR, SAHARA ESTATE GORAKHPUR, MOHADDIPUR(GORAKHPUR), GORAKHPUR-273008, UTTAR PRADESH" },
];


const SevaPillarCard = ({ title, description, icon: Icon, color }) => (
  <div className={`p-6 rounded-xl ${color} shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl`}>
    <div className="flex items-center space-x-4 mb-3">
      <div className="p-3 bg-white rounded-full shadow-md">
        <Icon size={24} className="text-slate-800" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    </div>
    <p className="text-sm leading-relaxed text-slate-700">{description}</p>
  </div>
);

// Main Component
export default function Dashboard2() {
  return (
    <div  className="p-8 max-w-7xl mx-auto font-sans bg-white min-h-screen">

      {/* Header and Motto Section */}
    

      {/* Pillars of Seva */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-orange-100 pb-3 mb-8 flex items-center">
          <ScrollText className="w-6 h-6 text-orange-600 mr-3" />
          Our Pillars of Seva (Service)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SEVA_PILLARS.map((pillar) => (
            <SevaPillarCard key={pillar.id} {...pillar} />
          ))}
        </div>
      </section>

      {/* Registration & Contact Information */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-orange-100 pb-3 mb-6 flex items-center">
          <Building className="w-6 h-6 text-orange-600 mr-3" />
          Registration & Contact Information
        </h2>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          {REGISTRATION_INFO.map((item, index) => (
            <div key={index} className={`flex flex-col sm:flex-row justify-between py-3 ${index < REGISTRATION_INFO.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="font-semibold text-slate-600 flex items-center mb-1 sm:mb-0">
                <CheckCircle size={18} className="text-emerald-500 mr-2" />
                {item.detail}:
              </div>
              <div className="text-slate-800 font-medium sm:text-right w-full sm:w-auto break-words">
                {item.info}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <footer className="mt-12 pt-6 border-t border-slate-200 text-center">
        <p className="text-lg font-semibold text-slate-700">
          We invite you to join us in our journey of compassion and transformation, helping every individual achieve <span className="text-orange-600 font-extrabold">The Flight of Hopes</span>.
        </p>
      </footer>
    </div>
  );
}