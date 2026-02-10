'use server';

import { signIn } from '@/auth';

export async function authenticateGoogle() {
    await signIn('google', { redirectTo: '/dashboard' });
}
