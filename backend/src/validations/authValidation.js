import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres').regex(/[A-Z]/, 'A senha precisa ter pelo menos uma letra maiúscula').regex(/[0-9]/, 'A senha precisa ter pelo menos um número'),
})

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
})