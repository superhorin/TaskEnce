import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
	sessionTtl: (Number(process.env.SESSION_TTL_DAYS) || 7) * 24 * 60* 60,
	tokenTtl: (Number(process.env.TOKEN_TTL_DAYS) || 30) * 24 * 60* 60,
}));
