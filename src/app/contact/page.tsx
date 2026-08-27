import React from "react";

function Page() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }
  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-foreground">
          Contact Me
        </h2>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-foreground"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-input border border-border text-foreground text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 placeholder-muted-foreground"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-foreground"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-foreground bg-input rounded-lg border border-border shadow-sm focus:ring-accent focus:border-accent placeholder-muted-foreground"
              placeholder="Let me know how I can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-foreground bg-input rounded-lg shadow-sm border border-border focus:ring-accent focus:border-accent placeholder-muted-foreground"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-accent-foreground rounded-lg bg-accent sm:w-fit hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/30"
            // onClick={handleSubmit}
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Page;
