// Shared OTP store across API routes
export const otpStore = new Map<string, { otp: string; expires: number }>()
