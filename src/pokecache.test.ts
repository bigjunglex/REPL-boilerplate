import { create } from "domain";
import { Cache, type CacheEntry } from "./pokecache.js";
import { describe, expect, test } from "vitest"


test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  const entry:CacheEntry<any> = {
    createdAt:Date.now(),
    val: val,
  }

  cache.add(key, entry);
  const cached = cache.get(key)?.val;
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key)?.val;
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
})