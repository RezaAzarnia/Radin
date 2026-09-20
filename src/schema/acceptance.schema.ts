import { z } from "zod";

export const acceptanceSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی الزامی است"),

  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل صحیح نیست"),

  company: z.string().optional(),

  position: z.string().optional(),

  email: z
    .union([z.string().email("ایمیل صحیح نیست"), z.literal("")])
    .optional(),
});

export type AcceptanceSchema = z.infer<typeof acceptanceSchema>;
