import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

const getResendDiagnostic = (error: unknown) => {
  const details = error as Record<string, unknown>;

  return {
    name: typeof details?.name === "string" ? details.name : "UnknownResendError",
    message: typeof details?.message === "string" ? details.message : undefined,
    code: typeof details?.code === "string" ? details.code : undefined,
    statusCode:
      typeof details?.statusCode === "number"
        ? details.statusCode
        : typeof details?.status === "number"
          ? details.status
          : undefined,
  };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("[contact-email] configuration error", {
        code: "RESEND_API_KEY_MISSING",
      });
      return Response.json(
        { error: "Email delivery is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      console.error("[contact-email] Resend rejected email", getResendDiagnostic(resendError));
      return Response.json(
        { error: "Email delivery is temporarily unavailable. Please try again later." },
        { status: 502 }
      );
    }

    return Response.json(resendData);
  } catch {
    console.error("[contact-email] unexpected delivery failure", {
      code: "CONTACT_EMAIL_UNEXPECTED_FAILURE",
    });
    return Response.json(
      { error: "Email delivery is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }
}
