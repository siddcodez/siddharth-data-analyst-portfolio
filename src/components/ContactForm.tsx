"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const submissionInProgress = React.useRef(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionInProgress.current) return;

    submissionInProgress.current = true;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error || data.resendError) {
        throw new Error("Unable to send your message.");
      }
      toast({
        title: "Thank you!",
        description: "I'll get back to you as soon as possible.",
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setFeedback({
        type: "success",
        message: "Thank you! Your message has been sent.",
      });
      setFullName("");
      setEmail("");
      setMessage("");
      const timer = setTimeout(() => {
        router.push("/");
        clearTimeout(timer);
      }, 1000);
    } catch (err) {
      setFeedback({
        type: "error",
        message: "Something went wrong. Please check the fields and try again.",
      });
      toast({
        title: "Error",
        description: "Something went wrong! Please check the fields.",
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    } finally {
      submissionInProgress.current = false;
      setLoading(false);
    }
  };
  return (
    <form className="w-full mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Your Name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message</Label>
        <Textarea
          placeholder="Tell me about about your project,"
          id="content"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          I&apos;ll never share your data with anyone else. Pinky promise!
        </p>
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-accent/90 to-accent block w-full text-accent-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_0px_0px_rgba(255,255,255,0.1)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Message <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
      {feedback && (
        <p
          aria-live="polite"
          className={cn(
            "mt-3 text-sm",
            feedback.type === "error" ? "text-destructive" : "text-accent"
          )}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
