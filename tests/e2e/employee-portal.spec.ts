import { test, expect } from "@playwright/test"

test.describe("Employee Portal", () => {
  test.beforeEach(async ({ page }) => {
    // Login as employee
    await page.goto("/auth/signin")
    await page.fill('input[type="email"]', "john.doe@company.com")
    await page.fill('input[type="password"]', "demo123")
    await page.selectOption("select", "employee")
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL("/dashboard/employee")
  })

  test("should display AI chat interface", async ({ page }) => {
    await expect(page.locator("text=AI Assistant")).toBeVisible()

    // Test chat functionality
    await page.fill('input[placeholder*="Ask me anything"]', "Hello, can you help me?")
    await page.click('button:has-text("Send")')

    // Should show user message
    await expect(page.locator("text=Hello, can you help me?")).toBeVisible()

    // Should receive AI response
    await expect(page.locator(".bg-gray-100")).toBeVisible()
  })

  test("should navigate to tickets page", async ({ page }) => {
    await page.click('a[href="/dashboard/employee/my-tickets"]')
    await expect(page).toHaveURL("/dashboard/employee/my-tickets")
    await expect(page.locator("h1")).toContainText("My Tickets")
  })

  test("should navigate to knowledge base", async ({ page }) => {
    await page.click('a[href="/dashboard/employee/knowledge-base"]')
    await expect(page).toHaveURL("/dashboard/employee/knowledge-base")
    await expect(page.locator("h1")).toContainText("Knowledge Base")
  })

  test("should navigate to mood tracker", async ({ page }) => {
    await page.click('a[href="/dashboard/employee/mood-tracker"]')
    await expect(page).toHaveURL("/dashboard/employee/mood-tracker")
    await expect(page.locator("h1")).toContainText("Mood Tracker")
  })

  test("should update mood value", async ({ page }) => {
    await page.goto("/dashboard/employee/mood-tracker")

    // Interact with mood slider
    const slider = page.locator('input[type="range"]').first()
    await slider.fill("8")

    // Save mood entry
    await page.click('button:has-text("Save Today\'s Entry")')

    // Should show success message
    await expect(page.locator("text=saved successfully")).toBeVisible()
  })
})
