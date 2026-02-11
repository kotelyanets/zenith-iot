'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function registerUser(prevState: string | undefined, formData: FormData) {
    try {
        const data = Object.fromEntries(formData);
        const validatedFields = RegisterSchema.safeParse(data);

        if (!validatedFields.success) {
            return 'Invalid input data.';
        }

        const { name, email, password } = validatedFields.data;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return 'Email already in use.';
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return 'success';
    } catch (error) {
        console.error('Registration error:', error);
        return 'Something went wrong.';
    }
}

export async function googleAuthenticate() {
    try {
        await signIn('google');
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Google Sign In failed';
        }
        throw error;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function updateProfile(
    prevState: { message: string; success: boolean },
    formData: FormData,
) {
    try {
        const { auth } = await import('@/auth');
        const session = await auth();
        if (!session?.user?.email) {
            return { message: 'Not authenticated.', success: false };
        }

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;

        if (!name || !email) {
            return { message: 'Name and email are required.', success: false };
        }

        await prisma.user.update({
            where: { email: session.user.email },
            data: { name, email },
        });

        return { message: 'Profile updated successfully!', success: true };
    } catch (error) {
        console.error('Update profile error:', error);
        return { message: 'Failed to update profile.', success: false };
    }
}

export async function changePassword(
    prevState: { message: string; success: boolean },
    formData: FormData,
) {
    try {
        const { auth } = await import('@/auth');
        const session = await auth();
        if (!session?.user?.email) {
            return { message: 'Not authenticated.', success: false };
        }

        const currentPassword = formData.get('currentPassword') as string;
        const newPassword = formData.get('newPassword') as string;

        if (!currentPassword || !newPassword) {
            return { message: 'Both passwords are required.', success: false };
        }

        if (newPassword.length < 6) {
            return { message: 'New password must be at least 6 characters.', success: false };
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || !user.password) {
            return { message: 'User not found or no password set.', success: false };
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return { message: 'Current password is incorrect.', success: false };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword },
        });

        return { message: 'Password changed successfully!', success: true };
    } catch (error) {
        console.error('Change password error:', error);
        return { message: 'Failed to change password.', success: false };
    }
}
