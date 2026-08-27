import ContactForm from "@/components/ContactForm";

function Page() {
  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-foreground">
          Contact Me
        </h1>
        <ContactForm />
      </div>
    </section>
  );
}

export default Page;
