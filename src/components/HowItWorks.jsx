const HowItWorks = () => {
  const steps = [
    {
      icon: "📱",
      title: "1. Scan",
      text: "Scan the Spotly QR code when you enter the store.",
    },
    {
      icon: "🔎",
      title: "2. Search",
      text: "Search for the product you are trying to find.",
    },
    {
      icon: "📍",
      title: "3. Follow",
      text: "Follow the store map directly to the product.",
    },
  ];

  return (
    <section className="bg-white py-16">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="text-center">

          <h2 className="text-3xl font-bold">
            How Spotly works
          </h2>

          <p className="mt-3 text-slate-500">
            No download. No account. Just scan and find.
          </p>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {steps.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl"
            >

              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 leading-7 text-slate-500">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;