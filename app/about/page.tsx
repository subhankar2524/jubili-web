import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="px-4 md:px-16 py-12 space-y-16">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="text-gray-600">
            We're passionate about delivering quality products and exceptional shopping experiences to our customers.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
            <p className="text-gray-700 mt-2">
              To provide an exceptional shopping experience that blends convenience, reliability, and a touch of elegance.
              We strive to connect customers with high-quality products while empowering businesses to thrive in a dynamic digital ecosystem.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mt-6">Our Vision</h2>
            <p className="text-gray-700 mt-2">
              To become a trusted, go-to destination for shoppers seeking premium products and brands looking to grow
              their reach in a supportive and innovative marketplace.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1590698933947-a202b069a861?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your actual image path in /public
            alt="About Image"
            width={400}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map(({ title, desc, gradient }) => (
            <div
              key={title}
              className={`rounded-2xl p-6 text-white font-medium shadow-md ${gradient}`}
            >
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-gray-600 max-w-3xl mx-auto text-sm">
          At Edens, we believe in creating a haven where quality, innovation, and sustainability come together to redefine shopping.
          Our platform is more than just a marketplace — it’s a curated experience designed to bring customers and sellers into a vibrant,
          seamless, and enriching digital space.
        </p>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Curated Selection",
    desc: "Every product in our platform is carefully handpicked for quality and utility.",
    gradient: "bg-gradient-to-tr from-blue-500 to-purple-500",
  },
  {
    title: "Seamless Shopping",
    desc: "A user-friendly interface ensures an intuitive and enjoyable shopping journey.",
    gradient: "bg-gradient-to-tr from-orange-400 to-red-500",
  },
  {
    title: "Empowering Businesses",
    desc: "We provide sellers with the tools and insights they need to succeed.",
    gradient: "bg-gradient-to-tr from-purple-400 to-cyan-400",
  },
  {
    title: "Sustainability Focus",
    desc: "We champion eco-friendly practices and socially responsible products.",
    gradient: "bg-gradient-to-tr from-pink-500 to-yellow-500",
  },
];
