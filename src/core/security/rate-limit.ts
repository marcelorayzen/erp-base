type RateLimitWindow = {
  count: number;
  resetAt: number;
};

const bucket = new Map<string, RateLimitWindow>();

export function rateLimit(key: string, maxRequests = 30, windowMs = 60_000) {
  const now = Date.now();
  const existing = bucket.get(key);

  if (!existing || existing.resetAt <= now) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  return { allowed: true, remaining: maxRequests - existing.count };
}
